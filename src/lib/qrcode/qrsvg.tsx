"use client";
import { drawBits } from "./draw";
import QR from "./qr";

interface QRProps {
  imgSize?: number;
  version?: number;
  margin?: number;
}

export default function QRCode({ imgSize, version, margin }: QRProps) {
  const qr = new QR(version ?? 1, margin ?? 0);
  const { viewport, bg } = qr.makeBaseForm();
  const dPath = drawBits(qr.bits);

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
