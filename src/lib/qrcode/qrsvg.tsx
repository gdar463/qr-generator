"use client";
import QR from "./qr";

interface QRProps {
  content: string;
  imgSize?: number;
  version?: number;
  margin?: number;
}

export default function QRCode({ content, imgSize, version, margin }: QRProps) {
  const qr = new QR(content, version ?? 1, margin ?? 0);
  const { viewport, bg } = qr.init();
  const dPath = qr.drawBits();

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
