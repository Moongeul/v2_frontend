export type HeaderType = 'DEFAULT' | 'DYNAMIC' | 'HOME'
export interface ApiResponse<T = any> {
  message: string
  status: number
  success: boolean
  data?: T
}
