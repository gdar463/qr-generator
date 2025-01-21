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
  let bits: boolean[][] = Array.from({ length: size + 1 }, (): boolean[] =>
    Array<boolean>(size + 1).fill(false),
  );
  const base = makeBaseForm(bits, size, margin ?? 0, version ?? 1);
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
