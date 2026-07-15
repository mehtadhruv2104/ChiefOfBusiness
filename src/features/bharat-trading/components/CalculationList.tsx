import { Trash2 } from 'lucide-react'
import { formatInr, formatKg } from '@/lib/format'
import type { useCalculationList } from '../hooks/useCalculationList'

interface CalculationListProps {
  list: ReturnType<typeof useCalculationList>
}

export function CalculationList({ list }: CalculationListProps) {
  const { rows, remove, updateRate, clear, totals } = list

  if (rows.length === 0) return null

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[var(--color-ink)]">
          Calculated materials ({rows.length})
        </h2>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Clear all calculated materials from this list?')) clear()
          }}
          className="text-xs font-medium text-[var(--color-ink-faint)] transition-colors hover:text-[var(--color-danger)]"
        >
          Clear all
        </button>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-xl border border-[var(--color-border)] sm:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-raised)] text-left text-xs text-[var(--color-ink-faint)]">
              <th className="px-4 py-2.5 font-medium">Material</th>
              <th className="px-4 py-2.5 font-medium">Specification</th>
              <th className="px-4 py-2.5 font-medium">Qty</th>
              <th className="px-4 py-2.5 font-medium">Weight</th>
              <th className="px-4 py-2.5 font-medium">Rate</th>
              <th className="px-4 py-2.5 font-medium">Amount</th>
              <th className="px-4 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-[var(--color-border)] last:border-b-0">
                <td className="px-4 py-2.5 font-medium text-[var(--color-ink)]">{row.materialName}</td>
                <td className="px-4 py-2.5 text-[var(--color-ink-faint)]">{row.specification || '—'}</td>
                <td className="px-4 py-2.5 tabular-nums text-[var(--color-ink-muted)]">{row.pieces}</td>
                <td className="px-4 py-2.5 tabular-nums text-[var(--color-ink-muted)]">
                  {row.pricingBasis === 'weight' ? formatKg(row.totalWeight) : '—'}
                </td>
                <td className="px-4 py-2.5">
                  <input
                    type="number"
                    value={row.rate}
                    onChange={(e) => updateRate(row.id, Number.parseFloat(e.target.value) || 0)}
                    className="w-20 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-2 py-1 text-sm tabular-nums text-[var(--color-ink)] outline-none focus:border-[var(--color-copper-500)]"
                  />
                </td>
                <td className="px-4 py-2.5 font-semibold tabular-nums text-[var(--color-ink)]">
                  {formatInr(row.totalValue)}
                </td>
                <td className="px-4 py-2.5 text-right">
                  <button
                    type="button"
                    onClick={() => remove(row.id)}
                    aria-label="Remove"
                    className="text-[var(--color-ink-faint)] transition-colors hover:text-[var(--color-danger)]"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-[var(--color-surface-raised)] font-semibold text-[var(--color-ink)]">
              <td className="px-4 py-2.5" colSpan={3}>
                Total
              </td>
              <td className="px-4 py-2.5 tabular-nums">{formatKg(totals.weight)}</td>
              <td className="px-4 py-2.5" />
              <td className="px-4 py-2.5 tabular-nums">{formatInr(totals.value)}</td>
              <td className="px-4 py-2.5" />
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-2.5 sm:hidden">
        {rows.map((row) => (
          <div
            key={row.id}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-3.5"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[var(--color-ink)]">
                  {row.materialName}
                </p>
                <p className="text-xs text-[var(--color-ink-faint)]">{row.specification || '—'}</p>
              </div>
              <button
                type="button"
                onClick={() => remove(row.id)}
                aria-label="Remove"
                className="shrink-0 text-[var(--color-ink-faint)]"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-[var(--color-ink-faint)]">Qty</p>
                <p className="font-medium tabular-nums text-[var(--color-ink)]">{row.pieces}</p>
              </div>
              <div>
                <p className="text-[var(--color-ink-faint)]">Weight</p>
                <p className="font-medium tabular-nums text-[var(--color-ink)]">
                  {row.pricingBasis === 'weight' ? formatKg(row.totalWeight) : '—'}
                </p>
              </div>
              <div>
                <p className="text-[var(--color-ink-faint)]">Rate</p>
                <input
                  type="number"
                  value={row.rate}
                  onChange={(e) => updateRate(row.id, Number.parseFloat(e.target.value) || 0)}
                  className="mt-0.5 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-canvas)] px-2 py-1 text-sm tabular-nums text-[var(--color-ink)] outline-none"
                />
              </div>
              <div>
                <p className="text-[var(--color-ink-faint)]">Amount</p>
                <p className="font-semibold tabular-nums text-[var(--color-ink)]">
                  {formatInr(row.totalValue)}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-3.5 text-sm font-semibold text-[var(--color-ink)]">
          <span>Total</span>
          <span className="tabular-nums">
            {formatKg(totals.weight)} · {formatInr(totals.value)}
          </span>
        </div>
      </div>
    </div>
  )
}
