// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

export class meshDataUV {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):meshDataUV {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsmeshDataUV(bb:flatbuffers.ByteBuffer, obj?:meshDataUV):meshDataUV {
  return (obj || new meshDataUV()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsmeshDataUV(bb:flatbuffers.ByteBuffer, obj?:meshDataUV):meshDataUV {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new meshDataUV()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

uv(index: number):number|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.readFloat32(this.bb!.__vector(this.bb_pos + offset) + index * 4) : 0;
}

uvLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

uvArray():Float32Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? new Float32Array(this.bb!.bytes().buffer, this.bb!.bytes().byteOffset + this.bb!.__vector(this.bb_pos + offset), this.bb!.__vector_len(this.bb_pos + offset)) : null;
}

static startmeshDataUV(builder:flatbuffers.Builder) {
  builder.startObject(1);
}

static addUv(builder:flatbuffers.Builder, uvOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, uvOffset, 0);
}

static createUvVector(builder:flatbuffers.Builder, data:number[]|Float32Array):flatbuffers.Offset;
/**
 * @deprecated This Uint8Array overload will be removed in the future.
 */
static createUvVector(builder:flatbuffers.Builder, data:number[]|Uint8Array):flatbuffers.Offset;
static createUvVector(builder:flatbuffers.Builder, data:number[]|Float32Array|Uint8Array):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addFloat32(data[i]!);
  }
  return builder.endVector();
}

static startUvVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static endmeshDataUV(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createmeshDataUV(builder:flatbuffers.Builder, uvOffset:flatbuffers.Offset):flatbuffers.Offset {
  meshDataUV.startmeshDataUV(builder);
  meshDataUV.addUv(builder, uvOffset);
  return meshDataUV.endmeshDataUV(builder);
}
}
