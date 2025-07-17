import { create } from 'zustand'
import { BookInfoType, ReadBookType } from '@/types/mypage'

export interface ReadBookStoreType {
  bookInfo?: BookInfoType | undefined
  readBooks?: ReadBookType | undefined
  selectedReadBookIsbn?: string
}

interface useReadBookStoreType {
  bookInfo: BookInfoType | undefined
  readBooks: ReadBookType | undefined
  //상세보기에서 선택된 책의 isbn
  selectedReadBookIsbn: string
  setReadBookState: (params: ReadBookStoreType) => void
}

export const useReadBookStore = create<useReadBookStoreType>((set) => ({
  bookInfo: undefined,
  readBooks: {
    rating: 0,
    oneLineReview: '',
    userBookTagList: [],
    readDate: '',
  },
  selectedReadBookIsbn: '',
  setReadBookState: (params: ReadBookStoreType) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },
}))
