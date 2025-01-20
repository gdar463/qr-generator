export function OLD_FIXED_ARRAY_QrCode({ size }: { size?: number }) {
  const bits: boolean[][] = [
    [false, false, false, true],
    [false, false, true, true],
    [false, false, false, false],
    [false, true, false, false],
  ];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${bits.length} ${bits.length}`}
      height={size ?? bits.length}
      width={size ?? bits.length}
    >
      {bits.map((yArr, y) => {
        return yArr.map((value, x) => {
          return (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill={value ? "#000000" : "#ffffff"}
            />
          );
        });
      })}
    </svg>
  );
}
