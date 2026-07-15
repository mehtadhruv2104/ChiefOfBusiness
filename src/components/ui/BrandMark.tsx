interface BrandMarkProps {
  className?: string
}

/** I-beam monogram used as the app icon and inline wordmark glyph. */
export function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true">
      <rect width="512" height="512" rx="112" fill="#15181C" />
      <g transform="translate(256 246)">
        <rect x="-118" y="-92" width="236" height="34" rx="6" fill="url(#brandmark-steel)" />
        <rect x="-118" y="58" width="236" height="34" rx="6" fill="url(#brandmark-steel)" />
        <rect x="-17" y="-92" width="34" height="184" fill="url(#brandmark-steel)" />
      </g>
      <rect x="166" y="358" width="180" height="12" rx="6" fill="#C97A3A" />
      <defs>
        <linearGradient id="brandmark-steel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F4F6F8" />
          <stop offset="0.55" stopColor="#AEB8C2" />
          <stop offset="1" stopColor="#7C8794" />
        </linearGradient>
      </defs>
    </svg>
  )
}
