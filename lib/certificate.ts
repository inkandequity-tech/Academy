import "server-only";
import crypto from "node:crypto";
import QRCode from "qrcode";
import { ACADEMY, SITE_URL } from "./config";

// Crockford-style alphabet: no 0/O, 1/I/L, U, so a code read aloud or typed is unambiguous.
const ALPHABET = "23456789ABCDEFGHJKMNPQRSTVWXYZ";

function chunk(n: number) {
  const bytes = crypto.randomBytes(n);
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
}

/** e.g. IEQA-2026-7KQ4-M2XD */
export function newCertificateCode(year = new Date().getFullYear()) {
  return `${ACADEMY.certificatePrefix}-${year}-${chunk(4)}-${chunk(4)}`;
}

export function normaliseCode(raw: string) {
  return raw.toUpperCase().replace(/[^A-Z0-9-]/g, "").trim();
}

export function verifyUrl(code: string) {
  return `${SITE_URL}/verify/${encodeURIComponent(code)}`;
}

export async function qrSvg(text: string) {
  return QRCode.toString(text, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: "#0a0f2e", light: "#ffffff" } });
}
