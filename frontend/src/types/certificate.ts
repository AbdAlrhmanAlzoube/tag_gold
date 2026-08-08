export interface Certificate {
  serial_number: string
  item_name: string
  metal: string
  metal_ar: string
  type: string
  type_ar: string
  karat: number
  purity: number
  weight: number
  weight_unit: string
  issued_at: string
  issued_at_formatted: string
  is_verified: boolean
  brand?: string
  brand_ar?: string
}

export interface ApiResponse {
  success: boolean
  data?: Certificate
  message?: string
  message_ar?: string
}
