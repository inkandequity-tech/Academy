"use client";
export function PrintButton() {
  return <button type="button" className="btn solid" onClick={() => window.print()}>Print or save as PDF</button>;
}
