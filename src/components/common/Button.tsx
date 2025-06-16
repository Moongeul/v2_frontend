import { ReactNode } from 'react'

export interface Button1Props {
  children: ReactNode
  className?: string
  onClick: () => void
  buttonType?: 'button' | 'submit'
  disabled?: boolean
  rightIcon?: ReactNode
  leftIcon?: ReactNode
}

const Button = ({
  children,
  className,
  onClick,
  buttonType = 'button',
  disabled = false,
  rightIcon,
  leftIcon,
}: Button1Props) => {
  return (
    <button disabled={disabled} type={buttonType} onClick={onClick} className={`${className}`}>
      {leftIcon ? leftIcon : null}
      {children}
      {rightIcon ? rightIcon : null}
    </button>
  )
}

export default Button
