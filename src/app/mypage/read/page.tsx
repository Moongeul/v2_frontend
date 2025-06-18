'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Header from '@/components/common/Header'
import Button from '@/components/common/Button'
import DropBox from '@/components/common/DropBox'
import BookshelfItem from '@/components/mypage/read/BookshelfItem'
import CreateReadBook from '@/components/mypage/read/CreateReadBook'
import { getBookshelfRead } from '@/lib/mypage'
import { ApiResponse } from '@/types/common'
import { ReadBookShelfResponseType, ReadBookShelfType } from '@/types/mypage'

type filterType = '전체 보기' | '월별 보기' | '평점 높은 순' | '평점 낮은 순'

export default function Read() {
  const [isCreateReadBookPageOpen, setIsCreateReadBookPageOpen] = useState<boolean>(false)
  const [monthlyInfoList, setMonthlyInfoList] = useState<ReadBookShelfType[] | undefined>()
  const [filter, setFilter] = useState<filterType>('전체 보기')
  const filterContents: filterType[] = ['전체 보기', '월별 보기', '평점 높은 순', '평점 낮은 순']
  const [isFilterClicked, setIsFilterClicked] = useState(false)

  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const renderFilter = (filter: filterType) => {
    switch (filter) {
      case '전체 보기':
        return 1
      case '월별 보기':
        return 2
      case '평점 낮은 순':
        return 3
      default:
        return 4
    }
  }

  // 데이터 fetch
  useEffect(() => {
    setIsLoading(true)
    getBookshelfRead(page, 10, renderFilter(filter)).then((res: ApiResponse<ReadBookShelfResponseType>) => {
      const newData = res.data?.monthlyInfoList ?? []

      setMonthlyInfoList((prev) => (page === 1 ? newData : [...(prev ?? []), ...newData]))

      if (newData.length < 10) {
        setHasMore(false)
      }

      setIsLoading(false)
    })
  }, [page, filter])

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

  return isCreateReadBookPageOpen ? (
    <CreateReadBook setIsCreateReadBookPageOpen={setIsCreateReadBookPageOpen} />
  ) : (
    <main>
      <Header
        headerType={'DYNAMIC'}
        rightComponent={
          <Button
            onClick={() => {
              setIsCreateReadBookPageOpen(!isCreateReadBookPageOpen)
            }}
            customClassName={'w-[48px]'}
            size={'large'}
            state={'main'}
          >
            추가
          </Button>
        }
      >
        내가 읽은 책
      </Header>
      <div className="mt-[120px] px-5">
        <DropBox selectedContent={filter} isFilterClicked={isFilterClicked} setIsFilterClicked={setIsFilterClicked}>
          <>
            {filterContents.map((content) => {
              return (
                <div
                  key={content}
                  className="title-regular-14 py-2"
                  onClick={() => {
                    setFilter(content)
                    setIsFilterClicked(false)
                  }}
                >
                  {content}
                </div>
              )
            })}
          </>
        </DropBox>
        <section className="mt-4 flex flex-col gap-y-5">
          {monthlyInfoList ? (
            monthlyInfoList.map((monthlyInfo, index) => {
              const isLast = index === monthlyInfoList.length - 1
              return (
                <div ref={isLast ? lastItemRef : null} key={monthlyInfo.date}>
                  <div className="flex gap-x-2">
                    <h2 className="title-bold-16">{monthlyInfo.date}</h2>
                    <p className="title-bold-16 text-dark-gray">{monthlyInfo.monthlyBookCnt}권</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {monthlyInfo.monthlyReadBookList.map((monthlyReadBook) => {
                      return <BookshelfItem key={monthlyReadBook.isbn} {...monthlyReadBook} />
                    })}
                  </div>
                </div>
              )
            })
          ) : (
            //스켈레톤 UI
            <div></div>
          )}
        </section>
      </div>
    </main>
  )
}
