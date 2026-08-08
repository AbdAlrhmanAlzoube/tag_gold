import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function NotFoundPage() {
  return (
    <div className="w-full max-w-lg mx-auto text-center py-16 animate-fade-in-up">
      <Seo title="الصفحة غير موجودة" path="/404" noindex description="الصفحة المطلوبة غير موجودة." />
      <h1 className="text-4xl font-extrabold text-navy-900 mb-3">404</h1>
      <p className="text-navy-800/60 mb-8">الصفحة التي تبحث عنها غير موجودة.</p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link to="/" className="px-5 py-2.5 rounded-lg bg-gold-500 text-white font-semibold">
          الرئيسية
        </Link>
        <Link to="/verify" className="px-5 py-2.5 rounded-lg border border-gold-300 text-navy-900 font-semibold">
          التحقق من شهادة
        </Link>
      </div>
    </div>
  )
}
