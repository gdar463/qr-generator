import { makeBaseForm_V0_1 } from "./base";

interface QRProps {
  size?: number;
}

export default function QRCode_V0_1_FIXED_ALIGNMENT({ size }: QRProps) {
  const { viewport, bg, alignment } = makeBaseForm_V0_1(7, 0);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewport}
      height={size ?? 256}
      width={size ?? 256}
    >
      <path d={bg} fill="#ffffff" />
      <path d={alignment} fill="black" />
    </svg>
  );
}
