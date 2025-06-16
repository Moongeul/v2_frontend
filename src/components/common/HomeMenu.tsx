import type { Dispatch, SetStateAction } from 'react'
import { HomeMenuType } from '@/types/home'

interface Props {
  selectedHomeMenuContent: HomeMenuType
  setSelectedHomeMenuContent: Dispatch<SetStateAction<HomeMenuType>>
}

const HomeMenu = (props: Props) => {
  const { selectedHomeMenuContent, setSelectedHomeMenuContent } = props
  const homeMenuContents: HomeMenuType[] = ['전체', '감상평', '한 구절', 'QnA']
  return (
    <div className="fixed top-25 right-0 left-0 flex">
      {homeMenuContents.map((content) => {
        return (
          <button
            key={content}
            onClick={() => {
              setSelectedHomeMenuContent(content)
            }}
            className={
              content === selectedHomeMenuContent
                ? 'body-regular-16 bg-background flex flex-1 justify-start py-[0.438rem] pl-5'
                : 'body-regular-16 flex flex-1 justify-start bg-black py-[0.438rem] pl-5 text-white'
            }
          >
            {content}
          </button>
        )
      })}
    </div>
  )
}
export default HomeMenu
