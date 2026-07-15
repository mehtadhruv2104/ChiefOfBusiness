import { Plus } from 'lucide-react'
import { NumberField } from '@/components/ui/NumberField'
import { formatKg, formatInr } from '@/lib/format'
import type { useMaterialCalculator } from '../hooks/useMaterialCalculator'

interface ResultSummaryProps {
  calc: ReturnType<typeof useMaterialCalculator>
  onAddToList: () => void
}

export function ResultSummary({ calc, onAddToList }: ResultSummaryProps) {
  const { result, rate, pieces } = calc
  const piecesNum = pieces === '' ? 0 : pieces
  const rateNum = rate === '' ? 0 : rate

  const totalValue =
    result?.pricingBasis === 'piece' ? piecesNum * rateNum : (result?.totalWeight ?? 0) * rateNum

  const canAdd = result !== null && rate !== '' && rateNum > 0

  return (
    <div className="space-y-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4">
      {result && result.pricingBasis === 'weight' && (
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs text-[var(--color-ink-faint)]">Weight per piece</p>
            <p className="font-semibold text-[var(--color-ink)] tabular-nums">
              {formatKg(result.weightPerPiece)}
            </p>
          </div>
          <div>
            <p className="text-xs text-[var(--color-ink-faint)]">Total weight</p>
            <p className="font-semibold text-[var(--color-ink)] tabular-nums">
              {formatKg(result.totalWeight)}
            </p>
          </div>
        </div>
      )}

      {!result && (
        <p className="text-sm text-[var(--color-ink-faint)]">
          Fill in the dimensions above to calculate weight.
        </p>
      )}

      <div className="flex items-end gap-3">
        <div className="flex-1">
          <NumberField
            label={result?.pricingBasis === 'piece' ? 'Rate (₹ per piece)' : 'Rate (₹ per kg)'}
            value={rate}
            onValueChange={calc.setRate}
            unit=""
            placeholder="0"
          />
        </div>
        <div className="flex-1">
          <p className="mb-1.5 text-xs font-medium text-[var(--color-ink-muted)]">Total value</p>
          <p className="rounded-lg border border-[var(--color-border)] bg-[var(--color-canvas)] px-3 py-2.5 text-sm font-semibold text-[var(--color-ink)] tabular-nums">
            {formatInr(totalValue)}
          </p>
        </div>
      </div>

      <button
        type="button"
        disabled={!canAdd}
        onClick={onAddToList}
        className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[var(--color-copper-500)] px-4 py-2.5 text-sm font-semibold text-[var(--color-canvas)] transition-colors hover:bg-[var(--color-copper-400)] disabled:cursor-not-allowed disabled:bg-[var(--color-surface-hover)] disabled:text-[var(--color-ink-faint)]"
      >
        <Plus className="h-4 w-4" />
        Add to list
      </button>
    </div>
  )
}
