import { Dispatch, SetStateAction } from 'react'
import { BookmarkIcon } from '@/assets/svgComponents'

interface TagProps {
  tagContent: string
  selectedTagList: string[]
  setSelectedTagList: Dispatch<SetStateAction<string[]>>
}
export default function Tag({ tagContent, setSelectedTagList, selectedTagList }: TagProps) {
  const isSelected = selectedTagList.includes(tagContent)

  const handleClick = () => {
    setSelectedTagList((prev) => {
      // 이미 선택된 경우 → 제거
      if (isSelected) {
        return prev.filter((tag) => tag !== tagContent)
      }

      // 선택된 항목이 5개 이상이면 → 추가하지 않음
      if (prev.length >= 5) {
        return prev
      }

      // 새로 추가
      return [...prev, tagContent]
    })
  }

  return (
    <div
      onClick={handleClick}
      className={`${selectedTagList.includes(tagContent) ? 'bg-deep-dark-gray text-light-gray relative' : 'border-light-gray border bg-white'} button text-dark-gray flex h-[76px] w-[76px] items-center justify-center rounded-[8px]`}
    >
      <BookmarkIcon className="absolute top-0 right-[7px]" width={12} height={16} />
      {tagContent}
    </div>
  )
}
