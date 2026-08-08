import axios from 'axios'
import type { ApiResponse, Certificate } from '../types/certificate'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export async function verifyCertificate(serial: string): Promise<ApiResponse> {
  try {
    const response = await api.get<ApiResponse>(`/certificates/${encodeURIComponent(serial.trim())}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      return error.response.data as ApiResponse
    }
    throw error
  }
}

export function getCertificateUrl(serial: string): string {
  const baseUrl = import.meta.env.VITE_APP_URL || window.location.origin
  return `${baseUrl}/cert/${encodeURIComponent(serial.trim())}`
}

export interface AdminUser {
  id: number
  name: string
  email: string
}

export interface AdminCertificate extends Certificate {
  id: number
  verify_url?: string
  created_at?: string
}

export interface CertificateFormData {
  serial_number: string
  item_name: string
  metal?: string
  metal_ar?: string
  type?: string
  type_ar?: string
  karat: number
  purity: number
  weight: number
  weight_unit?: string
  issued_at?: string
  is_verified?: boolean
}

export async function adminLogin(email: string, password: string) {
  const { data } = await api.post('/admin/login', { email, password })
  return data as { success: boolean; data: { token: string; user: AdminUser } }
}

export async function adminLogout() {
  const { data } = await api.post('/admin/logout')
  return data
}

export async function adminMe() {
  const { data } = await api.get('/admin/me')
  return data as { success: boolean; data: AdminUser }
}

export async function adminStats() {
  const { data } = await api.get('/admin/stats')
  return data as {
    success: boolean
    data: { total: number; verified: number; total_weight: number }
  }
}

export async function adminListCertificates(params?: { search?: string; page?: number }) {
  const { data } = await api.get('/admin/certificates', { params })
  return data as {
    success: boolean
    data: AdminCertificate[]
    meta: { current_page: number; last_page: number; per_page: number; total: number }
  }
}

export async function adminCreateCertificate(payload: CertificateFormData) {
  const { data } = await api.post('/admin/certificates', payload)
  return data as { success: boolean; message: string; data: AdminCertificate }
}

export async function adminUpdateCertificate(id: number, payload: Partial<CertificateFormData>) {
  const { data } = await api.put(`/admin/certificates/${id}`, payload)
  return data as { success: boolean; message: string; data: AdminCertificate }
}

export async function adminDeleteCertificate(id: number) {
  const { data } = await api.delete(`/admin/certificates/${id}`)
  return data as { success: boolean; message: string }
}

export default api
