import Image from 'next/image'
import { OptionIcon } from '@/assets/svgComponents'

interface WishBookShelfItemProps {
  title: string
  author: string
  reason: string
  bookImage: string
}

export default function WishBookShelfItem({ title, author, reason, bookImage }: WishBookShelfItemProps) {
  return (
    <div onClick={() => {}} className="border-light-gray flex w-full items-center border-b py-4">
      <Image alt={bookImage} src={bookImage} className="mx-3 flex gap-x-2" width={67} height={100} />
      <div className="w-full">
        <div className="flex items-center justify-between">
          <p className="title-medium-16">{title}</p>
          <OptionIcon width={3} height={12} />
        </div>
        <p className="body-regular-14 text-dark-gray mt-[20px]">{author}</p>
        <p className="body-regular-14 text-deep-dark-gray line-clamp-1 max-w-[230px] truncate">{reason}</p>
      </div>
    </div>
  )
}
