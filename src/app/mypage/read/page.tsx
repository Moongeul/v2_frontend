'use client'

import { useState } from 'react'
import Header from '@/components/common/Header'
import Button from '@/components/common/Button'
import DropBox from '@/components/common/DropBox'
import BookshelfItem from '@/components/mypage/read/BookshelfItem'
import CreateReadBook from '@/components/mypage/read/CreateReadBook'

export default function Read() {
  const [isCreateReadBookPageOpen, setIsCreateReadBookPageOpen] = useState<boolean>(false)
  const [filter, setFilter] = useState<string>('전체 보기')
  const filterContents = ['전체 보기', '월별 보기', '평점 높은 순', '평점 낮은 순']
  const [isFilterClicked, setIsFilterClicked] = useState(false)
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
        <section className="mt-4 grid grid-cols-3 gap-4">
          <BookshelfItem />
          <BookshelfItem />
          <BookshelfItem />
          <BookshelfItem />
          <BookshelfItem />
          <BookshelfItem />
          <BookshelfItem />
          <BookshelfItem />
          <BookshelfItem />
        </section>
      </div>
    </main>
  )
}
