export enum ContentTypeEnum {
  NUMERIC,
  ALPHANUMERIC,
  KANJI,
  BYTE,
}

export class Data {
  static data: Uint8Array = new Uint8Array();

  static numericEncoding(content: string) {
    return this.data;
  }

  static alphanumericEncoding(content: string) {
    return this.data;
  }

  static kanjiEncoding(content: string) {
    return this.data;
  }

  static byteEncoding(content: string) {
    return this.data;
  }
}
