import Header from '@/components/common/Header'
import Button from '@/components/common/Button'
import BookField from '@/components/mypage/read/BookField'
import OneLineReviewField from '@/components/mypage/read/OneLineReviewField'
import ReadDateField from '@/components/mypage/read/ReadDateField'
import RatingField from '@/components/mypage/read/RatingField'
import TagField from '@/components/mypage/read/TagField'
import { useReadBookStore } from '@/store/readBookStore'

export default function CreateReadBook() {
  return (
    <main>
      <Header headerType={'DYNAMIC'}>읽은 책 추가</Header>

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
        <TagField />
      </section>

      <div className="bg-background fixed bottom-0 w-full px-5 pt-2 pb-[32px]">
        <Button onClick={() => {}} size={'large'} customClassName={'w-full'}>
          완료하기
        </Button>
      </div>
    </main>
  )
}
