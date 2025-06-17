import { ReactNode } from 'react'

const styleSize = {
  small: 'h-[14px]',
  medium: 'h-[36px]',
  large: 'h-[48px]',
}

const styleState = {
  active: 'bg-deep-dark-gray text-white',
  disabled: 'bg-light-gray text-dark-gray',
  secondary: 'border border-light-gray text-dark-gray',
  main: 'bg-brand-color text-white',
  border: 'border border-brand-color text-black',
}

export interface ButtonProps {
  //style
  state?: 'active' | 'disabled' | 'secondary' | 'main' | 'border'
  customClassName: string
  size?: 'small' | 'medium' | 'large'

  //기능
  children: ReactNode
  onClick?: () => void
  buttonType?: 'button' | 'submit'
  disabled?: boolean
  rightIcon?: ReactNode
  leftIcon?: ReactNode
}

const Button = ({
  children,
  onClick,
  buttonType = 'button',
  disabled = false,
  rightIcon,
  leftIcon,
  state = 'active',
  size = 'large',
  customClassName, //넓이 etc..
}: ButtonProps) => {
  const baseStyle = 'flex items-center justify-center button rounded-full'
  const className = `${baseStyle} ${styleState[state]} ${styleSize[size]} ${customClassName}`
  return (
    <button disabled={disabled} type={buttonType} onClick={onClick} className={`${className}`}>
      {leftIcon ? leftIcon : null}
      {children}
      {rightIcon ? rightIcon : null}
    </button>
  )
}

export default Button
