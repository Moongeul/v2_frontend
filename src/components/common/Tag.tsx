import { Dispatch, SetStateAction } from 'react'
import { BookmarkIcon } from '@/assets/svgComponents'
import { UserBookTagType } from '@/types/mypage'

interface TagProps {
  tagContent: string
  selectedTagList: UserBookTagType[]
  setSelectedTagList: Dispatch<SetStateAction<UserBookTagType[]>>
}
export default function Tag({ tagContent, setSelectedTagList, selectedTagList }: TagProps) {
  const isSelected = selectedTagList.some((tag) => tag.tag === tagContent)

  const handleClick = () => {
    setSelectedTagList((prev) => {
      if (isSelected) {
        return prev.filter((tag) => tag.tag !== tagContent)
      }

      if (prev.length >= 5) {
        return prev
      }

      // 새로운 tag 객체를 추가할 때 tagId는 0으로 고정
      const newTag: UserBookTagType = { tagId: 0, tag: tagContent }
      return [...prev, newTag]
    })
  }

  return (
    <div
      onClick={handleClick}
      className={`${isSelected ? 'bg-deep-dark-gray text-light-gray relative' : 'border-light-gray border bg-white'} button text-dark-gray flex h-[76px] w-[76px] items-center justify-center rounded-[8px]`}
    >
      <BookmarkIcon className="absolute top-0 right-[7px]" width={12} height={16} />
      {tagContent}
    </div>
  )
}
