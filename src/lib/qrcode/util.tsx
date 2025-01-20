export function drawVLine(
  bits: boolean[][],
  value: boolean,
  x: number,
  startY: number | null,
  endY: number | null,
) {
  for (let y = startY ?? 0; y < (endY ?? bits.length - 1) + 1; y++) {
    bits[y]![x] = value;
  }
  return bits;
}

export function drawSquare(
  bits: boolean[][],
  value: boolean,
  topLeft: { x: number; y: number },
  size: number,
) {
  for (let i = 0; i < size; i++) {
    bits[topLeft.y + i]!.fill(value, topLeft.x, topLeft.x + size);
  }
  return bits;
}
