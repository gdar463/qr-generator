import { Draw } from "./draw";
import { getCoords } from "./util";

export default class QR extends Draw {
  version: number;
  margin: number;
  // 0-indexed
  size: number;
  bits: boolean[][];

  constructor(version: number, margin: number) {
    super();
    this.version = version;
    this.margin = margin;
    this.size = 4 * (version ?? 1) + 17 + (margin ?? 0) * 2 - 1;
    this.bits = Array.from({ length: this.size + 1 }, (): boolean[] =>
      Array<boolean>(this.size + 1).fill(false),
    );
  }

  makeBaseForm() {
    const viewport = `0 0 ${this.size + 1} ${this.size + 1}`;
    const bg = `M0,0h${this.size}v${this.size}h-${this.size}z`;
    this.drawLocatorEyes();
    if (this.version >= 2) {
      this.drawAlignmentPattern();
    }
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
        this.bits[start.y + j]!.fill(true, start.x, start.x + 7);
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
          this.bits[y + j]!.fill(true, x, x + 5);
          this.drawVLine(true, x + j, y + 1, y + 4);
        }
        this.bits[y + 2]![x + 2] = true;
      }
    }
  }
}
