"use client";
import { makeBaseForm } from "./base";
import { drawBits } from "./draw";

interface QRProps {
  imgSize?: number;
  version?: number;
  margin?: number;
}

export default function QRCode({ imgSize, version, margin }: QRProps) {
  // 0-indexed
  const size = 4 * (version ?? 1) + 17 + (margin ?? 0) * 2 - 1;
  let bits = Array.from({ length: size + 1 }, () =>
    Array(size + 1).fill(false),
  );
  const base = makeBaseForm(size, margin ?? 0, bits);
  const { viewport, bg } = base;
  bits = base.bits;
  const dPath = drawBits(bits);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewport}
      height={imgSize ?? 256}
      width={imgSize ?? 256}
    >
      <path d={bg} fill="#ffffff" />
      <path d={dPath} fill="black" />
    </svg>
  );
}
