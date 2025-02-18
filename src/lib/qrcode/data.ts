export enum ContentTypeEnum {
  NUMERIC,
  ALPHANUMERIC,
  KANJI,
  BYTE,
}

export class Data {
  static numericEncoding(content: string) {
    const data: boolean[] = [];
    const length = Math.ceil(content.length / 3);
    const groups: string[] = [];
    for (let i = 0; i < length * 3; i += 3) {
      groups[i / 3] = parseInt(content.slice(i, i + 3)).toString(2);
    }
    groups.forEach((num) => {
      for (let i = 0; i < num.length; i++) {
        data.push(num[i] == "1" ? true : false);
      }
    });
    return data;
  }

  static alphanumericEncoding(content: string) {
    const data: boolean[] = [];
    return data;
  }

  static kanjiEncoding(content: string) {
    const data: boolean[] = [];
    return data;
  }

  static byteEncoding(content: string) {
    const data: boolean[] = [];
    return data;
  }
}
