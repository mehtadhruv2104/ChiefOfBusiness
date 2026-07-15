import { useId } from 'react'
import type { UnitOption } from '@/lib/units'

interface NumberFieldProps {
  id?: string
  label: string
  value: number | ''
  onValueChange: (value: number | '') => void
  unit: string
  onUnitChange?: (unit: string) => void
  unitOptions?: UnitOption[]
  placeholder?: string
}

export function NumberField({
  id,
  label,
  value,
  onValueChange,
  unit,
  onUnitChange,
  unitOptions,
  placeholder,
}: NumberFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 block text-xs font-medium text-[var(--color-ink-muted)]">
        {label}
      </label>
      <div className="flex overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] focus-within:border-[var(--color-copper-500)]">
        <input
          id={inputId}
          type="number"
          inputMode="decimal"
          step="any"
          value={value}
          placeholder={placeholder ?? '0'}
          onChange={(e) => {
            const raw = e.target.value
            onValueChange(raw === '' ? '' : Number.parseFloat(raw))
          }}
          className="w-full min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-[var(--color-ink)] outline-none placeholder:text-[var(--color-ink-faint)]"
        />
        {unitOptions && unitOptions.length > 0 && (
          <select
            value={unit}
            onChange={(e) => onUnitChange?.(e.target.value)}
            aria-label={`${label} unit`}
            className="shrink-0 cursor-pointer border-l border-[var(--color-border)] bg-transparent px-2 text-xs font-medium text-[var(--color-ink-muted)] outline-none"
          >
            {unitOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[var(--color-surface)]">
                {opt.label}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  )
}
