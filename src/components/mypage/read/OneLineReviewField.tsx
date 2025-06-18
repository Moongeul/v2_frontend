import { useReadBookStore } from '@/store/readBookStore'

export default function OneLineReviewField() {
  const setReadBookState = useReadBookStore((state) => state.setReadBookState)
  const oneLineReview = useReadBookStore((state) => state.readBooks?.oneLineReview)
  const readBooks = useReadBookStore((state) => state.readBooks)

  return (
    <div>
      <section className={'flex flex-col gap-y-2'}>
        <div className="title-medium-16">
          한줄평<span className="text-dark-gray"> (선택)</span>
        </div>
        <div className="border-light-gray rounded-[12px] border px-4 py-3">
          <input
            value={oneLineReview ?? ''}
            onChange={(e) => {
              setReadBookState({ readBooks: { ...readBooks, oneLineReview: e.target.value } })
            }}
            placeholder={'한줄평을 작성해주세요.'}
            className={'text-dark-gray title-regular-14 w-full outline-none'}
          />
        </div>
      </section>
    </div>
  )
}
