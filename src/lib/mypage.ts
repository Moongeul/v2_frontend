import { authorizedFetch } from '@/lib/auth'

/**
 * 도서 검색
 */
export const getBook = async (title: string, page: number, size: number) => {
  const response = await authorizedFetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/book?title=${title}&page=${page}&size=${size}`,
    {
      method: 'GET',
    }
  )

  const data = await response.json()
  return data
}
