import Image from 'next/image'
import { KidStarIcon } from '@/assets/svgComponents'
import { useRouter } from 'next/navigation'
import { MonthlyReadBookType } from '@/types/mypage'
import { useReadBookStore } from '@/store/readBookStore'

export default function BookshelfItem({ title, readDate, bookImage, rating, id, isbn }: MonthlyReadBookType) {
  const router = useRouter()
  const setReadBookState = useReadBookStore((state) => state.setReadBookState)
  return (
    <div
      onClick={() => {
        router.push(`/mypage/read/${id}`)
        setReadBookState({ selectedReadBookIsbn: isbn })
      }}
      className="flex flex-col items-center justify-center gap-y-2 border-b p-2"
    >
      <Image src={bookImage} width={76} height={115} className={'mx-1'} alt={'book'} />
      <section className="flex h-[92px] w-full flex-col gap-y-1">
        <div className="flex items-center gap-x-1">
          <KidStarIcon width={16} height={16} />
          <p className="title-medium-14 text-dark-gray">{rating}</p>
        </div>
        <div className="title-medium-14 line-clamp-2 h-[44px]">{title}</div>
        <p className="caption-1 text-dark-gray">{readDate}</p>
      </section>
    </div>
  )
}
