import { SearchIcon } from '@/assets/svgComponents'
import Input from '@/components/common/Input'
import { useState } from 'react'
import Image from 'next/image'
import { useReadBookStore } from '@/store/readBookStore'

interface BookFieldProps {
  title: string
  author: string
}

export default function BookField({ title, author }: BookFieldProps) {
  const [inputValue, setInputValue] = useState('')
  const setReadBookState = useReadBookStore((state) => state.setReadBookState)
  return (
    <div className="flex flex-col gap-y-2">
      <div className="w-full">
        <div className="title-medium-16">
          책 선택
          <span className="text-brand-color"> *</span>
        </div>
        <Input
          leftIcon={<SearchIcon width={24} height={24} />}
          placeholder={'책 제목 / 저자를 검색해보세요.'}
          inputValue={inputValue}
          setInputValue={setInputValue}
          type={'line'}
        />
      </div>

      <section onClick={() => {}} className="border-light-gray flex items-center gap-x-2 rounded-[12px] border p-2">
        <Image className="mx-[5px]" width={37} height={56} src={`/book.png`} alt={'book'} />
        <div className="flex flex-col">
          <p className="title-medium-14">{title}</p>
          <p className="caption-1 text-dark-gray">{author}</p>
        </div>
      </section>
    </div>
  )
}
