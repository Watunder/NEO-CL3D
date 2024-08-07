import AmmoLib from './ammo.js';
import effekseerLib from './effekseer.js';
import mitt from './mitt.js';
import { Rekapi, Actor } from './rekapi.js';
import * as CL3D from './cl3d.js';
import { Utils, Player, SsPartType, PART_FLAG } from './ss6player-lib.js';

class AnimatorRigidPhysicsBody extends CL3D.Animator {
    constructor() {
        super();

        this.BodyType = "";

        this.AdditionalRotation = new CL3D.Vect3d(0, 0, 0);
        this.AdditionalPosition = new CL3D.Vect3d(0, 0, 0);

        this.Density = 1;

        this.Radius = 10;
        this.Height = 10;
        this.Size = new CL3D.Vect3d(0, 0, 0);

        this.DoActionImpact = false;
        this.ActionOnImpact = null;
    }

    /**
     * Animates the scene node it is attached to and returns true if scene node was modified.
     * @public
     * @param {CL3D.SceneNode} node The Scene node which needs to be animated this frame.
     * @param {Integer} timeMs The time in milliseconds since the start of the scene.
     */
    animateNode(node, timeMs) {

    }
}

const nameList =
{

};

globalThis.rename = (name) => {
    if (typeof name !== "string")
        return;

    if (nameList.hasOwnProperty(name)) {
        let order = String(++nameList[name]);
        let _name = name + "_" + order;

        return _name;
    }

    nameList[name] = 1;
    let _name = name + "_1";

    return _name;
};

Array.prototype.flatAll = function () {
    let array = this;
    
    while (array.some(item => Array.isArray(item)))
        array = [].concat(...array);

    return array;
};

/// TODO
// function _addScenesFromDocument(filetoload, newRootNodeChildrenParent, functionToCallWhenLoaded) {
//     var loader = new CL3D.CCFileLoader(filetoload, filetoload.indexOf('.ccbz') != -1);
//     loader.load(function (filecontent) {
//         CL3D.engine.parseFile(filecontent, filetoload, true, true, newRootNodeChildrenParent);
//         if (functionToCallWhenLoaded) functionToCallWhenLoaded();
//     });
// }
///

class SS6Project
{
  constructor(arg1, arg2, arg3, arg4, arg5, arg6, arg7)
  {
    if (typeof arg1 === "string")
    {
      // get ssfb data via http protocol
      let ssfbPath = arg1;
      let onComplete = arg2;
      let timeout = arg3 !== undefined ? arg3 : 0;
      let retry = arg4 !== undefined ? arg4 : 0;
      let onError = arg5 !== undefined ? arg5 : null;
      let onTimeout = arg6 !== undefined ? arg6 : null;
      let onRetry = arg7 !== undefined ? arg7 : null;

      // ssfb path
      this.ssfbPath = ssfbPath;
      const index = ssfbPath.lastIndexOf("/");
      this.rootPath = ssfbPath.substring(0, index) + "/";

      this.status = "not ready"; // status

      this.onComplete = onComplete;
      this.onError = onError;
      this.onTimeout = onTimeout;
      this.onRetry = onRetry;

      this.LoadFlatBuffersProject(ssfbPath, timeout, retry);
    }
  }

  /**
   * Load json and parse (then, load textures)
   * @param {string} ssfbPath - FlatBuffers file path
   * @param timeout
   * @param retry
   */
  LoadFlatBuffersProject(ssfbPath, timeout = 0, retry = 0)
  {
    const self = this;
    const httpObj = new XMLHttpRequest();
    const method = "GET";

    httpObj.open(method, ssfbPath, true);
    httpObj.responseType = "arraybuffer";
    httpObj.timeout = timeout;

    httpObj.onload = function()
    {
        if (!(httpObj.status >= 200 && httpObj.status < 400))
        {
            if (self.onError !== null)
                self.onError(ssfbPath, timeout, retry, httpObj);

            return;
        }
        const arrayBuffer = this.response;
        const bytes = new Uint8Array(arrayBuffer);
        self.fbObj = Utils.getProjectData(bytes);
        self.LoadCellResources();
    };

    httpObj.ontimeout = function()
    {
        if (retry > 0)
        {
            if (self.onRetry !== null)
                self.onRetry(ssfbPath, timeout, retry - 1, httpObj);
            self.LoadFlatBuffersProject(ssfbPath, timeout, retry - 1);
        }
        else
        if (self.onTimeout !== null)
            self.onTimeout(ssfbPath, timeout, retry, httpObj);
    };

    httpObj.onerror = function()
    {
      if (self.onError !== null)
        self.onError(ssfbPath, timeout, retry, httpObj);
    };

    httpObj.send(null);
  }

  /**
   * Load textures
   */
  LoadCellResources()
  {
    const self = this;
    let ids = [];
    let resources = new Object();

    for (let i = 0; i < self.fbObj.cellsLength(); i++)
    {
        if (!ids.some(function(id) { return (id === self.fbObj.cells(i).cellMap().index()) }))
        {
            ids.push(self.fbObj.cells(i).cellMap().index());

            // Load textures for all cell at once.
            let tex = ccbLoadTexture(self.rootPath + this.fbObj.cells(i).cellMap().imagePath());
            resources[self.fbObj.cells(i).cellMap().name()] = tex;
        }
    }

    // SS6Project is ready.
    self.resources = resources;
    self.status = "ready";

    if (self.onComplete !== null)
      self.onComplete();
  }
}

/**
 * インスタンス差し替え用のキーパラメーター
 */
class SS6PlayerInstanceKeyParam
{
  refStartframe = 0;
  refEndframe = 0;
  refSpeed = 1.0;
  refloopNum = 0;
  infinity = false;
  reverse = false;
  pingpong = false;
  independent = false;

  constructor()
  {
  }
}

class ColorMatrix {
    constructor() {
        this.m00 = 1;
        this.m01 = 0;
        this.m02 = 0;
        this.m03 = 0;
        this.m04 = 0;

        this.m05 = 0;
        this.m06 = 1;
        this.m07 = 0;
        this.m08 = 0;
        this.m09 = 0;

        this.m10 = 0;
        this.m11 = 0;
        this.m12 = 1;
        this.m13 = 0;
        this.m14 = 0;

        this.m15 = 0;
        this.m16 = 0;
        this.m17 = 0;
        this.m18 = 1;
        this.m19 = 0;
    }

    fromArray(array) {
        const me = this;

        if (array.length != 20) {
            return;
        }

        for (let i = 0; i < 20; ++i) {
            if (i < 10)
                me['m' + '0' + i.toString()] = array[i];

            else
                me['m' + i.toString()] = array[i];
        }

    }

    asArray() {
        return [this.m00, this.m01, this.m02, this.m03, this.m04,
        this.m05, this.m06, this.m07, this.m08, this.m09,
        this.m10, this.m11, this.m12, this.m13, this.m14,
        this.m15, this.m16, this.m17, this.m18, this.m19];
    }
}

class SimpleMeshSceneNode extends CL3D.SceneNode {
    constructor(texture, vertices, uvs, indices) {
        super();

        this.init();

        this._Mesh = new CL3D.Mesh();
        let buf = new CL3D.MeshBuffer();
        this._Mesh.AddMeshBuffer(buf);

        // set indices and vertices
        buf.Indices = indices;

        this.vertices = vertices;
        this.uvs = uvs;

        this.update(vertices);

        // set the texture of the material
        buf.Mat.Type = CL3D.Material.EMT_TRANSPARENT_ALPHA_CHANNEL;
        buf.Mat.BackfaceCulling = false;
        buf.Mat.Tex1 = CL3D.ScriptingInterface.getScriptingInterface().Engine.getTextureManager().getTexture(texture, true);
    }

    update(vertices) {
        const me = this;
        me._Mesh.GetMeshBuffers()[0].Vertices = [];
        me._Mesh.GetMeshBuffers()[0].update(true, true);

        for (let i = 0, len = vertices.length / 2; i < len; i++) {
            me._Mesh.GetMeshBuffers()[0].Vertices.push(CL3D.createSimpleVertex(vertices[i * 2], vertices[i * 2 + 1], 0, this.uvs[i * 2], this.uvs[i * 2 + 1]));
        }

        me.vertices = vertices;
    }

    OnRegisterSceneNode(scene) {
        if (this.Visible) {
            if (this.Parent._Type == "ss6") {
                scene.registerNodeForRendering(this, CL3D.Scene.TRANSPARENT_SOLID_AFTER_ZBUFFER_CLEAR);
                CL3D.SceneNode.prototype.OnRegisterSceneNode.call(this, scene);
            }

            else if (this.Parent._Type == "ss6ui") {
                scene.registerNodeForRendering(this, CL3D.Scene.RENDER_MODE_2DOVERLAY);
                CL3D.SceneNode.prototype.OnRegisterSceneNode.call(this, scene);
            }
        }
    }

    render(renderer) {
        renderer.setWorld(this.getAbsoluteTransformation());
        renderer.drawMesh(this._Mesh);
    }
}

class SS6Player
{
  #player;

  // Properties
  ss6project;
  #resources;
  #liveFrame = [];
  #colorMatrixCache = [];

  parentAlpha = 1.0;

  // cell再利用
  #prevCellID = []; // 各パーツ（レイヤー）で前回使用したセルID
  /**
   * @type {SimpleMeshSceneNode[]}
   */
  #prevMesh = [];

  // for change instance
  #substituteOverWrite = [];
  #substituteKeyParam = [];

  #alphaBlendType = [];
  #_isPlaying;
  #_isPausing;
  #_startFrame;
  #_endFrame;
  #_currentFrame;
  #nextFrameTime;
  _loops;
  skipEnabled;
  #updateInterval;
  #playDirection;

  onUserDataCallback(data){};
  playEndCallback(player){};

  get startFrame()
  {
    return this.#_startFrame;
  }

  get endFrame()
  {
    return this.#_endFrame;
  }

  get totalFrame()
  {
    return this.#player.animationData.totalFrames();
  }

  get fps()
  {
    return this.#player.animationData.fps();
  }

  get frameNo()
  {
    return Math.floor(this.#_currentFrame);
  }

  set loop(loop)
  {
    this._loops = loop;
  }

  get loop()
  {
    return this._loops;
  }

  get isPlaying()
  {
    return this.#_isPlaying;
  }

  get isPausing()
  {
    return this.#_isPausing;
  }

  get animePackName()
  {
    return this.#player.animePackName;
  }

  get animeName()
  {
    return this.#player.animeName;
  }

  /**
   * セルをインスタンスで作成
   * @param {String} refname 参照アニメ名
   * @param {number or undefined} refStart
   * @return {SS6Player} - インスタンス
   */
  #MakeCellPlayer(refname, refStart = undefined)
  {
    const split = refname.split('/');
    const ssp = new SS6Player(this.ss6project);
    ssp.Setup(split[0], split[1]);
    ssp.Play(refStart);

    return ssp;
  }

  /**
   * 矩形セルをメッシュ（5verts4Tri）で作成
   * @param {number} id - セルID
   * @return {SimpleMeshSceneNode} - メッシュ
   */
  #MakeCellMesh(id)
  {
    const cell = this.#player.fbObj.cells(id);
    const u1 = cell.u1();
    const u2 = cell.u2();
    const v1 = cell.v1();
    const v2 = cell.v2();
    const w = cell.width() / 2;
    const h = cell.height() / 2;
    const verts = new Float32Array([0, 0, -w, -h, w, -h, -w, h, w, h]);
    const uvs = new Float32Array([(u1 + u2) / 2, (v1 + v2) / 2, u1, v1, u2, v1, u1, v2, u2, v2]);
    const indices = new Uint16Array([0, 1, 2, 0, 2, 4, 0, 4, 3, 0, 3, 1]); // clockwise order
    
    return new SimpleMeshSceneNode(this.#resources[cell.cellMap().name()], verts, uvs, indices);
  }

  /**
   * メッシュセルからメッシュを作成
   * @param {number} partID - パーツID
   * @param {number} cellID - セルID
   * @return {SimpleMeshSceneNode} - メッシュ
   */
  #MakeMeshCellMesh(partID, cellID)
  {
    const meshsDataUV = this.#player.animationData.meshsDataUv(partID);
    const uvLength = meshsDataUV.uvLength();

    if (uvLength > 0)
    {
      // 先頭の2データはヘッダになる
      const uvs = new Float32Array(uvLength - 2);
      const meshNum = meshsDataUV.uv(1);

      for (let idx = 2; idx < uvLength; idx++)
        uvs[idx - 2] = meshsDataUV.uv(idx);

      const meshsDataIndices = this.#player.animationData.meshsDataIndices(partID);
      const indicesLength = meshsDataIndices.indicesLength();

      // 先頭の1データはヘッダになる
      const indices = new Uint16Array(indicesLength - 1);
      for (let idx = 1; idx < indicesLength; idx++)
        indices[idx - 1] = meshsDataIndices.indices(idx);
      
      const verts = new Float32Array(meshNum * 2); // Zは必要ない？
      
      return new SimpleMeshSceneNode(this.#resources[this.#player.fbObj.cells(cellID).cellMap().name()], verts, uvs, indices);
    }

    return null;
  }

  #resetLiveFrame()
  {
    const layers = this.#player.animationData.defaultDataLength();
    for (let i = 0; i < layers; i++)
      this.#liveFrame[i] = 0;
  }

  #clearCaches()
  {
    this.#liveFrame = [];
    this.#colorMatrixCache = [];
  }

  /**
   * SS6Player
   * @constructor
   * @param {CL3D.SceneNode} node - The node of behavior.
   * @param {SS6Project} ss6project - SS6Project that contains animations.
   * @param {string} animePackName - The name of animePack(SSAE).
   * @param {string} animeName - The name of animation.
   */
  constructor(node, ss6project, animePackName, animeName = null)
  {
    this.node = node;
    this.ss6project = ss6project; 
    this.#player = new Player(ss6project.fbObj, animePackName, animeName);
    this.#resources = this.ss6project.resources;
    this.parentAlpha = 1.0;

    if (animePackName !== null && animeName !== null)
      this.Setup(animePackName, animeName);
  }

  Update(timeMs)
  {
    this.UpdateInternal(timeMs);
  }

  /**
   * Update is called by Animator
   * @param {number} timeMs
   */
  UpdateInternal(timeMs, rewindAfterReachingEndFrame = true)
  {
    // delta time
    if (this.lastTime == null)
      this.lastTime = timeMs;
    
    const elapsedTime = timeMs - this.lastTime;
    this.lastTime = timeMs;

    const toNextFrame = this.#_isPlaying && !this.#_isPausing;
    if (toNextFrame && this.#updateInterval !== 0)
    {
      this.#nextFrameTime += elapsedTime; // もっとうまいやり方がありそうなんだけど…
      if (this.#nextFrameTime >= this.#updateInterval)
      {
        let playEndFlag = false;

        // 処理落ち対応
        const step = this.#nextFrameTime / this.#updateInterval;
        this.#nextFrameTime -= this.#updateInterval * step;
        let s = (this.skipEnabled ? step * this.#playDirection : this.#playDirection);
        let next = this.#_currentFrame + s;
        let nextFrameNo = Math.floor(next);
        let nextFrameDecimal = next - nextFrameNo;
        let currentFrameNo = Math.floor(this.#_currentFrame);

        if (this.#playDirection >= 1)
        {
          // speed +
          for (let c = nextFrameNo - currentFrameNo; c; c--)
          {
            let incFrameNo = currentFrameNo + 1;
            if (incFrameNo > this.#_endFrame)
            {
              if (this._loops === -1)
                // infinite loop
                incFrameNo = this.#_startFrame;
              else
              {
                this._loops--;
                playEndFlag = true;
                if (this._loops === 0)
                {
                  this.#_isPlaying = false;
                  // stop playing the animation
                  incFrameNo = (rewindAfterReachingEndFrame) ? this.#_startFrame : this.#_endFrame;
                  break;
                }
                else
                  // continue to play the animation
                  incFrameNo = this.#_startFrame;
              }
            }
            currentFrameNo = incFrameNo;
            // Check User Data
            if (this.#_isPlaying)
            {
              if (this.#player.HaveUserData(currentFrameNo))
              {
                if (this.onUserDataCallback !== null)
                  this.onUserDataCallback(this.#player.GetUserData(currentFrameNo));
              }
            }
          }
        }
        if (this.#playDirection <= -1)
        {
          // speed -
          for (let c = currentFrameNo - nextFrameNo; c; c--)
          {
            let decFrameNo = currentFrameNo - 1;
            if (decFrameNo < this.#_startFrame)
            {
              if (this._loops === -1)
                // infinite loop
                decFrameNo = this.#_endFrame;
              else
              {
                this._loops--;
                playEndFlag = true;
                if (this._loops === 0)
                {
                  this.#_isPlaying = false;
                  decFrameNo = (rewindAfterReachingEndFrame) ? this.#_endFrame : this.#_startFrame;
                  break;
                }
                else
                  decFrameNo = this.#_endFrame;
              }
            }
            currentFrameNo = decFrameNo;
            // Check User Data
            if (this.#_isPlaying)
            {
              if (this.#player.HaveUserData(currentFrameNo))
              {
                if (this.onUserDataCallback !== null)
                  this.onUserDataCallback(this.#player.GetUserData(currentFrameNo));
              }
            }
          }
        }
        this.#_currentFrame = currentFrameNo + nextFrameDecimal;
        
        if (playEndFlag)
        {
          if (this.playEndCallback !== null)
            this.playEndCallback(this);
        }
        this.SetFrameAnimation(Math.floor(this.#_currentFrame), step);
      }
    }
    else
      this.SetFrameAnimation(Math.floor(this.#_currentFrame));
  }

  /**
   * Setup
   * @param {string} animePackName - The name of animePack(SSAE).
   * @param {string} animeName - The name of animation.
   */
  Setup(animePackName, animeName)
  {
    this.#player.Setup(animePackName, animeName);

    this.#clearCaches();

    const animePackData = this.#player.animePackData;
    const partsLength = animePackData.partsLength();

    // cell再利用
    this.#prevCellID = new Array(partsLength);
    this.#prevMesh = new Array(partsLength);
    this.#substituteOverWrite = new Array(partsLength);
    this.#substituteKeyParam = new Array(partsLength);

    for (let j = 0; j < partsLength; j++)
    {
      const index = animePackData.parts(j).index();

      // cell再利用
      this.#prevCellID[index] = -1; // 初期値（最初は必ず設定が必要）
      this.#prevMesh[index] = null;
      this.#substituteOverWrite[index] = null;
      this.#substituteKeyParam[index] = null;
    }

    // 各アニメーションステータスを初期化
    this.#alphaBlendType = this.GetPartsBlendMode();

    this.#_isPlaying = false;
    this.#_isPausing = true;
    this.#_startFrame = this.#player.animationData.startFrames();
    this.#_endFrame = this.#player.animationData.endFrames();
    this.#_currentFrame = this.#player.animationData.startFrames();
    this.#nextFrameTime = 0;
    this._loops = -1;
    this.skipEnabled = false;
    this.#updateInterval = 1000 / this.#player.animationData.fps();
    this.#playDirection = 1; // forward
    this.parentAlpha = 1.0;
    this.onUserDataCallback = null;
    this.playEndCallback = null;
  }

  /**
   * アニメーション再生を開始する
   */
  Play(frameNo)
  {
    this.#_isPlaying = true;
    this.#_isPausing = false;

    let currentFrame = this.#playDirection > 0 ? this.#_startFrame : this.#_endFrame;
    if (frameNo && typeof frameNo === 'number')
      currentFrame = frameNo;
    
    this.#_currentFrame = currentFrame;

    this.#resetLiveFrame();

    const currentFrameNo = Math.floor(this.#_currentFrame);
    this.SetFrameAnimation(currentFrameNo);
    if (this.#player.HaveUserData(currentFrameNo))
    {
      if (this.onUserDataCallback !== null)
        this.onUserDataCallback(this.#player.GetUserData(currentFrameNo));
    }
  }

  /**
   * アニメーション再生を一時停止する
   */
  Pause()
  {
    this.#_isPausing = true;
  }

  /**
   * アニメーション再生を再開する
   */
  Resume()
  {
    this.#_isPausing = false;
  }

  /**
   * アニメーションを停止する
   * @constructor
   */
  Stop()
  {
    this.#_isPlaying = false;
  }

  /**
   * アニメーションの透明度を設定する
   */
  SetAlpha(alpha)
  {
    this.parentAlpha = alpha;
  }

  /**
   * アニメーション再生を位置（フレーム）を設定する
   */
  SetFrame(frame)
  {
    this.#_currentFrame = frame;
  }

  NextFrame()
  {
    const currentFrame = Math.floor(this.#_currentFrame);
    const endFrame = this.endFrame;
    if (currentFrame === endFrame)
      return;

    this.SetFrame(currentFrame + 1);
  }

  PrevFrame()
  {
    const currentFrame = Math.floor(this.#_currentFrame);
    if (currentFrame === 0)
      return;
    
    this.SetFrame(currentFrame - 1);
  }

  /**
   * エラー処理
   * @param {any} _error - エラー
   */
  ThrowError(_error)
  {

  }

  /**
   * ユーザーデータコールバックの設定
   * @param fn
   * @constructor
   *
   * ユーザーデータのフォーマット
   * data = [[d0,d1,...,d10],[da0,da1,...,da10],...])
   * data.length : 当該フレームでユーザーデータの存在するパーツ（レイヤー）数
   * d0 : パーツ（レイヤー）番号
   * d1 : 有効データビット（&1:int, &2:rect(int*4), &4:pos(int*2), &8:string）
   * d2 : int(int)
   * d3 : rect0(int)
   * d4 : rect1(int)
   * d5 : rect2(int)
   * d6 : rect3(int)
   * d7 : pos0(int)
   * d8 : pos1(int)
   * d9 : string.length(int)
   * d10: string(string)
   *
   */
  SetUserDataCalback(fn)
  {
    this.onUserDataCallback = fn;
  }

  /**
   * 再生終了時に呼び出されるコールバックを設定します.
   * @param fn
   * @constructor
   *
   * ループ回数分再生した後に呼び出される点に注意してください。
   * 無限ループで再生している場合はコールバックが発生しません。
   *
   */
  SetPlayEndCallback(fn)
  {
    this.playEndCallback = fn;
  }
  
  /**
   * アニメーションの速度を設定する (deprecated この関数は削除される可能性があります)
   * @param {number} fps - アニメーション速度(frame per sec.)
   * @param {boolean} _skipEnabled - 描画更新が間に合わないときにフレームをスキップするかどうか
   */
  SetAnimationFramerate(fps, _skipEnabled = false)
  {
    if (fps <= 0)
      return; // illegal
    this.#updateInterval = 1000 / fps;
    this.skipEnabled = _skipEnabled;
  }

  /**
   * アニメーションの速度を設定する
   * @param {number} fpsRate - アニメーション速度(設定値に対する乗率)負数設定で逆再生
   * @param {boolean} _skipEnabled - 描画更新が間に合わないときにフレームをスキップするかどうか
   */
  SetAnimationSpeed(fpsRate, _skipEnabled = false)
  {
    if (fpsRate === 0)
      return; // illegal?
    this.#playDirection = fpsRate > 0 ? 1 : -1;
    this.#updateInterval = 1000 / (this.#player.animationData.fps() * fpsRate * this.#playDirection);
    this.skipEnabled = _skipEnabled;
  }

  /**
   * アニメーション再生設定
   * @param {number} _startframe - 開始フレーム番号（マイナス設定でデフォルト値を変更しない）
   * @param {number} _endframe - 終了フレーム番号（マイナス設定でデフォルト値を変更しない）
   * @param {number} _loops - ループ回数（ゼロもしくはマイナス設定で無限ループ）
   */
  SetAnimationSection(_startframe = -1, _endframe = -1, _loops = -1)
  {
    if (_startframe >= 0 && _startframe < this.#player.animationData.totalFrames())
      this.#_startFrame = _startframe;

    if (_endframe >= 0 && _endframe < this.#player.animationData.totalFrames())
      this.#_endFrame = _endframe;

    if (_loops > 0)
      this._loops = _loops;
    else
      this._loops = -1;

    // 再生方向にあわせて開始フレーム設定（順方向ならstartFrame,逆方法ならendFrame）
    this.#_currentFrame = this.#playDirection > 0 ? this.#_startFrame : this.#_endFrame;
  }

  /**
   * パーツカラーのブレンド用カラーマトリクス
   * @param {number} blendType - ブレンド方法（0:mix, 1:multiply, 2:add, 3:sub)
   * @param {number} rate - ミックス時の混色レート
   * @param {number} argb32 - パーツカラー（単色）
   * @return {ColorMatrix} - カラーマトリクス
   */
  GetColorMatrix(blendType, rate, argb32)
  {
    const key = blendType.toString() + '_' + rate.toString() + '_' + argb32.toString();
    if (this.#colorMatrixCache[key])
      return this.#colorMatrixCache[key];

    const colorMatrix = new ColorMatrix();
    const ca = ((argb32 & 0xff000000) >>> 24) / 255;
    const cr = ((argb32 & 0x00ff0000) >>> 16) / 255;
    const cg = ((argb32 & 0x0000ff00) >>> 8) / 255;
    const cb = (argb32 & 0x000000ff) / 255;
    // Mix
    if (blendType === 0)
    {
      const rate_i = 1 - rate;

      colorMatrix.fromArray([
        rate_i, 0, 0, 0, cr * rate,
        0, rate_i, 0, 0, cg * rate,
        0, 0, rate_i, 0, cb * rate,
        0, 0, 0, 1, 0
      ]);
    }
    else if (blendType === 1)
    {
      // Multiply
      colorMatrix.fromArray([
        cr, 0, 0, 0, 0,
        0, cg, 0, 0, 0,
        0, 0, cb, 0, 0,
        0, 0, 0, ca, 0
      ]);
    }
    else if (blendType === 2)
    {
      // Add
      colorMatrix.fromArray([
        1, 0, 0, 0, cr,
        0, 1, 0, 0, cg,
        0, 0, 1, 0, cb,
        0, 0, 0, ca, 0
      ]);
    }
    else if (blendType === 3)
    {
      // Sub
      colorMatrix.fromArray([
        1, 0, 0, 0, -cr,
        0, 1, 0, 0, -cg,
        0, 0, 1, 0, -cb,
        0, 0, 0, ca, 0
      ]);
    }
    this.#colorMatrixCache[key] = colorMatrix;

    return colorMatrix;
  }

  #_instancePos = new Float32Array(5);
  #_CoordinateGetDiagonalIntersectionVec2 = new Float32Array(2);

  /**
   * １フレーム分のアニメーション描画
   * @param {number} frameNumber - フレーム番号
   * @param {number} ds - delta step
   */
  SetFrameAnimation(frameNumber, ds = 0.0)
  {
    const fd = this.#player.GetFrameData(frameNumber);
    // TODO
    this.node.Children = [];

    // 優先度順パーツ単位ループ
    const l = fd.length;
    for (let ii = 0; ii < l; ii = (ii + 1) | 0)
    {
      // 優先度に変換
      const i = this.#player.prio2index[ii];

      const data = fd[i];
      const cellID = data.cellIndex;

      // cell再利用
      let mesh = this.#prevMesh[i];
      const part = this.#player.animePackData.parts(i);
      const partType = part.type();
      let overWrite = (this.#substituteOverWrite[i] !== null) ? this.#substituteOverWrite[i] : false;
      let overWritekeyParam = this.#substituteKeyParam[i];

      // 処理分岐処理
      switch (partType)
      {
        case SsPartType.Instance:
          if (mesh == null)
          {
            mesh = this.#MakeCellPlayer(part.refname());
            mesh.Name = part.name();
          }
          break;
        case SsPartType.Normal:
        case SsPartType.Mask:
          if (cellID >= 0 && this.#prevCellID[i] !== cellID)
          {
            // TODO
            if (mesh != null)
              mesh = null;

            mesh = this.#MakeCellMesh(cellID); // (cellID, i)?
            mesh.Name = part.name();
          }
          break;
        case SsPartType.Mesh:
          if (cellID >= 0 && this.#prevCellID[i] !== cellID)
          {
            if (mesh != null)
              mesh = null;
            
            mesh = this.#MakeMeshCellMesh(i, cellID); // (cellID, i)?
            mesh.Name = part.name();
          }
          break;
        case SsPartType.Nulltype:
        case SsPartType.Joint:
          if (this.#prevCellID[i] !== cellID)
          {
            // TODO
            if (mesh != null)
              mesh = null;

            mesh = new CL3D.SceneNode();
            mesh.Name = part.name();
          }
          break;
        default:
          if (cellID >= 0 && this.#prevCellID[i] !== cellID)
          {
            // 小西 - デストロイ処理
            if (mesh != null)
              mesh = null;
            
            mesh = this.#MakeCellMesh(cellID); // (cellID, i)?
            mesh.Name = part.name();
          }
          break;
      }

      // 初期化が行われなかった場合(あるの？)
      if (mesh == null)
        continue;

      this.#prevCellID[i] = cellID;
      this.#prevMesh[i] = mesh;

      // 描画関係処理
      switch (partType)
      {
        case SsPartType.Instance:
          {
            // インスタンスパーツのアップデート
            // let pos = new Float32Array(5);
            this.#_instancePos[0] = 0; // pos x
            this.#_instancePos[1] = 0; // pos x
            this.#_instancePos[2] = 1; // scale x
            this.#_instancePos[3] = 1; // scale x
            this.#_instancePos[4] = 0; // rot
            this.#_instancePos = this.#player.TransformPositionLocal(this.#_instancePos, data.index, frameNumber);
            // TODO
            mesh.Rot.X = 0.0;
            mesh.Rot.Y = this.#_instancePos[4] * Math.PI / 180;
            mesh.Rot.Z = 0.0;
            mesh.Pos.X =this.#_instancePos[0];
            mesh.Pos.Y = this.#_instancePos[1];
            mesh.Pos.Z = 0.0;
            mesh.Scale.X = this.#_instancePos[2];
            mesh.Scale.Y =  this.#_instancePos[3];
            mesh.Scale.Z = 0.0;

            let opacity = data.opacity / 255.0; // fdには継承後の不透明度が反映されているのでそのまま使用する
            if (data.localopacity < 255)
              // ローカル不透明度が使われている場合は255以下の値になるので、255以下の場合にローカル不透明度で上書き
              opacity = data.localopacity / 255.0;
            // TODO
            mesh.SetAlpha(opacity * this.parentAlpha);
            mesh.Visible = !data.f_hide;

            // 描画
            let refKeyframe = data.instanceValue_curKeyframe;
            let refStartframe = data.instanceValue_startFrame;
            let refEndframe = data.instanceValue_endFrame;
            let refSpeed = data.instanceValue_speed;
            let refloopNum = data.instanceValue_loopNum;
            let infinity = false;
            let reverse = false;
            let pingpong = false;
            let independent = false;

            const INSTANCE_LOOP_FLAG_INFINITY = 0b0000000000000001;
            const INSTANCE_LOOP_FLAG_REVERSE = 0b0000000000000010;
            const INSTANCE_LOOP_FLAG_PINGPONG = 0b0000000000000100;
            const INSTANCE_LOOP_FLAG_INDEPENDENT = 0b0000000000001000;
            const lflags = data.instanceValue_loopflag;
            if (lflags & INSTANCE_LOOP_FLAG_INFINITY)
              // 無限ループ
              infinity = true;
            
            if (lflags & INSTANCE_LOOP_FLAG_REVERSE)
              // 逆再生
              reverse = true;
            
            if (lflags & INSTANCE_LOOP_FLAG_PINGPONG)
              // 往復
              pingpong = true;
            
            if (lflags & INSTANCE_LOOP_FLAG_INDEPENDENT)
              // 独立
              independent = true;
            
            
            // インスタンスパラメータを上書きする
            if (overWrite)
            {
              refStartframe = overWritekeyParam.refStartframe;
              refEndframe = overWritekeyParam.refEndframe;
              refSpeed = overWritekeyParam.refSpeed;
              refloopNum = overWritekeyParam.refloopNum;
              infinity = overWritekeyParam.infinity;
              reverse = overWritekeyParam.reverse;
              pingpong = overWritekeyParam.pingpong;
              independent = overWritekeyParam.independent;
            }

            if (mesh.startFrame !== refStartframe || mesh.endFrame !== refEndframe)
              mesh.SetAnimationSection(refStartframe, refEndframe);
            

            // タイムライン上の時間 （絶対時間）
            let time = frameNumber;

            // 独立動作の場合
            if (independent === true)
            {
              this.#liveFrame[ii] += ds;
              time = Math.floor(this.#liveFrame[ii]);
            }

            // このインスタンスが配置されたキーフレーム（絶対時間）
            const selfTopKeyframe = refKeyframe;

            let reftime = Math.floor((time - selfTopKeyframe) * refSpeed); // 開始から現在の経過時間
            if (reftime < 0)
              continue; // そもそも生存時間に存在していない
            if (selfTopKeyframe > time)
              continue;

            const inst_scale = refEndframe - refStartframe + 1; // インスタンスの尺

            // 尺が０もしくはマイナス（あり得ない
            if (inst_scale <= 0)
              continue;
            let nowloop = Math.floor(reftime / inst_scale); // 現在までのループ数

            let checkloopnum = refloopNum;

            // pingpongの場合では２倍にする
            if (pingpong) checkloopnum = checkloopnum * 2;

            // 無限ループで無い時にループ数をチェック
            if (!infinity)
            {
              // 無限フラグが有効な場合はチェックせず
              if (nowloop >= checkloopnum)
              {
                reftime = inst_scale - 1;
                nowloop = checkloopnum - 1;
              }
            }

            const temp_frame = Math.floor(reftime % inst_scale); // ループを加味しないインスタンスアニメ内のフレーム

            // 参照位置を決める
            // 現在の再生フレームの計算
            let _time = 0;
            if (pingpong && nowloop % 2 === 1)
            {
              if (reverse)
                reverse = false; // 反転
              else
                reverse = true; // 反転
            }

            if (this.#playDirection <= -1)
              reverse = !reverse;

            if (reverse)
              // リバースの時
              _time = refEndframe - temp_frame;
            else
              // 通常時
              _time = temp_frame + refStartframe;
            
            // インスタンスパラメータを設定
            // インスタンス用SSPlayerに再生フレームを設定する
            mesh.SetFrame(Math.floor(_time));
            // TODO
            this.node.addChild(mesh);
            break;
          }
        //  Instance以外の通常のMeshと空のContainerで処理分岐
        case SsPartType.Normal:
        case SsPartType.Mesh:
        case SsPartType.Joint:
        case SsPartType.Mask:
          {
            const cell = this.#player.fbObj.cells(cellID);
            let verts;
            if (partType === SsPartType.Mesh)
            {
              // ボーンとのバインドの有無によって、TRSの継承行うかが決まる。
              if (data.meshIsBind === 0)
                // バインドがない場合は親からのTRSを継承する
                verts = this.#player.TransformMeshVertsLocal(Player.GetMeshVerts(cell, data, mesh.vertices), data.index, frameNumber);
              else
                // バインドがある場合は変形後の結果が出力されているので、そのままの値を使用する
                verts = Player.GetMeshVerts(cell, data, mesh.vertices);
            }
            else
            {
              verts = (partType === SsPartType.Joint) ? new Float32Array(10) /* dummy */ : mesh.vertices;
              verts = this.#player.TransformVertsLocal(Player.GetVerts(cell, data, verts), data.index, frameNumber);
            }
            // 頂点変形、パーツカラーのアトリビュートがある場合のみ行うようにしたい
            if (data.flag1 & PART_FLAG.VERTEX_TRANSFORM)
            {
              // 524288 verts [4]	//
              // 頂点変形の中心点を算出する
              const vertexCoordinateLUx = verts[3 * 2 + 0];
              const vertexCoordinateLUy = verts[3 * 2 + 1];
              const vertexCoordinateLDx = verts[1 * 2 + 0];
              const vertexCoordinateLDy = verts[1 * 2 + 1];
              const vertexCoordinateRUx = verts[4 * 2 + 0];
              const vertexCoordinateRUy = verts[4 * 2 + 1];
              const vertexCoordinateRDx = verts[2 * 2 + 0];
              const vertexCoordinateRDy = verts[2 * 2 + 1];

              const CoordinateLURUx = (vertexCoordinateLUx + vertexCoordinateRUx) * 0.5;
              const CoordinateLURUy = (vertexCoordinateLUy + vertexCoordinateRUy) * 0.5;
              const CoordinateLULDx = (vertexCoordinateLUx + vertexCoordinateLDx) * 0.5;
              const CoordinateLULDy = (vertexCoordinateLUy + vertexCoordinateLDy) * 0.5;
              const CoordinateLDRDx = (vertexCoordinateLDx + vertexCoordinateRDx) * 0.5;
              const CoordinateLDRDy = (vertexCoordinateLDy + vertexCoordinateRDy) * 0.5;
              const CoordinateRURDx = (vertexCoordinateRUx + vertexCoordinateRDx) * 0.5;
              const CoordinateRURDy = (vertexCoordinateRUy + vertexCoordinateRDy) * 0.5;
              
              const vec2 = Player.CoordinateGetDiagonalIntersection(verts[0], verts[1], CoordinateLURUx, CoordinateLURUy, CoordinateRURDx, CoordinateRURDy, CoordinateLULDx, CoordinateLULDy, CoordinateLDRDx, CoordinateLDRDy, this.#_CoordinateGetDiagonalIntersectionVec2);
              verts[0] = vec2[0];
              verts[1] = vec2[1];
              mesh.update(verts);
              mesh.Name;
            }
            
            const px = verts[0];
            const py = verts[1];
            for (let j = 0; j < verts.length / 2; j++)
            {
              verts[j * 2] -= px;
              verts[j * 2 + 1] -= py;
            }
            // TODO
            mesh.update(verts);
                       
            if (data.flag1 & PART_FLAG.U_MOVE || data.flag1 & PART_FLAG.V_MOVE || data.flag1 & PART_FLAG.U_SCALE || data.flag1 & PART_FLAG.V_SCALE || data.flag1 & PART_FLAG.UV_ROTATION)
            {
              // uv X/Y移動
              const u1 = cell.u1() + data.uv_move_X;
              const u2 = cell.u2() + data.uv_move_X;
              const v1 = cell.v1() + data.uv_move_Y;
              const v2 = cell.v2() + data.uv_move_Y;

              // uv X/Yスケール
              const cx = (u2 + u1) / 2;
              const cy = (v2 + v1) / 2;
              const uvw = ((u2 - u1) / 2) * data.uv_scale_X;
              const uvh = ((v2 - v1) / 2) * data.uv_scale_Y;
              
              // UV回転
              mesh.uvs[0] = cx;
              mesh.uvs[1] = cy;
              mesh.uvs[2] = cx - uvw;
              mesh.uvs[3] = cy - uvh;
              mesh.uvs[4] = cx + uvw;
              mesh.uvs[5] = cy - uvh;
              mesh.uvs[6] = cx - uvw;
              mesh.uvs[7] = cy + uvh;
              mesh.uvs[8] = cx + uvw;
              mesh.uvs[9] = cy + uvh;

              if (data.flag1 & PART_FLAG.UV_ROTATION)
              {
                const rot = (data.uv_rotation * Math.PI) / 180;
                for (let idx = 0; idx < 5; idx++)
                {
                  const dx = mesh.uvs[idx * 2 + 0] - cx; // 中心からの距離(X)
                  const dy = mesh.uvs[idx * 2 + 1] - cy; // 中心からの距離(Y)

                  const cos = Math.cos(rot);
                  const sin = Math.sin(rot);

                  const tmpX = cos * dx - sin * dy; // 回転
                  const tmpY = sin * dx + cos * dy;

                  mesh.uvs[idx * 2 + 0] = cx + tmpX; // 元の座標にオフセットする
                  mesh.uvs[idx * 2 + 1] = cy + tmpY;
                }
              }
              mesh.dirty++; // 更新回数？をカウントアップすると更新されるようになる
            }

            //
            mesh.Pos.X = px;
            mesh.Pos.Y = py;
            mesh.Pos.Z = 0.0;
            
            // TODO
            // 小西: 256指定と1.0指定が混在していたので統一
            data.opacity / 255.0; // fdには継承後の不透明度が反映されているのでそのまま使用する
            // 小西: 256指定と1.0指定が混在していたので統一
            if (data.localopacity < 255)
              // ローカル不透明度が使われている場合は255以下の値になるので、255以下の場合にローカル不透明度で上書き
              data.localopacity / 255.0;
            
            //mesh.alpha = opacity * this.parentAlpha; // 255*255
            mesh.Visible = !data.f_hide;

            // if (data.h_hide) console.log('hide ! ' + data.cellIndex);
            //
            if (data.useColorMatrix)
            {
              // TODO
              // 小西 - パーツカラーが乗算合成じゃないならフィルタで処理
              const colorMatrix = this.GetColorMatrix(data.colorBlendType, data.colorRate, data.colorArgb32);
              mesh.filters = [colorMatrix];
            }

            // 小西 - tintデータがあれば適用
            if (data.tint)
            {
              mesh.tint = data.tint;
              // パーツカラーのAを不透明度に乗算して処理する
              const ca = ((data.partsColorARGB & 0xff000000) >>> 24) / 255;
              mesh.alpha = mesh.alpha * ca;
            }

            // TODO:
            /*
            if (data.tintRgb) {
              mesh.tintRgb = data.tintRgb;
            }
            */

            const blendMode = this.#alphaBlendType[i];
            if (blendMode === 1 || blendMode === 5)
              mesh.alpha = 1.0; // 不透明度を固定にする

            if (partType !== SsPartType.Mask)
              this.node.addChild(mesh);
            break;
          }
        case SsPartType.Nulltype:
          {
            // TODO
            // NULLパーツのOpacity/Transform設定
            this.#player.InheritOpacity(1.0, data.index, frameNumber);
            //mesh.alpha = (opacity * data.localopacity) / 255.0;
            const verts = this.#player.TransformVerts(Player.GetDummyVerts(), data.index, frameNumber);
            
            const px = verts[0];
            const py = verts[1];
            mesh.Pos.X = px;
            mesh.Pos.Y = py;
            mesh.Pos.Z = 0.0;
            
            // TODO
            Math.atan2(verts[5] - verts[3], verts[4] - verts[2]);
            Math.atan2(verts[7] - verts[3], verts[6] - verts[2]);

            mesh.Rot.X = 0.0;
            mesh.Rot.Y = 0.0;
            mesh.Rot.Z = 0.0;
            //mesh.skew.x = ay - ax - Math.PI / 2;
            break;
          }
      }
    }
  }

  /**
   * パーツの描画モードを取得する
   * @return {array} - 全パーツの描画モード
   */
  GetPartsBlendMode()
  {
    const animePacks = this.#player.animePackData;
    const l = animePacks.partsLength();
    let ret = [];
    for (let i = 0; i < l; i++)
    {
      const alphaBlendType = animePacks.parts(i).alphaBlendType();
      let blendMode;
      // TODO
      switch (alphaBlendType)
      {
        case 0:
          blendMode = 0; //NORMAL
          break;
        case 1:
          blendMode = 1; //MULTIPLY  not supported 不透明度が利いてしまう。
          break;
        case 2:
          blendMode = 2; //ADD
          break;
        case 3:
          blendMode = 3; //NORMAL  WebGL does not supported "SUB"
          break;
        case 4:
          blendMode = 4; //MULTIPLY  WebGL does not supported "alpha multiply"
          break;
        case 5:
          blendMode = 5; //SCREEN  not supported 不透明度が利いてしまう。
          break;
        case 6:
          blendMode = 6; //EXCLUSION  WebGL not supported "Exclusion"
          break;
        case 7:
          blendMode = 7; //NORMAL  WebGL not supported "reverse"
          break;
        default:
          blendMode = 8; //NORMAL  WebGL not supported "SUB"
          break;
      }
      ret.push(blendMode);
    }
    return ret;
  }

  /**
   *
   * 名前を指定してパーツの再生するインスタンスアニメを変更します。
   * 指定したパーツがインスタンスパーツでない場合、falseを返します.
   * インスタンスパーツ名はディフォルトでは「ssae名:モーション名」とつけられています。
   * 再生するアニメの名前は アニメパック名 と アニメ名 で指定してください。
   * 現在再生しているアニメを指定することは入れ子となり無限ループとなるためできません。
   *
   * 変更するアニメーションは同じ ssfb に含まれる必要があります。
   * インスタンスパーツが再生するアニメを変更します
   *
   * インスタンスキーは
   *
   * @param partName SS上のパーツ名
   * @param animePackName 参照するアニメパック名
   * @param animeName 参照するアニメ名
   * @param overWrite インスタンスキーの上書きフラグ
   * @param keyParam インスタンスキー
   *
   * @constructor
   */
  ChangeInstanceAnime(partName, animePackName, animeName, overWrite, keyParam = null)
  {
    let rc = false;

    if (this.animePackName !== null && this.animeName !== null) {
      let packData = this.#player.animePackData;
      let partsLength = packData.partsLength();
      for (let index = 0; index < partsLength; index++)
      {
        let partData = packData.parts(index);
        if (partData.name() === partName)
        {
          let mesh = this.#prevMesh[index];
          if (mesh === null || mesh instanceof SS6Player)
          {
            this.#substituteOverWrite[index] = overWrite;

            let keyParamAsSubstitute;
            if (keyParam !== null)
            {
              keyParamAsSubstitute = keyParam;
              mesh = this.#MakeCellPlayer(animePackName + '/' + animeName, keyParam.refStartframe);
            }
            else
            {
              mesh = this.#MakeCellPlayer(animePackName + '/' + animeName);
              keyParamAsSubstitute = new SS6PlayerInstanceKeyParam();
              keyParamAsSubstitute.refStartframe = mesh.startFrame;
              keyParamAsSubstitute.refEndframe = mesh.endFrame;
            }
            mesh.Name = partData.name();
            this.#prevMesh[index] = mesh;
            this.#substituteKeyParam[index] = keyParamAsSubstitute;

            rc = true;
            break;
          }
        }
      }
    }
    return rc;
  } 
}

class FrameEvent {
	constructor(context, type = "seque") {
		const me = this;

		me.context = context;
		me.firstTime = true;
		me.behavior = null;

		me.EVENT_ARRAY = [];
		me.EVENT_INDEX = 0;

		me.EVENT_HANDLER = () => { };

		me._init(type);
	}

	_init(type) {
		const me = this;

		me.action = new action_StoryPrivate();
		me.action._init();

		switch (type) {
			case "seque":
				me.EVENT_HANDLER = () => { me._runSeque(); };
				break;

			case "sync":
				me.EVENT_HANDLER = () => { me._runSync(); };
				break;

			case "dialog":
				me.EVENT_HANDLER = () => { me._runDialog(); };
				break;
		}
	}

	_runSeque() {
		const me = this;

		if (me.firstTime == true) {
			Global.Emitter.on("pass_behavior", (behavior) => {
				me.behavior = behavior;
				Global.Emitter.off("pass_behavior");
			});

			// ccbCallAction(me.context.StoryAction, me.EVENT_ARRAY[0]);
			me.action.Event = me.EVENT_ARRAY[0];
			me.action.execute();

			me.firstTime = false;
		}

		else {
			for (let i = 0; i < Global.StateList.length; ++i) {
				if (Global.StateList[i] != "nothing")
					return;
			}

			// ccbCallAction(me.context.StoryAction, me.EVENT_ARRAY[++me.EVENT_INDEX]);
			me.action.Event = me.EVENT_ARRAY[++me.EVENT_INDEX];
			me.action.execute();
		}

		if (me.EVENT_INDEX == me.EVENT_ARRAY.length) {
			me.EVENT_INDEX = 0;
			ccbUnregisterOnFrameEvent(me.EVENT_HANDLER);
		}
	}

	_runSync() {
		const me = this;

		if (me.firstTime == true) {
			Global.Emitter.on("pass_behavior", (behavior) => {
				me.behavior = behavior;
				Global.Emitter.off("pass_behavior");
			});

			// ccbCallAction(me.context.StoryAction, me.EVENT_ARRAY[0]);
			me.action.Event = me.EVENT_ARRAY[0];
			me.action.execute();

			me.firstTime = false;
		}

		else if (me.behavior.State == "nothing") {
			// ccbCallAction(me.context.StoryAction, me.EVENT_ARRAY[++me.EVENT_INDEX]);
			me.action.Event = me.EVENT_ARRAY[++me.EVENT_INDEX];
			me.action.execute();
		}

		if (me.EVENT_INDEX == me.EVENT_ARRAY.length) {
			me.EVENT_INDEX = 0;
			ccbUnregisterOnFrameEvent(me.EVENT_HANDLER);
		}
	}

	_runDialog() {
		const me = this;

		if (me.firstTime == true) {
			Global.Emitter.on("pass_behavior", (behavior) => {
				me.behavior = behavior;
				Global.Emitter.off("pass_behavior");
			});

			// ccbCallAction(me.context.StoryAction, me.EVENT_ARRAY[0]);
			me.action.Event = me.EVENT_ARRAY[0];
			me.action.execute();

			me.firstTime = false;
		}

		else if (me.behavior.State == "nothing") {
			// ccbCallAction(me.context.StoryAction, me.EVENT_ARRAY[++me.EVENT_INDEX]);
			me.action.Event = me.EVENT_ARRAY[++me.EVENT_INDEX];
			me.action.execute();
		}

		if (me.EVENT_INDEX == me.EVENT_ARRAY.length) {
			me.EVENT_INDEX = 0;
			ccbUnregisterOnFrameEvent(me.EVENT_HANDLER);
		}
	}

	getVariable(event) {
		if (event.length == 0)
			return null;

		if (event[0] == " ")
			return;

		let array1 = event.split(/\s/);

		let obj = new Object();

		obj["name"] = array1[0];

		let array2 = array1.slice(1);
		for (let i = 0; i < array2.length; ++i) {
			let array3 = array2[i].split("=");

			if (array3[0] == "")
				continue;

			if (array3[0][0] == "#") {
				let define = array2[i].slice(1);
				obj["define"] += ";" + define;
				continue;
			}

			if (array3[1] == null)
				obj["default"] = array3[0];

			else
				obj[array3[0]] = array3[1];
		}

		return obj;
	}

	dispatch(macro, event) {
		const me = this;

		if (event[0].toString() == "[object Object]") {
			me.EVENT_ARRAY = event;
			ccbRegisterOnFrameEvent(me.EVENT_HANDLER);

			return;
		}

		let _event = [];

		for (let i = 0; i < event.length; ++i) {
			let index = event[i].indexOf(" ");
			let name = event[i].slice(0, index);

			if (macro[name] == null) {
				let obj = me.getVariable(event[i]);
				_event.push(JSON.stringify(obj));
				continue;
			}
			let flat_macroObj = macro[name].flatAll();

			for (let p = 0; p < flat_macroObj.length; ++p) {
				let tmp_macroEvent = flat_macroObj[p];

				for (let c = 0; c < macro[name + "_Param"].length; ++c) {
					tmp_macroEvent = tmp_macroEvent.replaceAll(macro[name + "_Param"][c], event[i].split(/\s/)[c + 1].split("=")[1]);
				}

				let obj = me.getVariable(tmp_macroEvent);
				_event.push(JSON.stringify(obj));
			}
		}

		me.EVENT_ARRAY = _event;
		ccbRegisterOnFrameEvent(me.EVENT_HANDLER);
	}
}

class ImmediateEvent {
	constructor() {
		const me = this;

		me.EVENT_ARRAY = [];

		me.action = new _ccb_action_StoryPrivate();
		me.action._init();
	}

	_run() {
		const me = this;

		for (let index = 0; index < me.EVENT_ARRAY.length; ++index) {
			me.action.Event = me.EVENT_ARRAY[index];
			me.action.execute();
		}
	}

	getVariable(event) {
		if (event.length == 0)
			return null;

		if (event[0] == " ")
			return;

		let array1 = event.split(/\s/);

		let obj = new Object();

		obj["name"] = array1[0];

		let array2 = array1.slice(1);
		for (let i = 0; i < array2.length; ++i) {
			let array3 = array2[i].split("=");

			if (array3[0] == "")
				continue;

			if (array3[0][0] == "#") {
				let define = array2[i].slice(1);
				obj["define"] += ";" + define;
				continue;
			}

			if (array3[1] == null)
				obj["default"] = array3[0];

			else
				obj[array3[0]] = array3[1];
		}

		return obj;
	}
	
	dispatch(macro, event) {
		const me = this;

		if (event[0].toString() == "[object Object]") {
			me.EVENT_ARRAY = event;
			me._run();

			return;
		}

		let _event = [];

		for (let i = 0; i < event.length; ++i) {
			let index = event[i].indexOf(" ");
			let name = event[i].slice(0, index);

			if (macro[name] == null) {
				let obj = me.getVariable(event[i]);
				_event.push(JSON.stringify(obj));
				continue;
			}
			let flat_macroObj = macro[name].flatAll();

			for (let p = 0; p < flat_macroObj.length; ++p) {
				let tmp_macroEvent = flat_macroObj[p];

				for (let c = 0; c < macro[name + "_Param"].length; ++c) {
					tmp_macroEvent = tmp_macroEvent.replaceAll(macro[name + "_Param"][c], event[i].split(/\s/)[c + 1].split("=")[1]);
				}

				let obj = me.getVariable(tmp_macroEvent);
				_event.push(JSON.stringify(obj));
			}
		}

		me.EVENT_ARRAY = _event;
		me._run();
	}
}

/**
 * @type {import("ammo").default}
 */
const Ammo = await AmmoLib();

/**
 * @type {import("effekseer").default}
 */
const effekseer = effekseerLib;

class RekapiActor extends Actor {
    constructor(config) {
        super(config);
    }
}
const Global = {
    Emitter: mitt(),
    Rekapi: new Rekapi(),

    StateIndex: 0,
    StateList: [],
    StateList: [],

    SaveData:
    {
        "line": 0,
        "define": { "jscode": [] },
        "screenshot": { "name": "", "base64": "" }
    },

    IsSave: false,
    IsLoad: false,
    IsMenu: false,
    IsOption: false,

    MouseOut: false
};

Global.Emitter.on("set_behavior_state", (behavior) => {
    Global.StateList[behavior.StateIndex] = behavior.State;
});

export { Ammo, AnimatorRigidPhysicsBody, FrameEvent, Global, ImmediateEvent, RekapiActor, SS6Player, SS6PlayerInstanceKeyParam, SS6Project, effekseer };
