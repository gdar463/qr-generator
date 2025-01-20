export function drawBits(bits: boolean[][]) {
  let path = "";
  const max = bits.length;
  for (let y = 0; y < max; y++) {
    let toAdd = "";
    let counter = 0;
    for (let x = 0; x < max; x++) {
      if (bits[y]![x]) {
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
