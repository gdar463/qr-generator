import Draw from "./draw";
import { getCoords } from "./util";

export default class Image extends Draw {
  version: number = 1;
  margin: number = 0;
  size: number = 1;
  imgBits: boolean[][] = [];

  makeBaseForm() {
    const viewport = `0 0 ${this.size} ${this.size}`;
    const bg = `M0,0h${this.size}v${this.size}h-${this.size}z`;
    this.drawLocatorEyes();
    if (this.version >= 2) {
      this.drawAlignmentPattern();
    }
    this.drawTimingLines();
    return { viewport, bg };
  }

  drawLocatorEyes() {
    const margin = this.margin;
    for (let i = 0; i < 3; i++) {
      const start =
        i == 0
          ? { x: margin, y: margin }
          : i == 1
            ? { x: this.size - margin - 7, y: margin }
            : { x: margin, y: this.size - margin - 7 };
      for (let j = 0; j < 7; j += 6) {
        this.imgBits[start.y + j]!.fill(true, start.x, start.x + 7);
        this.drawVLine(true, start.x + j, start.y + 1, start.y + 6);
      }
      this.drawSquare(true, { x: start.x + 2, y: start.y + 2 }, 3);
    }
  }

  drawAlignmentPattern() {
    const margin = this.margin;
    const coords = getCoords(this.version, margin);
    for (const { x, y } of coords) {
      if (
        !(x < margin + 8 && y < margin + 8) &&
        !(x + 5 > this.size - margin - 8 && y < margin + 8) &&
        !(x < margin + 8 && y + 5 > this.size - margin - 8)
      ) {
        for (let j = 0; j < 5; j += 4) {
          this.imgBits[y + j]!.fill(true, x, x + 5);
          this.drawVLine(true, x + j, y + 1, y + 4);
        }
        this.imgBits[y + 2]![x + 2] = true;
      }
    }
  }

  drawTimingLines() {
    this.drawAlternatingHLine(
      this.margin + 6,
      this.margin + 8,
      this.size - this.margin - 8,
    );
    this.drawAlternatingVLine(
      this.margin + 6,
      this.margin + 8,
      this.size - this.margin - 8,
    );
  }
}
