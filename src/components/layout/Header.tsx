import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Settings } from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import { APP_MODULES } from '@/constants/modules'
import { BrandMark } from '@/components/ui/BrandMark'

export function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === ROUTES.home
  const currentModule = APP_MODULES.find((m) => location.pathname.startsWith(m.path))
  const title = currentModule?.name ?? (location.pathname === ROUTES.settings ? 'Settings' : null)

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-canvas)]/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6">
        {!isHome && (
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="-ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[var(--color-ink-muted)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-ink)]"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}

        <Link to={ROUTES.home} className="flex min-w-0 items-center gap-2.5">
          <BrandMark className="h-7 w-7 shrink-0" />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-[13px] font-semibold tracking-wide text-[var(--color-ink)]">
              {title ?? 'Bharat Estimator'}
            </span>
            {title && (
              <span className="hidden text-[11px] text-[var(--color-ink-faint)] sm:block">
                Bharat Estimator
              </span>
            )}
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-1">
          <Link
            to={ROUTES.settings}
            aria-label="Settings"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-ink-muted)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-ink)]"
          >
            <Settings className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  )
}
