import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
      <footer className="py-4 text-center text-sm text-navy-800/50 no-print">
        <p>
          Verified by{' '}
          <span className="font-semibold text-gold-600">
            {import.meta.env.VITE_BRAND_NAME || 'TAJ JEWELRY'}
          </span>
        </p>
      </footer>
    </div>
  )
}
