import Image from 'next/image'
import { KidStarIcon } from '@/assets/svgComponents'
import { useRouter } from 'next/navigation'

interface BookshelfItemProps {}
export default function BookshelfItem({}: BookshelfItemProps) {
  const router = useRouter()
  return (
    <div
      onClick={() => {
        router.push(`/mypage/read/${1}`)
      }}
      className="flex flex-col items-center justify-center gap-y-2 border-b p-2"
    >
      <Image src="/book.png" width={76} height={115} className={'mx-1'} alt={'book'} />
      <section className="flex h-[92px] w-full flex-col gap-y-1">
        <div className="flex items-center gap-x-1">
          <KidStarIcon width={16} height={16} />
          <p className="title-medium-14 text-dark-gray">{'4.5'}</p>
        </div>
        <div className="title-medium-14 line-clamp-2 h-[44px]">{'나미야 잡화점의 기적'}</div>
        <p className="caption-1 text-dark-gray">{'2024.05.12'}</p>
      </section>
    </div>
  )
}
