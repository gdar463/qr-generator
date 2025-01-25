import Image from "./image";

export default class QR extends Image {
  version: number;
  margin: number;
  size: number;
  data: Uint8Array;
  imgBits: boolean[][];

  constructor(version: number, margin: number) {
    super();
    this.version = version;
    this.margin = margin;
    this.size = 4 * (version ?? 1) + 17 + (margin ?? 0) * 2;
    this.data = new Uint8Array();
    this.imgBits = Array.from({ length: this.size + 1 }, (): boolean[] =>
      Array<boolean>(this.size + 1).fill(false),
    );
  }
}
