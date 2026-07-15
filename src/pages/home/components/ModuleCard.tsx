import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import type { AppModule } from '@/types'

interface ModuleCardProps {
  module: AppModule
}

export function ModuleCard({ module }: ModuleCardProps) {
  const Icon = module.icon

  return (
    <Link to={module.path} className="block focus:outline-none">
      <Card
        interactive
        className="group flex h-full flex-col gap-5 p-6 focus-visible:ring-2 focus-visible:ring-[var(--color-copper-500)] sm:p-7"
      >
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] text-[var(--color-copper-500)]">
            <Icon className="h-6 w-6" strokeWidth={1.75} />
          </div>
          <ArrowRight className="h-5 w-5 text-[var(--color-ink-faint)] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-[var(--color-copper-500)]" />
        </div>

        <div className="space-y-1.5">
          <h2 className="text-base font-semibold text-[var(--color-ink)] sm:text-lg">
            {module.name}
          </h2>
          <p className="text-sm text-[var(--color-ink-muted)]">{module.tagline}</p>
        </div>

        <p className="mt-auto text-sm leading-relaxed text-[var(--color-ink-faint)]">
          {module.description}
        </p>
      </Card>
    </Link>
  )
}
