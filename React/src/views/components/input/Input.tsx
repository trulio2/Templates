import type { InputHTMLAttributes, ReactNode } from 'react'

type InputVariant = 'default' | 'filled' | 'underlined'
type InputSize = 'sm' | 'md' | 'lg'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant
  size?: InputSize
  label?: ReactNode
  error?: string
}

const variantStyles: Record<InputVariant, string> = {
  default:
    'border border-[var(--border)] rounded-md bg-[var(--bg)] text-[var(--text-h)] transition-colors duration-200 focus:outline-none focus:border-[var(--accent)] placeholder:text-[var(--text)] placeholder:opacity-60',
  filled:
    'border-2 border-transparent rounded-md bg-[var(--accent-bg)] text-[var(--text-h)] transition-colors duration-200 focus:outline-none focus:border-[var(--accent)] focus:bg-[var(--bg)] placeholder:text-[var(--text)] placeholder:opacity-60',
  underlined:
    'border-0 border-b-2 border-[var(--border)] rounded-none bg-transparent text-[var(--text-h)] transition-colors duration-200 focus:outline-none focus:border-[var(--accent)] placeholder:text-[var(--text)] placeholder:opacity-60'
}

const sizeStyles: Record<InputSize, string> = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-2.5 text-base'
}

export default function Input({
  variant = 'default',
  size = 'md',
  label,
  error,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`

  return (
    <div className="flex flex-col gap-1.5 text-left">
      {label && (
        <label htmlFor={inputId} className="text-sm text-[var(--text-h)]">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`${variantStyles[variant]} ${sizeStyles[size]} ${
          error ? '!border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs m-0">{error}</p>}
    </div>
  )
}
