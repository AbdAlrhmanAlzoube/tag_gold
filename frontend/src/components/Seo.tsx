import { Helmet } from 'react-helmet-async'

const SITE_URL = (import.meta.env.VITE_APP_URL || 'https://taj-jeweiry.abdulrahem-alzoubi.cloud').replace(/\/$/, '')
const BRAND = import.meta.env.VITE_BRAND_NAME || 'TAJ JEWELRY'
const BRAND_AR = import.meta.env.VITE_BRAND_NAME_AR || 'تاج للمجوهرات'
const DEFAULT_DESC =
  'تحقق من أصالة سبيكة الذهب فوراً عبر رقم الشهادة أو رمز QR — نظام شهادات رقمية موثوق من تاج للمجوهرات TAJ JEWELRY.'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`

export { SITE_URL, BRAND, BRAND_AR }

type SeoProps = {
  title?: string
  description?: string
  path?: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

export default function Seo({
  title,
  description = DEFAULT_DESC,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false,
  jsonLd,
}: SeoProps) {
  const fullTitle = title
    ? `${title} | ${BRAND_AR} — ${BRAND}`
    : `التحقق من شهادة سبيكة الذهب | ${BRAND_AR} — ${BRAND}`
  const url = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  return (
    <Helmet>
      <html lang="ar" dir="rtl" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="تحقق من سبيكة ذهب, شهادة أصالة ذهب, التحقق من شهادة ذهب, تاج للمجوهرات, TAJ JEWELRY, شهادة سبيكة ذهب, QR ذهب, gold bar certificate verification"
      />
      <link rel="canonical" href={url} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'} />
      <meta name="author" content={BRAND} />
      <meta name="theme-color" content="#b8860b" />

      <meta property="og:type" content={type} />
      <meta property="og:locale" content="ar_AR" />
      <meta property="og:site_name" content={`${BRAND_AR} | ${BRAND}`} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={`${BRAND_AR} — التحقق من شهادات الذهب`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND,
    alternateName: BRAND_AR,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description: DEFAULT_DESC,
    areaServed: 'Worldwide',
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${BRAND_AR} — التحقق من الشهادات`,
    url: SITE_URL,
    inLanguage: 'ar',
    publisher: { '@type': 'Organization', name: BRAND },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/cert/{serial}`,
      'query-input': 'required name=serial',
    },
  }
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function serviceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'التحقق من شهادة أصالة سبيكة الذهب',
    serviceType: 'Gold Certificate Verification',
    provider: { '@type': 'Organization', name: BRAND, alternateName: BRAND_AR },
    areaServed: 'Worldwide',
    url: `${SITE_URL}/verify`,
    description: DEFAULT_DESC,
  }
}
