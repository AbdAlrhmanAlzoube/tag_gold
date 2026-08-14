interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: { height: 40, width: 60 },
  md: { height: 64, width: 96 },
  lg: { height: 88, width: 132 },
}

export const BRAND_LOGO_SRC = '/brand/taj-logo.png'

export default function BrandLogo({ size = 'md', className = '' }: BrandLogoProps) {
  const dim = sizes[size]
  const brandName = import.meta.env.VITE_BRAND_NAME || 'TAJ JEWELRY'

  return (
    <img
      src={BRAND_LOGO_SRC}
      alt={brandName}
      width={dim.width}
      height={dim.height}
      className={`object-contain flex-shrink-0 select-none rounded-md ${className}`}
      style={{ width: dim.width, height: dim.height }}
      decoding="async"
    />
  )
}
