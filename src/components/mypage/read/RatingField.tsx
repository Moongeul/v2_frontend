import { useReadBookStore } from '@/store/readBookStore'

export default function RatingField() {
  const setReadBookState = useReadBookStore((state) => state.setReadBookState)
  const rating = useReadBookStore((state) => state.readBooks?.rating)
  const readBooks = useReadBookStore((state) => state.readBooks)

  return (
    <section className="flex flex-col gap-y-2">
      <section className={'flex flex-col gap-y-2'}>
        <div className="title-medium-16">
          평점<span className="text-dark-gray"> (선택)</span>
        </div>
      </section>
      <section className="flex gap-x-3">
        <input
          value={rating ?? ''}
          type="range"
          min="0"
          max="5"
          step="0.5"
          onChange={(e) => setReadBookState({ readBooks: { ...readBooks, rating: parseFloat(e.target.value) } })}
          className="accent-brand-color w-[90%] bg-gray-200 outline-none"
        />
        <p className="title-regular-14">{rating}</p>
      </section>
    </section>
  )
}
