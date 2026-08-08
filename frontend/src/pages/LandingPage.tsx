import { Link } from 'react-router-dom'
import BrandLogo from '../components/BrandLogo'

const brandName = import.meta.env.VITE_BRAND_NAME || 'TAJ JEWELRY'
const brandNameAr = import.meta.env.VITE_BRAND_NAME_AR || 'تاج للمجوهرات'

const features = [
  {
    title: 'تحقق فوري',
    desc: 'امسح رمز QR على السبيكة واحصل على شهادة الأصالة خلال ثوانٍ.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
      </svg>
    ),
  },
  {
    title: 'شهادة رقمية',
    desc: 'كل قطعة تحمل رقم تسلسلي فريد مع تفاصيل الوزن والعيار والنقاء.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'ثقة وشفافية',
    desc: 'نظام موثوق يمنح عملاءك ثقة كاملة في أصالة منتجاتهم الذهبية.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
      </svg>
    ),
  },
]

export default function LandingPage() {
  return (
    <div className="w-full">
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#0c1220]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" />
            <div>
              <p className="text-sm font-bold text-gold-300 tracking-wide">{brandName}</p>
              <p className="text-[10px] text-white/40">{brandNameAr}</p>
            </div>
          </div>
          <nav className="flex items-center gap-3">
            <Link
              to="/verify"
              className="hidden sm:inline-block text-sm text-white/70 hover:text-gold-300 transition-colors px-3 py-2"
            >
              التحقق من شهادة
            </Link>
            <Link
              to="/admin"
              className="text-sm font-semibold text-[#0c1220] bg-gold-400 hover:bg-gold-300 px-4 py-2 rounded-lg transition-colors"
            >
              لوحة التحكم
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-[#0c1220]">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(184,134,11,0.35), transparent), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(207,159,63,0.15), transparent)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23dbb866\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16 w-full">
          <div className="max-w-2xl animate-fade-in-up">
            <p className="text-gold-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              {brandName}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] mb-5">
              أصالة الذهب
              <span className="block text-gold-300 mt-1">موثّقة رقمياً</span>
            </h1>
            <p className="text-lg text-white/55 leading-relaxed mb-8 max-w-lg">
              نظام التحقق من شهادات سبائك الذهب عبر QR Code — ثقة كاملة لعملائك في كل قطعة.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/verify"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-white font-bold text-base transition-all shadow-lg shadow-gold-500/25"
              >
                تحقق من شهادة
                <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                to="/admin"
                className="inline-flex items-center px-6 py-3.5 rounded-xl border border-white/20 text-white/80 hover:bg-white/5 font-semibold transition-colors"
              >
                إدارة السبائك
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 animate-bounce">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-[#f5f0e6] to-[#ebe4d4]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mb-3">كيف يعمل النظام؟</h2>
            <p className="text-navy-800/50 max-w-md mx-auto">ثلاث خطوات بسيطة لضمان أصالة كل سبيكة ذهب</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={f.title} className="text-center group">
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gold-500/10 text-gold-600 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
                  {f.icon}
                </div>
                <div className="text-xs font-bold text-gold-500 mb-2">0{i + 1}</div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">{f.title}</h3>
                <p className="text-sm text-navy-800/55 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0c1220] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(ellipse at center, rgba(184,134,11,0.25), transparent 70%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">جاهز للتحقق؟</h2>
          <p className="text-white/50 mb-8">أدخل رقم الشهادة أو امسح رمز QR على القطعة</p>
          <Link
            to="/verify"
            className="inline-flex px-8 py-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-white font-bold text-lg transition-all shadow-xl shadow-gold-500/20"
          >
            ابدأ التحقق الآن
          </Link>
        </div>
      </section>

      <footer className="bg-[#080c16] py-8 text-center">
        <p className="text-sm text-white/30">
          © {new Date().getFullYear()} {brandName} — {brandNameAr}
        </p>
      </footer>
    </div>
  )
}
