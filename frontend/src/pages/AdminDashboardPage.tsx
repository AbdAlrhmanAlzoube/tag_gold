import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  adminCreateCertificate,
  adminDeleteCertificate,
  adminListCertificates,
  adminLogout,
  adminStats,
  adminUpdateCertificate,
  type AdminCertificate,
  type CertificateFormData,
} from '../api/client'
import BrandLogo from '../components/BrandLogo'
import Seo from '../components/Seo'

const emptyForm: CertificateFormData = {
  serial_number: '',
  item_name: '',
  metal: 'Gold',
  metal_ar: 'ذهب',
  type: 'Bar',
  type_ar: 'سبيكة',
  karat: 24,
  purity: 999,
  weight: 31.1035,
  weight_unit: 'g',
  is_verified: true,
}

export default function AdminDashboardPage() {
  const navigate = useNavigate()
  const [certs, setCerts] = useState<AdminCertificate[]>([])
  const [stats, setStats] = useState({ total: 0, verified: 0, total_weight: 0 })
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<AdminCertificate | null>(null)
  const [form, setForm] = useState<CertificateFormData>(emptyForm)
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem('admin_user') || '{}')
    } catch {
      return {}
    }
  })()

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [listRes, statsRes] = await Promise.all([
        adminListCertificates({ search: search || undefined }),
        adminStats(),
      ])
      setCerts(listRes.data)
      setStats(statsRes.data)
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        localStorage.removeItem('admin_token')
        navigate('/admin')
      }
    } finally {
      setLoading(false)
    }
  }, [search, navigate])

  useEffect(() => {
    if (!localStorage.getItem('admin_token')) {
      navigate('/admin')
      return
    }
    load()
  }, [load, navigate])

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setFormError('')
    setShowForm(true)
  }

  const openEdit = (c: AdminCertificate) => {
    setEditing(c)
    setForm({
      serial_number: c.serial_number,
      item_name: c.item_name,
      metal: c.metal,
      metal_ar: c.metal_ar,
      type: c.type,
      type_ar: c.type_ar,
      karat: c.karat,
      purity: c.purity,
      weight: c.weight,
      weight_unit: c.weight_unit,
      is_verified: c.is_verified,
    })
    setFormError('')
    setShowForm(true)
  }

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setFormError('')
    try {
      if (editing) {
        await adminUpdateCertificate(editing.id, form)
        showToast('تم تحديث القطعة بنجاح')
      } else {
        await adminCreateCertificate(form)
        showToast('تم إضافة القطعة بنجاح')
      }
      setShowForm(false)
      await load()
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.errors) {
        const first = Object.values(err.response.data.errors)[0] as string[]
        setFormError(first?.[0] || 'فشل الحفظ')
      } else if (axios.isAxiosError(err) && err.response?.data?.message) {
        setFormError(err.response.data.message)
      } else {
        setFormError('حدث خطأ أثناء الحفظ')
      }
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (c: AdminCertificate) => {
    if (!confirm(`هل تريد حذف الشهادة ${c.serial_number}؟`)) return
    try {
      await adminDeleteCertificate(c.id)
      showToast('تم الحذف بنجاح')
      await load()
    } catch {
      showToast('فشل الحذف')
    }
  }

  const handleLogout = async () => {
    try {
      await adminLogout()
    } catch {
      /* ignore */
    }
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    navigate('/admin')
  }

  const setField = <K extends keyof CertificateFormData>(key: K, value: CertificateFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="w-full max-w-6xl animate-fade-in-up">
      <Seo title="إدارة الشهادات" path="/admin/dashboard" noindex />
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-navy-900 text-white px-6 py-3 rounded-xl shadow-xl text-sm font-medium">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <BrandLogo size="sm" />
          <div>
            <h1 className="text-xl font-bold text-navy-900">لوحة إدارة السبائك</h1>
            <p className="text-xs text-navy-800/50">{user.name || 'Admin'} — {user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/" className="text-sm text-gold-600 hover:text-gold-700 px-3 py-2">
            الرئيسية
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg cursor-pointer"
          >
            خروج
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'إجمالي القطع', value: stats.total },
          { label: 'موثّقة', value: stats.verified },
          { label: 'إجمالي الوزن (g)', value: stats.total_weight },
        ].map((s) => (
          <div key={s.label} className="bg-white/80 border border-gold-100 rounded-xl p-5 shadow-sm">
            <p className="text-xs text-navy-800/50 mb-1">{s.label}</p>
            <p className="text-2xl font-extrabold text-navy-900" dir="ltr">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <input
          type="search"
          placeholder="بحث برقم الشهادة أو الاسم..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] px-4 py-2.5 rounded-xl border border-gold-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm"
        />
        <button
          type="button"
          onClick={openCreate}
          className="px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-sm shadow-lg shadow-gold-500/20 cursor-pointer"
        >
          + إضافة قطعة
        </button>
      </div>

      {/* Table */}
      <div className="bg-white/90 border border-gold-100 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-navy-800/40">جاري التحميل...</div>
        ) : certs.length === 0 ? (
          <div className="p-12 text-center text-navy-800/40">لا توجد قطع بعد</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gold-100 bg-gold-50/50 text-navy-800/60">
                  <th className="text-right px-4 py-3 font-semibold">الرقم</th>
                  <th className="text-right px-4 py-3 font-semibold">الاسم</th>
                  <th className="text-right px-4 py-3 font-semibold">العيار</th>
                  <th className="text-right px-4 py-3 font-semibold">النقاء</th>
                  <th className="text-right px-4 py-3 font-semibold">الوزن</th>
                  <th className="text-right px-4 py-3 font-semibold">الحالة</th>
                  <th className="text-right px-4 py-3 font-semibold">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {certs.map((c) => (
                  <tr key={c.id} className="border-b border-gold-50 hover:bg-gold-50/30 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-navy-900" dir="ltr">
                      <Link to={`/cert/${c.serial_number}`} className="text-gold-600 hover:underline" target="_blank">
                        {c.serial_number}
                      </Link>
                    </td>
                    <td className="px-4 py-3">{c.item_name}</td>
                    <td className="px-4 py-3" dir="ltr">
                      {c.karat}K
                    </td>
                    <td className="px-4 py-3" dir="ltr">
                      {c.purity}
                    </td>
                    <td className="px-4 py-3" dir="ltr">
                      {c.weight} {c.weight_unit}
                    </td>
                    <td className="px-4 py-3">
                      {c.is_verified ? (
                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-semibold">
                          موثقة
                        </span>
                      ) : (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold">
                          غير موثقة
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(c)}
                          className="text-xs text-gold-600 hover:bg-gold-50 px-2 py-1 rounded cursor-pointer"
                        >
                          تعديل
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(c)}
                          className="text-xs text-red-500 hover:bg-red-50 px-2 py-1 rounded cursor-pointer"
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gold-100 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-lg font-bold text-navy-900">
                {editing ? 'تعديل القطعة' : 'إضافة قطعة جديدة'}
              </h2>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-navy-800/40 hover:text-navy-900 text-xl cursor-pointer"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-navy-800 mb-1">رقم الشهادة *</label>
                  <input
                    required
                    value={form.serial_number}
                    onChange={(e) => setField('serial_number', e.target.value.toUpperCase())}
                    className="w-full px-3 py-2.5 rounded-lg border border-gold-200 focus:outline-none focus:ring-2 focus:ring-gold-400 font-mono text-left"
                    dir="ltr"
                    placeholder="TJ2026005"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-navy-800 mb-1">اسم القطعة *</label>
                  <input
                    required
                    value={form.item_name}
                    onChange={(e) => setField('item_name', e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-gold-200 focus:outline-none focus:ring-2 focus:ring-gold-400"
                    placeholder="اونسة 31.1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-800 mb-1">العيار *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={24}
                    value={form.karat}
                    onChange={(e) => setField('karat', Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-lg border border-gold-200 focus:outline-none focus:ring-2 focus:ring-gold-400 text-left"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-800 mb-1">النقاء *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={form.purity}
                    onChange={(e) => setField('purity', Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-lg border border-gold-200 focus:outline-none focus:ring-2 focus:ring-gold-400 text-left"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-800 mb-1">الوزن *</label>
                  <input
                    type="number"
                    required
                    step="0.0001"
                    min={0.0001}
                    value={form.weight}
                    onChange={(e) => setField('weight', Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-lg border border-gold-200 focus:outline-none focus:ring-2 focus:ring-gold-400 text-left"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-800 mb-1">وحدة الوزن</label>
                  <input
                    value={form.weight_unit || 'g'}
                    onChange={(e) => setField('weight_unit', e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-gold-200 focus:outline-none focus:ring-2 focus:ring-gold-400 text-left"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-800 mb-1">المعدن (EN)</label>
                  <input
                    value={form.metal || ''}
                    onChange={(e) => setField('metal', e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-gold-200 focus:outline-none focus:ring-2 focus:ring-gold-400 text-left"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-800 mb-1">المعدن (AR)</label>
                  <input
                    value={form.metal_ar || ''}
                    onChange={(e) => setField('metal_ar', e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-gold-200 focus:outline-none focus:ring-2 focus:ring-gold-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-800 mb-1">النوع (EN)</label>
                  <input
                    value={form.type || ''}
                    onChange={(e) => setField('type', e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-gold-200 focus:outline-none focus:ring-2 focus:ring-gold-400 text-left"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-800 mb-1">النوع (AR)</label>
                  <input
                    value={form.type_ar || ''}
                    onChange={(e) => setField('type_ar', e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-gold-200 focus:outline-none focus:ring-2 focus:ring-gold-400"
                  />
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_verified"
                    checked={form.is_verified !== false}
                    onChange={(e) => setField('is_verified', e.target.checked)}
                    className="rounded border-gold-300 text-gold-500 focus:ring-gold-400"
                  />
                  <label htmlFor="is_verified" className="text-sm text-navy-800">
                    موثّقة
                  </label>
                </div>
              </div>

              {formError && <p className="text-sm text-red-600">{formError}</p>}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold disabled:opacity-60 cursor-pointer"
                >
                  {saving ? 'جاري الحفظ...' : editing ? 'حفظ التعديلات' : 'إضافة القطعة'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-3 rounded-xl border border-gold-200 text-navy-800 hover:bg-gold-50 cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
