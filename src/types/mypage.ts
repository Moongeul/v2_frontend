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
