import { Helmet } from 'react-helmet-async'

const SITE_URL = (import.meta.env.VITE_APP_URL || 'https://taj-jewelry.com').replace(/\/$/, '')
const BRAND = import.meta.env.VITE_BRAND_NAME || 'TAJ JEWELRY'
const BRAND_AR = import.meta.env.VITE_BRAND_NAME_AR || 'تاج للمجوهرات'
const DEFAULT_DESC =
  'مجوهرات تاج في دمشق (TAJ JEWELRY / taj-jewelry) — تحقق من أصالة سبيكة الذهب عبر رقم الشهادة أو رمز QR. محل تاج للمجوهرات في الصالحية.'
const DEFAULT_TITLE = `مجوهرات تاج دمشق | ${BRAND_AR} — ${BRAND}`
const DEFAULT_KEYWORDS =
  'مجوهرات تاج, تاج دمشق, تاج للمجوهرات, TAJ, TAJ JEWELRY, taj-jewelry, مجوهرات دمشق, ذهب الصالحية, تحقق من سبيكة ذهب'
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
  const fullTitle = title ? `${title} | ${BRAND_AR} — ${BRAND}` : DEFAULT_TITLE
  const url = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  return (
    <Helmet>
      <html lang="ar" dir="rtl" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content={DEFAULT_KEYWORDS}
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
    '@type': 'JewelryStore',
    name: BRAND,
    alternateName: [BRAND_AR, 'مجوهرات تاج', 'تاج دمشق', 'taj-jewelry', 'TAJ'],
    url: SITE_URL,
    logo: `${SITE_URL}/brand/taj-logo.png`,
    image: `${SITE_URL}/brand/taj-logo.png`,
    description: DEFAULT_DESC,
    email: 'bassam.alsloom123@gmail.com',
    telephone: ['+963968417550', '+963968724550', '+963944503515'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'الصالحية، شارع الباكستان، دخلة ابو عبدو للعصائر',
      addressLocality: 'دمشق',
      addressRegion: 'دمشق',
      addressCountry: 'SY',
    },
    areaServed: {
      '@type': 'City',
      name: 'دمشق',
    },
    priceRange: '$$',
    currenciesAccepted: 'SYP',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'سبائك ذهب تاج',
      itemListElement: [1, 2, 5, 10, 20, 50, 100].map((w) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: `سبيكة ذهب ${w} غرام — تاج للمجوهرات`,
          brand: BRAND,
        },
      })),
    },
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${BRAND_AR} — ${BRAND}`,
    alternateName: ['مجوهرات تاج', 'تاج دمشق', 'taj-jewelry'],
    url: SITE_URL,
    inLanguage: 'ar',
    publisher: { '@type': 'Organization', name: BRAND, alternateName: BRAND_AR },
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
    areaServed: { '@type': 'City', name: 'دمشق' },
    url: `${SITE_URL}/verify`,
    description: DEFAULT_DESC,
  }
}
