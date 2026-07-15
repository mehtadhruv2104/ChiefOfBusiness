import type { LucideIcon } from 'lucide-react'

interface PageStubProps {
  icon: LucideIcon
  title: string
  description: string
  phase: string
}

/** Placeholder shown for modules not yet implemented in the current build phase. */
export function PageStub({ icon: Icon, title, description, phase }: PageStubProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <Icon className="h-7 w-7 text-[var(--color-copper-500)]" />
      </div>
      <div className="space-y-1.5">
        <h1 className="text-lg font-semibold text-[var(--color-ink)]">{title}</h1>
        <p className="mx-auto max-w-sm text-sm text-[var(--color-ink-muted)]">{description}</p>
      </div>
      <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs font-medium text-[var(--color-ink-faint)]">
        {phase}
      </span>
    </div>
  )
}
