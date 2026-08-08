import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import VerifyPage from './pages/VerifyPage'
import CertificatePage from './pages/CertificatePage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminDashboardPage from './pages/AdminDashboardPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/cert/:serial" element={<CertificatePage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
