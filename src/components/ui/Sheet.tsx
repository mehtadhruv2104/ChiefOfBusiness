import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'

interface SheetProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

/**
 * Native <dialog>-backed slide-over: bottom sheet on mobile, right-side
 * drawer on desktop. Gets ESC-to-close, backdrop, and focus trapping for
 * free from the browser instead of hand-rolled modal logic.
 */
export function Sheet({ open, onClose, title, children }: SheetProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
      className="m-0 max-h-[85vh] w-full max-w-full rounded-t-2xl border-t border-[var(--color-border)] bg-[var(--color-surface)] p-0 text-[var(--color-ink)] shadow-[var(--shadow-raised)] backdrop:bg-transparent sm:inset-y-0 sm:right-0 sm:left-auto sm:m-0 sm:h-full sm:max-h-full sm:w-96 sm:rounded-none sm:rounded-l-2xl sm:border-t-0 sm:border-l"
    >
      <div className="flex h-full max-h-[85vh] flex-col sm:max-h-full">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
          <h2 className="text-sm font-semibold text-[var(--color-ink)]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-ink-muted)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-ink)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
      </div>
    </dialog>
  )
}
