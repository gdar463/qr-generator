import Image from "./image";

enum ContentTypeEnum {
  NUMERIC,
  ALPHANUMERIC,
  BYTE,
  KANJI,
}

export default class QR extends Image {
  content: string;
  contentType: ContentTypeEnum;
  data: Uint8Array;

  constructor(content: string, version: number, margin: number) {
    super();
    this.version = version;
    this.margin = margin;
    this.size = 4 * (version ?? 1) + 17 + (margin ?? 0) * 2;
    this.content = content;
    this.contentType = this.detectContentType();
    this.data = new Uint8Array();
    this.imgBits = Array.from({ length: this.size + 1 }, (): boolean[] =>
      Array<boolean>(this.size + 1).fill(false),
    );
  }

  init() {
    return this.makeBaseForm();
  }

  detectContentType() {
    if (new RegExp("^[0-9]+$").exec(this.content)) {
      return ContentTypeEnum.NUMERIC;
    } else if (new RegExp("^[0-9A-Z $%*+\-./:]+$").exec(this.content)) {
      return ContentTypeEnum.ALPHANUMERIC;
    } else if (
      // This regex was copied from npmjs package "qrcode"
      // Repo: https://github.com/soldair/node-qrcode
      // License: MIT License
      // (license text can be found on the github repo)
      new RegExp(
        "^[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\uFF00-\uFFEF\u4E00-\u9FAF\u2605-\u2606\u2190-\u2195\u203B\u2010\u2015\u2018\u2019\u2025\u2026\u201C\u201D\u2225\u2260\u0391-\u0451\u00A7\u00A8\u00B1\u00B4\u00D7\u00F7]+$",
      ).exec(this.content)
    ) {
      return ContentTypeEnum.KANJI;
    }
    return ContentTypeEnum.BYTE;
  }
}
