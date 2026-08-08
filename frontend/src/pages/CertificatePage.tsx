import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { verifyCertificate, getCertificateUrl } from '../api/client'
import type { Certificate } from '../types/certificate'
import BrandLogo from '../components/BrandLogo'
import Seo, { SITE_URL } from '../components/Seo'

interface SpecRowProps {
  label: string
  value: string | number
  valueEn?: string
}

function SpecRow({ label, value, valueEn }: SpecRowProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gold-100 last:border-0">
      <span className="text-sm font-medium text-navy-800/70">{label}</span>
      <span className="text-sm font-bold text-navy-900 text-left" dir="ltr">
        {value}
        {valueEn && (
          <span className="text-navy-800/50 font-normal mr-1">/ {valueEn}</span>
        )}
      </span>
    </div>
  )
}

export default function CertificatePage() {
  const { serial } = useParams<{ serial: string }>()
  const [certificate, setCertificate] = useState<Certificate | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!serial) return

    let cancelled = false

    async function fetchCertificate() {
      setLoading(true)
      setError('')
      try {
        const result = await verifyCertificate(serial!)
        if (cancelled) return
        if (result.success && result.data) {
          setCertificate(result.data)
        } else {
          setError(result.message_ar || 'لم يتم العثور على الشهادة')
        }
      } catch {
        if (!cancelled) {
          setError('لم يتم العثور على الشهادة. تأكد من رقم الشهادة وحاول مرة أخرى.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchCertificate()
    return () => { cancelled = true }
  }, [serial])

  if (loading) {
    return (
      <div className="w-full max-w-4xl animate-fade-in-up">
        <Seo
          title={serial ? `التحقق من الشهادة ${serial}` : 'التحقق من الشهادة'}
          description="جاري التحقق من شهادة أصالة سبيكة الذهب."
          path={serial ? `/cert/${serial}` : '/verify'}
        />
        <div className="bg-white/80 rounded-2xl p-12 text-center shadow-xl">
          <div className="inline-block w-10 h-10 border-4 border-gold-200 border-t-gold-500 rounded-full animate-spin mb-4" />
          <p className="text-navy-800/60 font-medium">جاري التحقق من الشهادة...</p>
        </div>
      </div>
    )
  }

  if (error || !certificate) {
    return (
      <div className="w-full max-w-lg animate-fade-in-up">
        <Seo
          title="شهادة غير موجودة"
          description="لم يتم العثور على شهادة سبيكة الذهب المطلوبة."
          path={serial ? `/cert/${serial}` : '/verify'}
          noindex
        />
        <div className="bg-white/90 rounded-2xl p-8 text-center shadow-xl border border-red-100">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-navy-900 mb-2">شهادة غير موجودة</h2>
          <p className="text-navy-800/60 mb-6">{error}</p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-gold-500 text-white rounded-xl font-bold hover:bg-gold-600 transition-colors"
          >
            العودة للتحقق
          </Link>
        </div>
      </div>
    )
  }

  const certUrl = getCertificateUrl(certificate.serial_number)

  return (
    <div className="w-full max-w-4xl animate-fade-in-up">
      <Seo
        title={`شهادة أصالة ${certificate.serial_number}`}
        description={`شهادة موثقة لسبيكة ${certificate.item_name} — عيار ${certificate.karat}، نقاء ${certificate.purity}، وزن ${certificate.weight}${certificate.weight_unit}. ${certificate.brand_ar || 'تاج للمجوهرات'}.`}
        path={`/cert/${certificate.serial_number}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: certificate.item_name,
          sku: certificate.serial_number,
          brand: { '@type': 'Brand', name: certificate.brand || 'TAJ JEWELRY' },
          description: `سبيكة ${certificate.metal_ar || certificate.metal} عيار ${certificate.karat} — شهادة أصالة رقمية`,
          url: `${SITE_URL}/cert/${certificate.serial_number}`,
          additionalProperty: [
            { '@type': 'PropertyValue', name: 'Karat', value: certificate.karat },
            { '@type': 'PropertyValue', name: 'Purity', value: certificate.purity },
            { '@type': 'PropertyValue', name: 'Weight', value: `${certificate.weight}${certificate.weight_unit}` },
          ],
        }}
      />
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gold-50 via-white to-gold-50/50 border border-gold-200/60 shadow-2xl shadow-gold-900/10">
        {/* Header */}
        <div className="relative px-6 sm:px-8 pt-6 sm:pt-8 pb-4 flex items-start justify-between">
          {certificate.is_verified && (
            <div className="flex items-center gap-1.5 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-emerald-500/30">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              موثقة
            </div>
          )}
          <div className="flex items-center gap-3 mr-auto">
            <div className="text-left">
              <p className="text-xs font-semibold tracking-widest text-gold-600 uppercase">
                {certificate.brand || import.meta.env.VITE_BRAND_NAME || 'TAJ JEWELRY'}
              </p>
              <p className="text-sm text-navy-800/60">Certificate of Authenticity</p>
            </div>
            <BrandLogo size="sm" />
          </div>
        </div>

        {/* Body */}
        <div className="px-6 sm:px-8 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 lg:gap-8">
            {/* Main content */}
            <div>
              <p className="text-sm font-semibold text-gold-500 mb-1">شهادة أصالة رقمية</p>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 mb-6 leading-tight">
                سبيكة موثقة من {certificate.brand_ar || import.meta.env.VITE_BRAND_NAME_AR || 'تاج للمجوهرات'}
              </h1>

              {/* Serial badge */}
              <div className="inline-block bg-navy-900 rounded-xl px-5 py-3 mb-8 shadow-lg">
                <p className="text-xs text-blue-300 font-medium mb-0.5">رقم الشهادة</p>
                <p className="text-xl font-bold text-white font-mono tracking-wider" dir="ltr">
                  {certificate.serial_number}
                </p>
              </div>

              {/* Specs table */}
              <div className="bg-white/70 rounded-xl p-5 border border-gold-100/80 backdrop-blur-sm">
                <SpecRow label="اسم القطعة" value={certificate.item_name} />
                <SpecRow label="المعدن" value={certificate.metal_ar} valueEn={certificate.metal} />
                <SpecRow label="النوع" value={certificate.type_ar} valueEn={certificate.type} />
                <SpecRow label="العيار" value={certificate.karat} />
                <SpecRow label="النقاء" value={certificate.purity} />
                <SpecRow
                  label="الوزن"
                  value={`${certificate.weight} ${certificate.weight_unit}`}
                />
                <SpecRow label="تاريخ الإصدار" value={certificate.issued_at_formatted} />
              </div>
            </div>

            {/* QR sidebar */}
            <div className="flex flex-col items-center">
              <div className="bg-white rounded-2xl p-5 shadow-lg border border-gold-100 w-full max-w-[220px] mx-auto lg:mx-0">
                <div className="bg-white p-2 rounded-lg mb-4">
                  <QRCodeSVG
                    value={certUrl}
                    size={160}
                    level="H"
                    className="mx-auto"
                    imageSettings={{
                      src: '',
                      height: 0,
                      width: 0,
                      excavate: false,
                    }}
                  />
                </div>
                <div className="flex justify-center mb-3">
                  <BrandLogo size="sm" />
                </div>
                <p className="text-xs text-center text-navy-800/60 leading-relaxed mb-3">
                  امسح الرمز للتحقق من الشهادة
                </p>
                <p className="text-center font-mono font-bold text-navy-900 tracking-wider" dir="ltr">
                  {certificate.serial_number}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 py-4 border-t border-gold-100 flex items-center justify-between">
          <p className="text-xs text-navy-800/40">
            Verified by <span className="font-semibold text-gold-600">{certificate.brand || import.meta.env.VITE_BRAND_NAME || 'TAJ JEWELRY'}</span>
          </p>
          <Link
            to="/"
            className="no-print text-xs text-gold-600 hover:text-gold-700 font-semibold transition-colors"
          >
            ← تحقق من شهادة أخرى
          </Link>
        </div>
      </div>
    </div>
  )
}
