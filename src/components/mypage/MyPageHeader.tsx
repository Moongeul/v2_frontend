import { LightGrayRightArrowIcon, WhiteBookIcon } from '@/assets/svgComponents'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const MyPageHeader = () => {
  const router = useRouter()
  return (
    <header className="fixed top-[100px] flex w-full flex-col gap-y-[28px] bg-black p-5">
      <section className="flex items-center gap-x-3">
        <div className="relative flex h-[72px] w-[72px] items-center justify-center overflow-hidden">
          <Image src="/profile.jpg" fill alt="프로필" className="rounded-full object-cover" />
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="title-medium-16 flex items-center gap-x-4 text-white">
            {'유리미'}
            <LightGrayRightArrowIcon width={10} height={10} />
          </div>
          <div className="title-medium-14 flex items-center gap-x-3 text-white">
            <button>
              <span className="text-brand-color">{1}</span> 팔로워
            </button>
            <div className="border-dark-gray h-[12px] w-[1px] border-r"></div>
            <button>
              <span className="text-brand-color">{2}</span> 팔로잉
            </button>
          </div>
        </div>
      </section>
      <section>
        <h2 className="title-medium-16 text-white">나의 책장</h2>
        <div className="flex gap-x-5 text-white">
          <button
            onClick={() => {
              router.push('/mypage/read')
            }}
            className="border-dark-gray flex w-full items-center border-b pt-3 pr-3 pb-2 pl-[6px]"
          >
            <WhiteBookIcon width={40} height={40} />
            <p className="title-medium-14">
              내가 읽은 책 <span className="text-brand-color">{1}권</span>
            </p>
          </button>
          <button
            onClick={() => {
              router.push('/mypage/wish')
            }}
            className="border-dark-gray flex w-full items-center border-b pt-3 pr-3 pb-2 pl-[6px]"
          >
            <WhiteBookIcon width={40} height={40} />
            <p className="title-medium-14">
              읽고 싶은 책 <span className="text-brand-color">{1}권</span>
            </p>
          </button>
        </div>
      </section>
    </header>
  )
}
export default MyPageHeader
