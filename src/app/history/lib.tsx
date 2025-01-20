"use client";
import { OLD_FIXED_ARRAY_QrCode } from "@/lib/OLD_FIXED_ARRAY_QrCode";
import QRCode from "@/lib/qrcode/qrsvg";
import QRCode_V0_1_FIXED_ALIGNMENT from "@/lib/qrcode_v0.1/qrsvg";
import { HistoryQrCode } from "./page";

export default function QRVersion({ qr }: { qr: HistoryQrCode }) {
  switch (qr.version) {
    case "fixed_array":
      return <OLD_FIXED_ARRAY_QrCode size={256} />;
    case "v0.1":
      return <QRCode_V0_1_FIXED_ALIGNMENT size={256} />;
    default:
      return <QRCode imgSize={256} version={qr.qrVersion} margin={qr.margin} />;
  }
}
