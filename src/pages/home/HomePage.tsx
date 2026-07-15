import { APP_MODULES } from '@/constants/modules'
import { ModuleCard } from './components/ModuleCard'

export function HomePage() {
  return (
    <div className="mx-auto max-w-4xl py-6 sm:py-12">
      <div className="mb-8 sm:mb-10">
        <h1 className="text-xl font-semibold text-[var(--color-ink)] sm:text-2xl">
          Bharat Estimator
        </h1>
        <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
          Select a module to continue.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {APP_MODULES.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  )
}

export default HomePage
