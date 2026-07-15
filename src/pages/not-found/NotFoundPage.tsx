import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
      <p className="text-sm font-medium text-[var(--color-ink-faint)]">404</p>
      <h1 className="text-lg font-semibold text-[var(--color-ink)]">Page not found</h1>
      <Link
        to={ROUTES.home}
        className="mt-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-surface-hover)]"
      >
        Back to home
      </Link>
    </div>
  )
}
