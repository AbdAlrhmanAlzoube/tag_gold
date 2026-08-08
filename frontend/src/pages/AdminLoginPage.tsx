import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { adminLogin } from '../api/client'
import BrandLogo from '../components/BrandLogo'
import Seo from '../components/Seo'
import axios from 'axios'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@tajjewelry.com')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await adminLogin(email, password)
      localStorage.setItem('admin_token', result.data.token)
      localStorage.setItem('admin_user', JSON.stringify(result.data.user))
      navigate('/admin/dashboard')
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message)
      } else if (axios.isAxiosError(err) && err.response?.data?.errors?.email) {
        setError(err.response.data.errors.email[0])
      } else {
        setError('فشل تسجيل الدخول. تحقق من البيانات.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md animate-fade-in-up">
      <Seo title="لوحة التحكم" path="/admin" noindex />
      <div className="bg-white/90 rounded-2xl border border-gold-200/60 shadow-xl p-8">
        <div className="flex flex-col items-center mb-8">
          <BrandLogo size="md" />
          <h1 className="mt-4 text-2xl font-bold text-navy-900">لوحة التحكم</h1>
          <p className="text-sm text-navy-800/50 mt-1">تسجيل دخول الإدارة</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-navy-800 mb-1.5">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gold-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-400 text-left"
              dir="ltr"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy-800 mb-1.5">كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gold-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-400 text-left"
              dir="ltr"
              required
            />
          </div>

          {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold transition-colors disabled:opacity-60 cursor-pointer"
          >
            {loading ? 'جاري الدخول...' : 'دخول'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-gold-600 hover:text-gold-700">
            ← العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  )
}
