import type { ComponentPropsWithoutRef } from 'react'
import { clsx } from 'clsx'

interface CardProps extends ComponentPropsWithoutRef<'div'> {
  interactive?: boolean
}

export function Card({ interactive = false, className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)]',
        interactive &&
          'transition-colors duration-150 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-raised)]',
        className,
      )}
      {...props}
    />
  )
}
