import { Link } from 'react-router-dom'
import BrandLogo from '../components/BrandLogo'
import Seo, {
  organizationJsonLd,
  websiteJsonLd,
  serviceJsonLd,
} from '../components/Seo'

const brandName = import.meta.env.VITE_BRAND_NAME || 'TAJ JEWELRY'
const brandNameAr = import.meta.env.VITE_BRAND_NAME_AR || 'تاج للمجوهرات'

const weights = ['1', '2', '5', '10', '20', '50', '100']

const productSpecs = [
  { label: 'المعدن', value: 'ذهب خالص' },
  { label: 'النقاء', value: '995 / 99.5%' },
  { label: 'العيار', value: '24 قيراط' },
  { label: 'النوع', value: 'سبيكة' },
]

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
      <Seo
        path="/"
        jsonLd={[organizationJsonLd(), websiteJsonLd(), serviceJsonLd()]}
      />

      <header className="fixed top-0 inset-x-0 z-50 bg-[#0c1220]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" />
            <p className="text-sm font-bold text-gold-300 tracking-wide hidden sm:block">{brandNameAr}</p>
          </div>
          <nav aria-label="القائمة الرئيسية" className="flex items-center gap-3">
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
              {brandName} — {brandNameAr}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] mb-5">
              التحقق من شهادة سبيكة الذهب
              <span className="block text-gold-300 mt-1">أصالة موثّقة رقمياً</span>
            </h1>
            <p className="text-lg text-white/55 leading-relaxed mb-8 max-w-lg">
              نظام احترافي للتحقق من أصالة سبائك الذهب عبر رقم الشهادة أو رمز QR —
              ثقة كاملة لعملاء {brandNameAr} في كل قطعة.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/verify"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-white font-bold text-base transition-all shadow-lg shadow-gold-500/25"
              >
                تحقق من شهادة الآن
                <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <a
                href="#product"
                className="inline-flex items-center px-6 py-3.5 rounded-xl border border-white/20 text-white/80 hover:bg-white/5 font-semibold transition-colors"
              >
                تفاصيل المنتج
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-gradient-to-b from-[#f5f0e6] to-[#ebe4d4]" aria-labelledby="how-title">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 id="how-title" className="text-3xl sm:text-4xl font-extrabold text-navy-900 mb-3">
              كيف تتحقق من أصالة الذهب؟
            </h2>
            <p className="text-navy-800/50 max-w-md mx-auto">
              ثلاث خطوات بسيطة لضمان أصالة كل سبيكة ذهب صادرة من {brandNameAr}
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <article key={f.title} className="text-center group">
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gold-500/10 text-gold-600 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
                  {f.icon}
                </div>
                <div className="text-xs font-bold text-gold-500 mb-2">0{i + 1}</div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">{f.title}</h3>
                <p className="text-sm text-navy-800/55 leading-relaxed">{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="bars" className="py-20 sm:py-28 bg-[#080c16] relative overflow-hidden" aria-labelledby="bars-title">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 55% 45% at 15% 20%, rgba(184,134,11,0.18), transparent), radial-gradient(ellipse 50% 40% at 90% 80%, rgba(207,159,63,0.1), transparent)',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-gold-400 text-xs font-bold tracking-[0.28em] uppercase mb-3">The Bar</p>
            <h2 id="bars-title" className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              وجه السبيكة وظهرها
            </h2>
            <p className="text-white/50 max-w-xl mx-auto leading-relaxed">
              قطعة واحدة بوجهين: الفن في الأمام، والضمان الرسمي للوزن والنقاء في الخلف.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-10 items-stretch">
            {[
              {
                src: '/brand/tag-1.png',
                tag: 'TAG 1',
                title: 'الوجه الفني',
                desc: 'نقوش Fortuna البارزة على ذهب خالص',
              },
              {
                src: '/brand/tag-2.png',
                tag: 'TAG 2',
                title: 'الوجه الرسمي',
                desc: 'الوزن، النقاء، وعلامات الفحص المعتمدة',
              },
            ].map((bar) => (
              <figure
                key={bar.tag}
                className="group relative rounded-3xl overflow-hidden bg-black border border-gold-500/20 shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-all duration-500 hover:border-gold-400/50 hover:shadow-[0_24px_80px_rgba(184,134,11,0.22)]"
              >
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_center,rgba(184,134,11,0.12),transparent_70%)]" />
                <div className="aspect-[3/4] flex items-center justify-center p-6 sm:p-8">
                  <img
                    src={bar.src}
                    alt={`${bar.tag} — ${bar.title}`}
                    className="max-h-full w-auto object-contain drop-shadow-[0_12px_40px_rgba(184,134,11,0.35)] transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption className="relative px-6 pb-6 pt-1 text-center">
                  <p className="text-[11px] font-bold tracking-[0.35em] text-gold-400 mb-1">{bar.tag}</p>
                  <p className="text-lg font-bold text-white">{bar.title}</p>
                  <p className="text-sm text-white/45 mt-1">{bar.desc}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="product" className="py-20 sm:py-28 bg-[#0c1220] relative overflow-hidden" aria-labelledby="product-title">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 70% 50% at 20% 30%, rgba(184,134,11,0.22), transparent), radial-gradient(ellipse 50% 40% at 85% 70%, rgba(207,159,63,0.12), transparent)',
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 id="product-title" className="text-3xl sm:text-4xl font-extrabold text-white mb-4">تفاصيل المنتج</h2>
            <p className="text-white/55 leading-relaxed max-w-2xl mx-auto">
              هي قطعة ذهبية مصنعة من قبل شركة {brandName} وتتميز بنقاوتها العالية من الذهب الخالص حيث تحتوي على{' '}
              <span className="text-gold-300 font-semibold">99.5%</span> من الذهب الخالص، دون وجود أي معادن أخرى ممزوجة بها.
            </p>
          </div>

          <div className="mb-10">
            <p className="text-center text-xs font-bold tracking-[0.15em] text-gold-400 mb-4">الوزن</p>
            <div className="flex flex-wrap justify-center gap-3">
              {weights.map((w) => (
                <span
                  key={w}
                  className="min-w-[3.25rem] px-3 py-2 text-center text-sm font-bold text-gold-300 border border-gold-500/30 bg-gold-500/10"
                >
                  {w}
                  <span className="block text-[10px] font-semibold text-white/40 mt-0.5">غرام</span>
                </span>
              ))}
            </div>
          </div>

          <dl className="grid sm:grid-cols-2 gap-8 sm:gap-6 mb-12 max-w-lg mx-auto">
            {productSpecs.map((spec) => (
              <div key={spec.label} className="text-center">
                <dt className="text-xs font-bold tracking-[0.15em] text-gold-400 mb-2">{spec.label}</dt>
                <dd className="text-lg font-bold text-white m-0">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 text-center border-t border-white/10 pt-8">
            <p className="text-white/70 text-sm sm:text-base font-semibold">نحن ملتزمون بالوزن والنقاوة</p>
            <span className="hidden sm:block w-px h-5 bg-white/15" aria-hidden="true" />
            <p className="text-gold-300 text-sm sm:text-base font-bold">معفاة من الضريبة</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0c1220] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(ellipse at center, rgba(184,134,11,0.25), transparent 70%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">جاهز للتحقق من سبيكتك؟</h2>
          <p className="text-white/50 mb-8">أدخل رقم الشهادة أو امسح رمز QR على القطعة الذهبية</p>
          <Link
            to="/verify"
            className="inline-flex px-8 py-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-white font-bold text-lg transition-all shadow-xl shadow-gold-500/20"
          >
            ابدأ التحقق الآن
          </Link>
        </div>
      </section>

      <footer className="bg-[#080c16] py-12 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-5">
          <div className="flex justify-center">
            <BrandLogo size="md" />
          </div>

          <p className="text-sm text-white/55 leading-relaxed" dir="rtl">
            العنوان:{' '}
            <span className="text-white/75">
              سوريا — دمشق — الصالحية — شارع الباكستان — دخلة ابو عبدو للعصائر — مجوهرات تاج
            </span>
          </p>

          <div className="space-y-2 text-sm text-white/55" dir="ltr">
            <p className="text-white/40 text-xs font-semibold tracking-wide" dir="rtl">
              لاستفساراتكم:
            </p>
            <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              <a href="tel:+963968417550" className="hover:text-gold-300 transition-colors font-medium">
                +963 968 417 550
              </a>
              <span className="text-white/20">|</span>
              <a href="tel:+963968724550" className="hover:text-gold-300 transition-colors font-medium">
                +963 968 724 550
              </a>
              <span className="text-white/20">|</span>
              <a href="tel:+963944503515" className="hover:text-gold-300 transition-colors font-medium">
                +963 944 503 515
              </a>
            </p>
            <p>
              <a
                href="mailto:bassam.alsloom123@gmail.com"
                className="hover:text-gold-300 transition-colors"
              >
                bassam.alsloom123@gmail.com
              </a>
            </p>
          </div>

          <p className="text-sm text-white/40 pt-2">
            <Link to="/verify" className="hover:text-gold-300 transition-colors">التحقق من الشهادة</Link>
            <span className="mx-2 text-white/15">|</span>
            <a href="#bars" className="hover:text-gold-300 transition-colors">السبيكة</a>
            <span className="mx-2 text-white/15">|</span>
            <a href="#product" className="hover:text-gold-300 transition-colors">تفاصيل المنتج</a>
          </p>

          <p className="text-sm text-white/30">
            © {new Date().getFullYear()} {brandName} — {brandNameAr}
          </p>
        </div>
      </footer>
    </div>
  )
}
