import type { ReactNode } from 'react'
import { HeaderType } from '@/types/common'
import { useRouter } from 'next/navigation'
import { AlarmIcon, LeftArrowIcon, LogoIcon } from '@/assets/svgComponents'

interface Props {
  headerType: HeaderType
  children?: ReactNode
  onBack?: () => void
  rightComponent?: React.ReactNode
}
const Header = (props: Props) => {
  const { headerType, children, onBack, rightComponent } = props
  const router = useRouter()
  const renderHeader = (headerType: HeaderType) => {
    switch (headerType) {
      case 'DYNAMIC':
        return (
          <div className="flex items-center justify-between px-5 py-2">
            <LeftArrowIcon
              onClick={
                onBack
                  ? onBack
                  : () => {
                      router.back()
                    }
              }
              width={18}
              height={18}
            />
            <div className="title-regular-14">{children}</div>
            {rightComponent ? rightComponent : <div className="h-[1.125rem] w-[1.125rem]"></div>}
          </div>
        )
      case 'HOME':
        return (
          <div className="flex justify-between px-5 py-3">
            <LogoIcon width={133} height={30} />
            <AlarmIcon
              onClick={() => {
                router.push('/alarm')
              }}
              width={32}
              height={32}
            />
          </div>
        )
      default:
        return (
          <div className="flex justify-start px-5 py-[0.719rem]">
            <div className="heading-bold-22">{children}</div>
          </div>
        )
    }
  }

  return (
    <header
      className={`${headerType === 'HOME' ? 'bg-black' : 'bg-background'} fixed top-0 right-0 left-0 z-10 pt-[2.813rem]`}
    >
      {renderHeader(headerType)}
    </header>
  )
}
export default Header
