import { authorizedFetch } from '@/lib/auth'
import { CreateReadBookType, ReadBookType } from '@/types/mypage'

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

/**
 * 읽은 책 책장에 추가
 */
export const postBookShelfRead = async (readBookData: CreateReadBookType) => {
  const response = await authorizedFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/bookshelf/read`, {
    method: 'POST',
    body: JSON.stringify(readBookData),
  })

  const data = await response.json()
  return data
}

/**
 * 읽은 책 책장에서 불러오기
 */
export const getBookshelfRead = async (page: number, size: number, filter: number) => {
  const response = await authorizedFetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/bookshelf/read?page=${page}&size=${size}&filter=${filter}`,
    {
      method: 'GET',
    }
  )

  const data = await response.json()
  return data
}
