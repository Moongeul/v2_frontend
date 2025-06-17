export type HeaderType = 'DEFAULT' | 'DYNAMIC' | 'HOME'
export interface ApiResponse<T> {
  message: string
  status: number
  success: boolean
  data?: T
}
