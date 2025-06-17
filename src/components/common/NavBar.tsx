import { usePathname, useRouter } from 'next/navigation'
import {
  SelectedBookIcon,
  SelectedHomeIcon,
  SelectedSearchIcon,
  SelectedWriteIcon,
  UnselectedBookIcon,
  UnselectedHomeIcon,
  UnselectedSearchIcon,
  UnselectedWriteIcon,
} from '@/assets/svgComponents'
import Image from 'next/image'

const NavBar = () => {
  const router = useRouter()
  const path = usePathname()
  const navContents = [
    {
      content: '홈',
      selectedIcon: <SelectedHomeIcon width={40} height={40} />,
      unselectedHomeIcon: <UnselectedHomeIcon width={40} height={40} />,
      path: '/home',
    },
    {
      content: '도서검색',
      selectedIcon: <SelectedSearchIcon width={40} height={40} />,
      unselectedHomeIcon: <UnselectedSearchIcon width={40} height={40} />,
      path: '/search',
    },
    {
      content: '글쓰기',
      selectedIcon: <SelectedWriteIcon width={40} height={40} />,
      unselectedHomeIcon: <UnselectedWriteIcon width={40} height={40} />,
      path: '/write',
    },
    {
      content: '추천',
      selectedIcon: <SelectedBookIcon width={40} height={40} />,
      unselectedHomeIcon: <UnselectedBookIcon width={40} height={40} />,
      path: '/write',
    },
    {
      content: 'My',
      selectedIcon: (
        <div className="flex h-[1.625rem] w-[1.625rem] items-center justify-center overflow-hidden">
          <Image src="/profile.jpg" fill alt="프로필" className="rounded-full object-cover" />
        </div>
      ),
      unselectedHomeIcon: (
        <div className="flex h-[1.625rem] w-[1.625rem] items-center justify-center overflow-hidden">
          <Image src="/profile.jpg" fill alt="프로필" className="rounded-full object-cover" />
        </div>
      ),
      path: '/mypage',
    },
  ]

  return (
    <nav className={'fixed right-0 bottom-0 left-0 flex w-full justify-between bg-black px-6 py-1 pb-[1.438rem]'}>
      {navContents.map((content) => {
        return (
          <div
            onClick={() => {
              router.push(content.path)
            }}
            key={content.content}
            className={`flex w-[2.5rem] flex-col items-center justify-center ${content.path === '/mypage' ? 'gap-y-[0.375rem]' : ''}`}
          >
            {path === content.path ? content.selectedIcon : content.unselectedHomeIcon}
            <p className={path === content.path ? 'caption-2 text-white' : 'caption-2 text-light-gray'}>
              {content.content}
            </p>
          </div>
        )
      })}
    </nav>
  )
}
export default NavBar
