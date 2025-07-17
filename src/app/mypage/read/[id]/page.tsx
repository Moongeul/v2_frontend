'use client'

import { useEffect, useState } from 'react'
import { EmptyKidStarIcon, KidStarIcon, OptionIcon } from '@/assets/svgComponents'
import Header from '@/components/common/Header'
import BookInfo from '@/components/mypage/read/BookInfo'
import ReadInfoItem from '@/components/mypage/read/ReadInfoItem'
import OptionModal from '@/components/common/OptionModal'
import { useParams, useRouter } from 'next/navigation'
import { deleteBookshelfRead, getBookInfo, getBookshelfReadDetail } from '@/lib/mypage'
import { ApiResponse } from '@/types/common'
import { BookInfoDetailType, ReadBookType } from '@/types/mypage'
import { useReadBookStore } from '@/store/readBookStore'
import CreateReadBook from '@/components/mypage/read/CreateReadBook'

export default function ReadBookDetail() {
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false)
  const [isEditReadBookPageOpen, setIsEditReadBookPageOpen] = useState(false)
  const path = useParams()
  const isbn = useReadBookStore((state) => state.selectedReadBookIsbn)
  const setReadBookState = useReadBookStore((state) => state.setReadBookState)
  const readBooks = useReadBookStore((state) => state.readBooks)
  const bookInfo = useReadBookStore((state) => state.bookInfo)

  const router = useRouter()

  useEffect(() => {
    getBookshelfReadDetail(path.id).then((res: ApiResponse<ReadBookType>) => {
      setReadBookState({ readBooks: res.data })
    })
    getBookInfo(isbn).then((res: ApiResponse<BookInfoDetailType>) => {
      setReadBookState({ bookInfo: res.data })
    })
  }, [])

  return isEditReadBookPageOpen ? (
    <CreateReadBook setIsCreateReadBookPageOpen={setIsEditReadBookPageOpen} />
  ) : (
    <main>
      {isOptionModalOpen && (
        <OptionModal onClick={() => setIsOptionModalOpen(false)} title={bookInfo?.title}>
          <>
            <button
              onClick={() => {
                setIsEditReadBookPageOpen(!isEditReadBookPageOpen)
              }}
              className="title-medium-16 flex h-[56px] items-center justify-center text-white"
            >
              수정하기
            </button>
            <button
              onClick={() => {
                deleteBookshelfRead(path.id).then(() => {
                  router.push('/mypage/read')
                })
              }}
              className="title-medium-16 text-brand-color flex h-[56px] items-center justify-center"
            >
              삭제하기
            </button>
          </>
        </OptionModal>
      )}
      <Header
        headerType={'DYNAMIC'}
        rightComponent={
          <OptionIcon
            onClick={() => {
              setIsOptionModalOpen(!isOptionModalOpen)
            }}
            width={6}
            height={12}
          />
        }
      >
        읽은 책
      </Header>
      <div className="mt-[100px] px-5">
        {/* 책 정보 */}
        {bookInfo && (
          <BookInfo
            bookImage={bookInfo.image}
            author={bookInfo.author}
            title={bookInfo.title}
            pubdate={bookInfo.pubdate}
            publisher={bookInfo.publisher}
          />
        )}
        {/* 읽은 날짜 */}
        <ReadInfoItem title={'읽은 날짜'}>
          <div className="title-regular-14">{readBooks?.readDate}</div>
        </ReadInfoItem>

        {/* 책 평점 */}
        <ReadInfoItem title={'책 평점'}>
          <div className="flex items-center">
            {[...Array(5)].map((_, idx) =>
              idx < Math.floor(readBooks?.rating as number) ? (
                <KidStarIcon key={idx} width={32} height={32} />
              ) : (
                <EmptyKidStarIcon key={idx} width={32} height={32} />
              )
            )}
            <div className="title-regular-14 ml-3">{readBooks?.rating}</div>
          </div>
        </ReadInfoItem>

        {/* 한줄평 */}
        <ReadInfoItem title={'한줄평'}>
          <div className="title-regular-14">{readBooks?.oneLineReview}</div>
        </ReadInfoItem>

        {/* 책 취향 태그 */}
        <ReadInfoItem title={'책 취향 태그'}>
          <div className="flex gap-x-2">
            {readBooks?.userBookTagList?.map((tag) => {
              return (
                <div
                  key={tag.tagId}
                  className="text-dark-gray body-regular-14 rounded-full bg-white px-[10px] py-[2px]"
                >
                  #{tag.tag}
                </div>
              )
            })}
          </div>
        </ReadInfoItem>
      </div>
    </main>
  )
}
