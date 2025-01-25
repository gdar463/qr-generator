import Image from "./image";

enum ContentTypeEnum {
  NUMERIC,
  ALPHANUMERIC,
  BYTE,
  KANJI,
}

export default class QR extends Image {
  version: number;
  margin: number;
  size: number;
  content: string;
  contentType: ContentTypeEnum;
  data: Uint8Array;
  imgBits: boolean[][];

  constructor(content: string, version: number, margin: number) {
    super();
    this.version = version;
    this.margin = margin;
    this.size = 4 * (version ?? 1) + 17 + (margin ?? 0) * 2;
    this.content = content;
    this.contentType = ContentTypeEnum.BYTE;
    this.data = new Uint8Array();
    this.imgBits = Array.from({ length: this.size + 1 }, (): boolean[] =>
      Array<boolean>(this.size + 1).fill(false),
    );
  }

  init() {
    return this.makeBaseForm();
  }
}
