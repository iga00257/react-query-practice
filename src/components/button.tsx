import { type InputHTMLAttributes, type PropsWithChildren } from 'react'

export interface Props extends InputHTMLAttributes<HTMLButtonElement> {
  type?: 'default' | 'warn' | 'primary'
  isLoading?: boolean
  isDisabled?: boolean
  className?: string
}

const Button = ({ type, isLoading, isDisabled, className = '', children, ...rest }: PropsWithChildren<Props>) => {
  let color = 'bg-gray-200'

  if (type === 'primary') {
    color = 'bg-primary text-white'
  } else if (type === 'warn') {
    color = 'bg-error text-white'
  }

  return (
    <button
      disabled={isDisabled}
      className={`rounded-xl p-2 opacity-90 outline-none transition-all 
    hover:opacity-100 ${color} ${className}`}
      onClick={rest.onClick}
    >
      {children}
    </button>
  )
}

export default Button
