import { useState, useEffect, type FormEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import BrandLogo from '../components/BrandLogo'
import Seo from '../components/Seo'

export default function VerifyPage() {
  const [serial, setSerial] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const brandName = import.meta.env.VITE_BRAND_NAME || 'TAJ JEWELRY'
  const brandNameAr = import.meta.env.VITE_BRAND_NAME_AR || 'تاج للمجوهرات'

  useEffect(() => {
    const urlSerial = searchParams.get('serial')
    if (urlSerial) {
      navigate(`/cert/${encodeURIComponent(urlSerial)}`, { replace: true })
    }
  }, [searchParams, navigate])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    const trimmed = serial.trim()
    if (!trimmed) {
      setError('يرجى إدخال رقم الشهادة')
      return
    }

    setLoading(true)
    navigate(`/cert/${encodeURIComponent(trimmed)}`)
  }

  return (
    <div className="w-full max-w-2xl animate-fade-in-up">
      <Seo
        title="تحقق من شهادة سبيكة الذهب"
        description="أدخل رقم شهادة السبيكة للتحقق الفوري من الأصالة والعيار والنقاء والوزن — تاج للمجوهرات TAJ JEWELRY."
        path="/verify"
      />
      <div className="relative overflow-hidden rounded-2xl bg-gold-50/80 backdrop-blur-sm border border-gold-200/60 shadow-xl shadow-gold-900/5">
        <div className="watermark">
          <span>{brandName}</span>
        </div>

        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="flex items-start gap-4 sm:gap-6 mb-8">
            <BrandLogo size="lg" className="hidden sm:block" />
            <BrandLogo size="md" className="sm:hidden" />
            <div className="flex-1 pt-1">
              <p className="text-xs sm:text-sm font-semibold tracking-widest text-gold-600 uppercase mb-1">
                {brandName}
              </p>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-navy-900 leading-tight">
                التحقق من شهادة السبيكة
              </h1>
              <p className="mt-2 text-sm sm:text-base text-navy-800/60 leading-relaxed">
                امسح رمز QR الموجود على القطعة أو أدخل رقم الشهادة يدوياً.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="serial"
                className="block text-sm font-semibold text-navy-800 mb-2"
              >
                رقم الشهادة
              </label>
              <input
                id="serial"
                type="text"
                value={serial}
                onChange={(e) => {
                  setSerial(e.target.value.toUpperCase())
                  setError('')
                }}
                placeholder="SG100001"
                className="w-full px-4 py-3.5 rounded-xl border border-gold-200 bg-white text-navy-900 placeholder:text-navy-800/30 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all text-left font-mono tracking-wider"
                dir="ltr"
                autoComplete="off"
                autoFocus
              />
              {error && (
                <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl bg-gold-500 hover:bg-gold-600 active:bg-gold-700 text-white font-bold text-base sm:text-lg transition-all duration-200 shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? 'جاري التحقق...' : 'عرض الشهادة'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gold-200/50">
            <p className="text-xs text-navy-800/40 text-center">
              {brandNameAr} — نظام التحقق الرقمي من أصالة سبائك الذهب
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center no-print">
        <p className="text-xs text-navy-800/40">
          للتجربة: جرّب الأرقام{' '}
          <button
            type="button"
            onClick={() => setSerial('SG100001')}
            className="text-gold-600 hover:text-gold-700 font-mono underline cursor-pointer"
          >
            SG100001
          </button>
          {' '}أو{' '}
          <button
            type="button"
            onClick={() => setSerial('A01748')}
            className="text-gold-600 hover:text-gold-700 font-mono underline cursor-pointer"
          >
            A01748
          </button>
        </p>
      </div>
    </div>
  )
}
