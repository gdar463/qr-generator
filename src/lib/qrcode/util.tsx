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

export function getCoords(version: number, margin: number) {
  const points = table[version - 2]!;
  let coords: { x: number; y: number }[] = [];
  points.forEach((value, index, arr) => {
    for (let i = index; i < arr.length; i++) {
      coords.push({ x: value + margin - 2, y: arr[i]! + margin - 2 });
      if (value != arr[i]!) {
        coords.push({ x: arr[i]! + margin - 2, y: value + margin - 2 });
      }
    }
  });
  return coords;
}

const table = [
  [6, 18],
  [6, 22],
  [6, 26],
  [6, 30],
  [6, 34],
  [6, 22, 38],
  [6, 24, 42],
  [6, 26, 46],
  [6, 28, 50],
  [6, 30, 54],
  [6, 32, 58],
  [6, 34, 62],
  [6, 26, 46, 66],
  [6, 26, 48, 70],
  [6, 26, 50, 74],
  [6, 30, 54, 78],
  [6, 30, 56, 82],
  [6, 30, 58, 86],
  [6, 34, 62, 90],
  [6, 28, 50, 72, 94],
  [6, 26, 50, 74, 98],
  [6, 30, 54, 78, 102],
  [6, 28, 54, 80, 106],
  [6, 32, 58, 84, 110],
  [6, 30, 58, 86, 114],
  [6, 34, 62, 90, 118],
  [6, 26, 50, 74, 98, 122],
  [6, 30, 54, 78, 102, 126],
  [6, 26, 52, 78, 104, 130],
  [6, 30, 56, 82, 108, 134],
  [6, 34, 60, 86, 112, 138],
  [6, 30, 58, 86, 114, 142],
  [6, 34, 62, 90, 118, 146],
  [6, 30, 54, 78, 102, 126, 150],
  [6, 24, 50, 76, 102, 128, 154],
  [6, 28, 54, 80, 106, 132, 158],
  [6, 32, 58, 84, 110, 136, 162],
  [6, 26, 54, 82, 110, 138, 166],
  [6, 30, 58, 86, 114, 142, 170],
];
