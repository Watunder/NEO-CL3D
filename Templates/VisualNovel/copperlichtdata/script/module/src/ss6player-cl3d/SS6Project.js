import { Utils } from "../ss6player-lib/dist/ss6player-lib.es5.js"

export class SS6Project
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
    const self = this
    const httpObj = new XMLHttpRequest()
    const method = "GET"

    httpObj.open(method, ssfbPath, true)
    httpObj.responseType = "arraybuffer"
    httpObj.timeout = timeout

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
    }

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
    }

    httpObj.onerror = function()
    {
      if (self.onError !== null)
        self.onError(ssfbPath, timeout, retry, httpObj);
    }

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
};
