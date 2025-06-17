import { create } from 'zustand'
import { BookInfoType, ReadBookType } from '@/types/mypage'

export interface ReadBookStoreType {
  bookInfo?: BookInfoType | undefined
  readBooks?: ReadBookType | undefined
}

interface useReadBookStoreType {
  bookInfo: BookInfoType | undefined
  readBooks: ReadBookType | undefined
  setReadBookState: (params: ReadBookStoreType) => void
}

export const useReadBookStore = create<useReadBookStoreType>((set) => ({
  bookInfo: undefined,
  readBooks: undefined,
  setReadBookState: (params: ReadBookStoreType) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },
}))
