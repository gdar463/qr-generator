export function makeBaseForm_V0_1(version: number, margin: number) {
  if (version < 1 || version > 40) {
    throw new Error("Invalid version number");
  }

  // 0-indexed
  const size = version * 4 + 17 + margin * 2 - 1;
  const viewport = `0 0 ${size + 1} ${size + 1}`;
  const bg = `M0,0h${size}v${size}h-${size}z`;
  let alignment =
    `M${margin},${margin}h7v1h-7z M${margin + 7},${margin + 1}v5h-1v-5z M${margin + 7},${margin + 6}v1h-7v-1z M${margin},${margin + 6}v-5h1v5z M${margin + 2},${margin + 2}h3v3h-3z` +
    " " +
    `M${size - 7 - margin},${margin}h7v1h-7z M${size - margin},${margin + 1}v5h-1v-5z M${size - margin},${margin + 6}v1h-7v-1z M${size - 7 - margin},${margin + 6}v-5h1v5z M${size - 5 - margin},${margin + 2}h3v3h-3z` +
    " " +
    `M${margin},${size - 7 - margin}h7v1h-7z M${margin + 7},${size - 6 - margin}v5h-1v-5z M${margin + 7},${size - 1 - margin}v1h-7v-1z M${margin},${size - 1 - margin}v-5h1v5z M${margin + 2},${size - 5 - margin}h3v3h-3z`;
  if (version >= 2) {
    const divs = version + 2;
    const total_dist = size + 1 - 7 - 6;
    const divisor = 2 * (divs - 1);
    const step =
      Math.floor((total_dist + Math.floor(divisor / 2) + 1) / divisor) * 2;
    if (version >= 7) {
      alignment += `M6,6h5v1h-5z M11,7v3h-1v-3z M11,10v1h-5v-1z M6,10v-3h1v3z M8,8h1v1h-1z`;
    }
    for (let i = divs - 2; i < 0; i--) {
      const coord = size - 7 - i * step;
      alignment += `M${coord},${coord}h5v1h-5z M${coord + 5},${coord + 1}v3h-1v-3z M${coord + 6},${coord + 4}v1h-5v-1z M${coord},${coord + 4}v-3h1v3z M${coord + 2},${coord + 2}h1v1h-1z`;
    }
  }
  return { viewport, bg, alignment };
}
