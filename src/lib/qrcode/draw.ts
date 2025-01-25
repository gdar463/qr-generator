export default class Draw {
  imgBits: boolean[][] = [];

  drawBits() {
    let path = "";
    const max = this.imgBits.length;
    for (let y = 0; y < max; y++) {
      let toAdd = "";
      let counter = 0;
      for (let x = 0; x < max; x++) {
        if (this.imgBits[y]![x]) {
          if (counter == 0) {
            toAdd += `M${x},${y}`;
          }
          counter++;
        } else {
          if (counter != 0) {
            toAdd += `h${counter}v1h-${counter}z `;
            counter = 0;
          }
        }
      }
      if (counter != 0) {
        toAdd += `h${counter}v1h-${counter}z `;
      }
      path += toAdd + " ";
    }
    return path;
  }

  drawVLine(
    value: boolean,
    x: number,
    startY: number | null,
    endY: number | null,
  ) {
    for (let y = startY ?? 0; y < (endY ?? this.imgBits.length - 1) + 1; y++) {
      this.imgBits[y]![x] = value;
    }
  }

  drawAlternatingHLine(y: number, startX: number, endX: number) {
    for (let x = startX; x < endX + 1; x++) {
      if ((x & 0b1) == (startX & 0b1)) {
        this.imgBits[y]![x] = true;
      }
    }
  }

  drawAlternatingVLine(x: number, startY: number, endY: number) {
    for (let y = startY; y < endY + 1; y++) {
      if ((y & 0b1) == (startY & 0b1)) {
        this.imgBits[y]![x] = true;
      }
    }
  }

  drawSquare(value: boolean, topLeft: { x: number; y: number }, size: number) {
    for (let i = 0; i < size; i++) {
      this.imgBits[topLeft.y + i]!.fill(value, topLeft.x, topLeft.x + size);
    }
  }
}
