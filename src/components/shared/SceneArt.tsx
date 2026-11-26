/**
 * Original vector landscape (sun, layered hills and a winding road) used in
 * place of photographs. Pure SVG, no external assets.
 */
export default function SceneArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="scene-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b1430" />
          <stop offset="0.55" stopColor="#1b2a63" />
          <stop offset="1" stopColor="#c2410c" stopOpacity="0.75" />
        </linearGradient>
        <radialGradient id="scene-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fde68a" />
          <stop offset="0.55" stopColor="#f59e0b" />
          <stop offset="1" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="600" fill="url(#scene-sky)" />
      <circle cx="830" cy="380" r="210" fill="url(#scene-sun)" opacity="0.85" />
      <circle cx="830" cy="380" r="62" fill="#fde68a" />
      <path d="M0 430 L120 330 L230 410 L360 290 L500 420 L640 330 L780 430 L930 320 L1080 420 L1200 360 L1200 600 L0 600 Z" fill="#16224f" opacity="0.9" />
      <path d="M0 500 L160 410 L300 480 L450 390 L610 490 L770 410 L920 495 L1080 420 L1200 480 L1200 600 L0 600 Z" fill="#0f1a40" />
      <path d="M0 560 C220 520 420 575 640 545 C860 515 1040 560 1200 535 L1200 600 L0 600 Z" fill="#080f2a" />
      <path d="M560 600 C600 560 700 548 770 530 C840 512 900 506 960 500" stroke="#f59e0b" strokeOpacity="0.55" strokeWidth="5" strokeDasharray="22 16" strokeLinecap="round" fill="none" />
    </svg>
  );
}
