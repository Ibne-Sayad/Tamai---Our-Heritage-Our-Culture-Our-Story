export function Icon({ kind = 0, className = "" }: { kind?: number; className?: string }) {
  const paths = [
    <path key="history" d="M5 4h13v16H5zM8 8h7M8 12h7M8 16h4M3 4v16" />,
    <path key="culture" d="M12 21V10m0 5C2 15 2 7 3 5c6 0 9 4 9 10Zm0 0c10 0 10-8 9-10-6 0-9 4-9 10Zm0-5C8 7 9 3 12 1c3 2 4 6 0 9Z" />,
    <path key="textile" d="M5 2v20M10 2v20M15 2v20M20 2v20M2 5h20M2 10h20M2 15h20M2 20h20" />,
    <path key="institution" d="m2 8 10-6 10 6H2Zm3 3v8m7-8v8m7-8v8M2 22h20M3 19h18" />,
    <path key="people" d="M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM5 21v-3a7 7 0 0 1 14 0v3M3 7a2 2 0 0 0 0 4m18-4a2 2 0 0 1 0 4" />,
    <path key="photo" d="M3 4h18v16H3zM3 17l6-7 5 5 3-3 4 5M17 8h.01" />,
  ];
  return <svg className={className} width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[kind % paths.length]}</svg>;
}
export function Arrow() { return <span aria-hidden="true">↗</span>; }
