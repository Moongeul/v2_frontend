import qs from 'query-string'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import Input from '@/components/common/Input'
import useDebounce from '@/hooks/useDebounce'
import { useReadBookStore } from '@/store/readBookStore'
import { getBook } from '@/lib/mypage'
import { ApiResponse } from '@/types/common'
import { BookInfoType, SearchBookResponseType } from '@/types/mypage'
import { CancelIcon, SearchIcon } from '@/assets/svgComponents'

export default function BookField() {
  const [searchValue, setSearchValue] = useState<string>('')
  const [bookListResult, setBookListResult] = useState<BookInfoType[]>([])
  const debouncedValue = useDebounce<string>(searchValue, 100)
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const setReadBookState = useReadBookStore((state) => state.setReadBookState)

  const bookInfo = useReadBookStore((state) => state.bookInfo)

  // 검색어 바뀌면 초기화, 검색
  useEffect(() => {
    setPage(1)
    setBookListResult([])
    setHasMore(true)
    setReadBookState({ bookInfo: undefined })

    const query = { keyword: debouncedValue }
    const url = qs.stringifyUrl({ url: '/mypage/read', query })
    router.push(url)
  }, [debouncedValue])

  // 데이터 fetch
  useEffect(() => {
    if (!debouncedValue || !hasMore || isLoading) return

    setIsLoading(true)
    getBook(debouncedValue, page, 20).then((res: ApiResponse<SearchBookResponseType>) => {
      const newBooks = res.data?.bookList ?? []
      setBookListResult((prev) => [...prev, ...newBooks])
      setHasMore(newBooks.length === 20)
      setIsLoading(false)
    })
  }, [page, debouncedValue])

  // 마지막 아이템에 ref 등록
  const observer = useRef<IntersectionObserver | null>(null)
  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1)
        }
      })

      if (node) observer.current.observe(node)
    },
    [isLoading, hasMore]
  )

  return (
    <div className="flex flex-col">
      <div className="w-full">
        <div className="title-medium-16">
          책 선택
          <span className="text-brand-color"> *</span>
        </div>
        <Input
          leftIcon={<SearchIcon width={24} height={24} />}
          placeholder={'책 제목 / 저자를 검색해보세요.'}
          inputValue={searchValue}
          setInputValue={setSearchValue}
          type={'line'}
        />
      </div>
      {bookInfo ? (
        <section onClick={() => {}} className="border-light-gray mt-2 rounded-[12px] border p-2">
          <div className="flex items-center gap-x-2">
            <Image className="mx-[5px]" width={37} height={56} src={bookInfo.image} alt={'book'} />
            <div className="flex flex-col">
              <p className="title-medium-14">{bookInfo.title}</p>
              <p className="caption-1 text-dark-gray">{bookInfo.author}</p>
            </div>
          </div>
          <CancelIcon
            width={18}
            height={18}
            onClick={() => {
              setReadBookState({ bookInfo: undefined })
              setBookListResult([])
            }}
          />
        </section>
      ) : (
        <div className={bookListResult.length > 0 ? 'h-[240px] overflow-y-scroll' : ''}>
          {bookListResult.map((bookInfo, index) => {
            const isLast = index === bookListResult.length - 1
            return (
              <div
                ref={isLast ? lastItemRef : null}
                onClick={() => {
                  setReadBookState({ bookInfo })
                  setBookListResult([])
                }}
                key={bookInfo.isbn || `${bookInfo.title}-${index}`}
                className="border-light-gray bg-background flex gap-x-2 border-x border-b px-2 py-3"
              >
                <Image className="mx-[5px]" width={37} height={56} src={bookInfo.image} alt={'book'} />
                <div className="flex flex-col">
                  <p className="title-medium-14">{bookInfo.title}</p>
                  <p className="caption-1 text-dark-gray">{bookInfo.author}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
