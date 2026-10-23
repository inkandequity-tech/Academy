import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ACADEMY, SITE_URL } from "@/lib/config";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${ACADEMY.name}: courtroom practice for junior advocates`, template: `%s | ${ACADEMY.name}` },
  description: "A self-paced course in civil, criminal and writ practice for junior advocates in Uttar Pradesh, taught by the advocates of Ink & Equity, Lucknow. Certificate on passing the final exam.",
  icons: { icon: "/favicon.svg" },
  openGraph: { siteName: ACADEMY.name, type: "website", locale: "en_IN" },
};

export const viewport: Viewport = {
  themeColor: "#0a0f2e",
  colorScheme: "dark light",
};

const THEME_SCRIPT = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('ie-theme');if(!t)t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';d.dataset.theme=t}catch(e){d.dataset.theme='dark'}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <link rel="preload" href="/fonts/fraunces.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/instrument-sans.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <div className="lattice" aria-hidden="true" />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
