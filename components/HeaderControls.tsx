"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function ThemeButton() {
  const [light, setLight] = useState(false);
  useEffect(() => setLight(document.documentElement.dataset.theme === "light"), []);
  function toggle() {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("ie-theme", next); } catch {}
    setLight(next === "light");
  }
  return (
    <button className="icon-btn" type="button" onClick={toggle} aria-pressed={light} aria-label="Switch between dark and light theme">
      <svg className="theme-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z" /></svg>
      <svg className="theme-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
    </button>
  );
}

const NAV = [
  ["/course", "Course"],
  ["/faculty", "Faculty"],
  ["/fees", "Fees"],
  ["/verify", "Verify a certificate"],
  ["/faq", "Questions"],
] as const;

export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  return (
    <>
      <nav className={`nav${open ? " open" : ""}`} id="nav" aria-label="Main">
        {NAV.map(([href, label]) => (
          <a key={href} href={href} aria-current={path === href || path.startsWith(href + "/") ? "page" : undefined}>{label}</a>
        ))}
        <a href="/dashboard" aria-current={path.startsWith("/dashboard") ? "page" : undefined}>My course</a>
      </nav>
      <button className="icon-btn menu-btn" type="button" aria-label="Menu" aria-expanded={open} aria-controls="nav" onClick={() => setOpen((o) => !o)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">{open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}</svg>
      </button>
    </>
  );
}
