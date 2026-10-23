export function LogoMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 6 58 32 32 58 6 32Z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeDasharray="4 5" />
      <path d="M32 17 47 32 32 47 17 32Z" fill="var(--accent)" />
      <circle cx="32" cy="32" r="4.2" fill="var(--warm)" />
    </svg>
  );
}
