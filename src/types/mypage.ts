import { PageNation } from '@/types/common'

export interface CreateReadBookType {
  bookInfo?: BookInfoType
  readBooks?: ReadBookType
}

export interface BookInfoType {
  isbn: string
  image: string
  title: string
  author: string
  publisher: string
  pubdate: string
  description: string
}

export interface ReadBookType {
  readDate?: string
  rating?: number
  oneLineReview?: string
  userBookTagList?: UserBookTagType[]
}

export interface UserBookTagType {
  tagId: number
  tag: string
}

export interface SearchBookResponseType extends PageNation {
  bookList: BookInfoType[]
}

export interface ReadBookShelfResponseType extends PageNation {
  totalBookCnt: number
  monthlyInfoList: ReadBookShelfType[]
}

// 읽은 책장의 날짜별로 데이터를 불러오는 Type
export interface ReadBookShelfType {
  date: string
  monthlyBookCnt: number
  monthlyReadBookList: MonthlyReadBookType[]
}
export interface MonthlyReadBookType {
  id: number
  isbn: string
  bookImage: string
  rating: number
  title: string
  readDate: string
}
