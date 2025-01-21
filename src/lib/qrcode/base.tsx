import { drawSquare, drawVLine, getCoords } from "./util";

function drawLocatorEyes(bits: boolean[][], size: number, margin: number) {
  for (let i = 0; i < 3; i++) {
    const start =
      i == 0
        ? { x: margin, y: margin }
        : i == 1
          ? { x: size - margin - 7, y: margin }
          : { x: margin, y: size - margin - 7 };
    for (let j = 0; j < 7; j += 6) {
      bits[start.y + j]!.fill(true, start.x, start.x + 7);
      bits = drawVLine(bits, true, start.x + j, start.y + 1, start.y + 6);
    }
    bits = drawSquare(bits, true, { x: start.x + 2, y: start.y + 2 }, 3);
  }
  return bits;
}

function drawAlignmentPattern(
  bits: boolean[][],
  margin: number,
  version: number,
) {
  const coords = getCoords(version, margin);
  for (let i = 0; i < coords.length; i++) {
    const { x, y } = coords[i]!;
    for (let j = 0; j < 5; j += 4) {
      bits[y + j]!.fill(true, x, x + 5);
      bits = drawVLine(bits, true, x + j, y + 1, y + 4);
    }
    bits[y + 2]![x + 2]! = true;
  }
  return bits;
}

export function makeBaseForm(
  bits: boolean[][],
  size: number,
  margin: number,
  version: number,
) {
  const viewport = `0 0 ${size + 1} ${size + 1}`;
  const bg = `M0,0h${size}v${size}h-${size}z`;
  bits = drawLocatorEyes(bits, size, margin);
  if (version >= 2) {
    bits = drawAlignmentPattern(bits, margin, version);
  }
  return { viewport, bg, bits };
}
