export class Draw {
  bits: boolean[][] = [];

  drawBits() {
    let path = "";
    const max = this.bits.length;
    for (let y = 0; y < max; y++) {
      let toAdd = "";
      let counter = 0;
      for (let x = 0; x < max; x++) {
        if (this.bits[y]![x]) {
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
    for (let y = startY ?? 0; y < (endY ?? this.bits.length - 1) + 1; y++) {
      this.bits[y]![x] = value;
    }
  }

  drawAlternatingHLine(y: number, startX: number, endX: number) {
    for (let x = startX; x < endX + 1; x++) {
      if ((x & 0b1) == (startX & 0b1)) {
        this.bits[y]![x] = true;
      }
    }
  }

  drawAlternatingVLine(x: number, startY: number, endY: number) {
    for (let y = startY; y < endY + 1; y++) {
      if ((y & 0b1) == (startY & 0b1)) {
        this.bits[y]![x] = true;
      }
    }
  }

  drawSquare(value: boolean, topLeft: { x: number; y: number }, size: number) {
    for (let i = 0; i < size; i++) {
      this.bits[topLeft.y + i]!.fill(value, topLeft.x, topLeft.x + size);
    }
  }
}
