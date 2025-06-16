import { SearchIcon } from '@/assets/svgComponents'
import { Dispatch, ReactNode, SetStateAction } from 'react'

interface InputProps {
  inputValue: string
  setInputValue: Dispatch<SetStateAction<string>>
  type: 'line' | 'round'
  rightIcon?: ReactNode
  leftIcon?: ReactNode
}
export default function Input({ inputValue, setInputValue, type, rightIcon, leftIcon }: InputProps) {
  return (
    <div
      className={`${type === 'line' ? 'border border-b p-2' : 'rounded-full border px-4'} flex h-[48px] items-center justify-between`}
    >
      {leftIcon && <div className="ml-2 flex h-full flex-shrink-0 items-center justify-center">{leftIcon}</div>}
      <div className={`${type === 'line' ? 'gap-x-2' : 'gap-x-1'} flex w-full items-center`}>
        <SearchIcon width={24} height={24} />
        <input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
          }}
          className={'placeholder:text-dark-gray title-regular-14 w-full outline-none'}
          placeholder={'책 제목 / 저자를 검색해보세요.'}
        />
      </div>

      {rightIcon && <div className="ml-2 flex h-full flex-shrink-0 items-center justify-center">{rightIcon}</div>}
    </div>
  )
}
