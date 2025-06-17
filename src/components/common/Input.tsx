import { Dispatch, ReactNode, SetStateAction } from 'react'

interface InputProps {
  inputValue: string
  setInputValue: Dispatch<SetStateAction<string>>
  type: 'line' | 'round'
  rightIcon?: ReactNode
  leftIcon?: ReactNode
  customClassName?: string
  placeholder: string
  onFocus?: () => void
  onBlur?: () => void
  onChange?: () => void
}
export default function Input({
  inputValue,
  setInputValue,
  type,
  rightIcon,
  leftIcon,
  customClassName,
  placeholder,
  onFocus,
  onBlur,
  onChange,
}: InputProps) {
  return (
    <div
      className={`${type === 'line' ? 'border border-b p-2' : 'rounded-full border px-4'} flex h-[48px] items-center justify-between ${customClassName}`}
    >
      <div className={`${type === 'line' ? 'gap-x-2' : 'gap-x-1'} flex w-full items-center`}>
        {leftIcon && <div className="flex h-full flex-shrink-0 items-center justify-center">{leftIcon}</div>}
        <input
          onFocus={onFocus}
          onBlur={onBlur}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
            onChange ? onChange() : null
          }}
          className={'placeholder:text-dark-gray title-regular-14 w-full outline-none'}
          placeholder={placeholder}
        />
      </div>

      {rightIcon && <div className="ml-2 flex h-full flex-shrink-0 items-center justify-center">{rightIcon}</div>}
    </div>
  )
}
