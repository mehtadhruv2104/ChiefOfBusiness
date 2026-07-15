import { useMemo, useState } from 'react'
import { ArrowLeftRight } from 'lucide-react'
import { Sheet } from '@/components/ui/Sheet'
import {
  LENGTH_UNIT_OPTIONS,
  WEIGHT_UNIT_OPTIONS,
  convertLength,
  convertWeight,
} from '@/lib/units'
import type { LengthUnit, WeightUnit } from '@/lib/units'

interface UnitConverterPanelProps {
  open: boolean
  onClose: () => void
}

function ConverterBlock<U extends string>({
  title,
  value,
  onValueChange,
  from,
  to,
  onFromChange,
  onToChange,
  options,
  result,
}: {
  title: string
  value: number | ''
  onValueChange: (v: number | '') => void
  from: U
  to: U
  onFromChange: (u: U) => void
  onToChange: (u: U) => void
  options: { value: U; label: string }[]
  result: number
}) {
  return (
    <div className="space-y-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4">
      <p className="text-xs font-semibold tracking-wide text-[var(--color-ink-faint)] uppercase">{title}</p>
      <div className="flex items-center gap-2">
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onValueChange(e.target.value === '' ? '' : Number.parseFloat(e.target.value))}
          placeholder="0"
          className="w-full min-w-0 flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-canvas)] px-3 py-2 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-copper-500)]"
        />
        <select
          value={from}
          onChange={(e) => onFromChange(e.target.value as U)}
          className="shrink-0 rounded-lg border border-[var(--color-border)] bg-[var(--color-canvas)] px-2 py-2 text-xs font-medium text-[var(--color-ink-muted)] outline-none"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={() => {
          onFromChange(to)
          onToChange(from)
        }}
        aria-label="Swap units"
        className="mx-auto flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-ink-faint)] transition-colors hover:border-[var(--color-copper-500)] hover:text-[var(--color-copper-500)]"
      >
        <ArrowLeftRight className="h-3.5 w-3.5" />
      </button>

      <div className="flex items-center gap-2">
        <p className="w-full min-w-0 flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-canvas)] px-3 py-2 text-sm font-semibold text-[var(--color-ink)] tabular-nums">
          {Number.isFinite(result) ? result.toFixed(4).replace(/\.?0+$/, '') : '0'}
        </p>
        <select
          value={to}
          onChange={(e) => onToChange(e.target.value as U)}
          className="shrink-0 rounded-lg border border-[var(--color-border)] bg-[var(--color-canvas)] px-2 py-2 text-xs font-medium text-[var(--color-ink-muted)] outline-none"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export function UnitConverterPanel({ open, onClose }: UnitConverterPanelProps) {
  const [lengthValue, setLengthValue] = useState<number | ''>(1)
  const [lengthFrom, setLengthFrom] = useState<LengthUnit>('mm')
  const [lengthTo, setLengthTo] = useState<LengthUnit>('in')

  const [weightValue, setWeightValue] = useState<number | ''>(1)
  const [weightFrom, setWeightFrom] = useState<WeightUnit>('kg')
  const [weightTo, setWeightTo] = useState<WeightUnit>('ton')

  const lengthResult = useMemo(
    () => convertLength(lengthValue === '' ? 0 : lengthValue, lengthFrom, lengthTo),
    [lengthValue, lengthFrom, lengthTo],
  )
  const weightResult = useMemo(
    () => convertWeight(weightValue === '' ? 0 : weightValue, weightFrom, weightTo),
    [weightValue, weightFrom, weightTo],
  )

  return (
    <Sheet open={open} onClose={onClose} title="Unit Converter">
      <div className="space-y-4">
        <ConverterBlock
          title="Length"
          value={lengthValue}
          onValueChange={setLengthValue}
          from={lengthFrom}
          to={lengthTo}
          onFromChange={setLengthFrom}
          onToChange={setLengthTo}
          options={LENGTH_UNIT_OPTIONS}
          result={lengthResult}
        />
        <ConverterBlock
          title="Weight"
          value={weightValue}
          onValueChange={setWeightValue}
          from={weightFrom}
          to={weightTo}
          onFromChange={setWeightFrom}
          onToChange={setWeightTo}
          options={WEIGHT_UNIT_OPTIONS}
          result={weightResult}
        />
      </div>
    </Sheet>
  )
}
