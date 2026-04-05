import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'text-[var(--accent)] bg-[var(--accent-bg)] border-2 border-transparent rounded-md transition-all duration-300 hover:border-[var(--accent-border)] hover:shadow-lg hover:shadow-[var(--accent)]/20 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2',
  secondary:
    'text-[var(--text)] bg-transparent border-2 border-[var(--border)] rounded-md transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2',
  ghost:
    'text-[var(--text)] bg-transparent border-2 border-transparent rounded-md transition-all duration-300 hover:text-[var(--accent)] hover:bg-[var(--accent-bg)]/50 focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2',
  icon: 'bg-[var(--accent)] text-white rounded-full transition-all duration-300 hover:opacity-90 hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2'
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-2.5 py-1.5 text-sm',
  lg: 'px-4 py-2.5 text-base'
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
