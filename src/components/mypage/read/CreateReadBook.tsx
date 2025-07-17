import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Header from '@/components/common/Header'
import Button from '@/components/common/Button'
import BookField from '@/components/mypage/read/BookField'
import OneLineReviewField from '@/components/mypage/read/OneLineReviewField'
import ReadDateField from '@/components/mypage/read/ReadDateField'
import RatingField from '@/components/mypage/read/RatingField'
import TagField from '@/components/mypage/read/TagField'
import { UserBookTagType } from '@/types/mypage'
import { useReadBookStore } from '@/store/readBookStore'
import { patchBookShelfRead, postBookShelfRead } from '@/lib/mypage'
import { useParams } from 'next/navigation'

interface CreateReadBookProps {
  setIsCreateReadBookPageOpen: Dispatch<SetStateAction<boolean>>
}

export default function CreateReadBook({ setIsCreateReadBookPageOpen }: CreateReadBookProps) {
  const [selectedTagList, setSelectedTagList] = useState<UserBookTagType[]>([])
  const readBooks = useReadBookStore((state) => state.readBooks)
  const bookInfo = useReadBookStore((state) => state.bookInfo)
  const setReadBookState = useReadBookStore((state) => state.setReadBookState)
  const params = useParams()

  useEffect(() => {
    if (readBooks && readBooks.userBookTagList) {
      setSelectedTagList(readBooks.userBookTagList)
    }
  }, [])

  const handleSubmit = async () => {
    const updatedReadBooks = { ...readBooks, userBookTagList: selectedTagList }
    if (!params.id) {
      //새로 생성할 때,
      setReadBookState({ readBooks: updatedReadBooks })
      const result = await postBookShelfRead({ bookInfo: bookInfo, readBooks: updatedReadBooks })
      if (result) {
        setIsCreateReadBookPageOpen(false)
        setReadBookState({
          bookInfo: undefined,
          readBooks: {
            rating: 0,
            oneLineReview: '',
            userBookTagList: [],
            readDate: '',
          },
        })
      }
    } else {
      //수정할 때,
      console.log(updatedReadBooks)
      setReadBookState({ readBooks: updatedReadBooks })
      const result = await patchBookShelfRead(params.id, { bookInfo: bookInfo, readBooks: updatedReadBooks })
      if (result) {
        setIsCreateReadBookPageOpen(false)
        setReadBookState({
          bookInfo: undefined,
          readBooks: {
            rating: 0,
            oneLineReview: '',
            userBookTagList: [],
            readDate: '',
          },
        })
      }
    }
  }

  return (
    <main>
      <Header
        onBack={() => {
          setIsCreateReadBookPageOpen(false)
          setReadBookState({
            selectedReadBookIsbn: '',
            bookInfo: undefined,
            readBooks: {
              rating: 0,
              oneLineReview: '',
              userBookTagList: [],
              readDate: '',
            },
          })
        }}
        headerType={'DYNAMIC'}
      >
        읽은 책 추가
      </Header>

      <section className="mt-[96px] flex flex-col gap-y-[32px] px-5">
        {/* 책 선택 */}
        <BookField />
        {/*읽은 날*/}
        <ReadDateField />
        {/*평점*/}
        <RatingField />
        {/*한줄평*/}
        <OneLineReviewField />
        {/*책 취향 태그*/}
        <TagField selectedTagList={selectedTagList} setSelectedTagList={setSelectedTagList} />
      </section>

      <div className="bg-background fixed bottom-0 w-full px-5 pt-2 pb-[32px]">
        <Button onClick={handleSubmit} size={'large'} customClassName={'w-full'}>
          완료하기
        </Button>
      </div>
    </main>
  )
}
