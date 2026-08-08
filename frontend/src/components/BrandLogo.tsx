interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: 48,
  md: 72,
  lg: 96,
}

export default function BrandLogo({ size = 'md', className = '' }: BrandLogoProps) {
  const dim = sizes[size]
  const brandName = import.meta.env.VITE_BRAND_NAME || 'TAJ JEWELRY'

  return (
    <div className={`relative flex-shrink-0 ${className}`} style={{ width: dim, height: dim }}>
      <svg viewBox="0 0 100 100" width={dim} height={dim} aria-label={brandName}>
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dbb866" />
            <stop offset="50%" stopColor="#b8860b" />
            <stop offset="100%" stopColor="#9a6f0a" />
          </linearGradient>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cf9f3f" />
            <stop offset="100%" stopColor="#7a5708" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#goldGrad)" stroke="url(#ringGrad)" strokeWidth="2" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="#faf6eb" strokeWidth="0.8" opacity="0.6" />
        <text
          x="50"
          y="54"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#faf6eb"
          fontSize="28"
          fontWeight="800"
          fontFamily="Cairo, sans-serif"
        >
          TJ
        </text>
        <path
          id="textCircle"
          d="M 50,50 m -32,0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0"
          fill="none"
        />
        <text fill="#faf6eb" fontSize="7" fontWeight="600" letterSpacing="2">
          <textPath href="#textCircle" startOffset="25%">
            {brandName}
          </textPath>
        </text>
      </svg>
    </div>
  )
}
