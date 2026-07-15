import { ArrowLeft, Ruler } from 'lucide-react'
import { NumberField } from '@/components/ui/NumberField'
import { LENGTH_UNIT_OPTIONS } from '@/lib/units'
import { DIAGRAM_REGISTRY } from '../diagrams'
import { getActiveFields } from '../utils/fields'
import type { useMaterialCalculator } from '../hooks/useMaterialCalculator'

interface DimensionFormProps {
  calc: ReturnType<typeof useMaterialCalculator>
  onBack: () => void
  onOpenConverter: () => void
}

export function DimensionForm({ calc, onBack, onOpenConverter }: DimensionFormProps) {
  const { category } = calc
  if (!category) return null

  const Diagram = DIAGRAM_REGISTRY[category.diagramId]
  const activeFields = getActiveFields(category, calc.channelMode)

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to search"
            className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[var(--color-ink-muted)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-ink)]"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <p className="text-sm font-semibold text-[var(--color-ink)]">{calc.materialName}</p>
            <p className="text-xs text-[var(--color-ink-faint)]">{category.label}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenConverter}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-2.5 py-1.5 text-xs font-medium text-[var(--color-ink-muted)] transition-colors hover:border-[var(--color-copper-500)] hover:text-[var(--color-ink)]"
        >
          <Ruler className="h-3.5 w-3.5" />
          Converter
        </button>
      </div>

      {Diagram && (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-canvas)] py-4">
          <Diagram />
        </div>
      )}

      {category.note && (
        <p className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-3 py-2 text-xs leading-relaxed text-[var(--color-ink-faint)]">
          {category.note}
        </p>
      )}

      {category.modes && (
        <div className="flex gap-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-1">
          <button
            type="button"
            onClick={() => calc.setChannelMode('direct')}
            className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              calc.channelMode === 'direct'
                ? 'bg-[var(--color-copper-500)] text-[var(--color-canvas)]'
                : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'
            }`}
          >
            Enter weight per metre
          </button>
          <button
            type="button"
            onClick={() => calc.setChannelMode('advanced')}
            className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              calc.channelMode === 'advanced'
                ? 'bg-[var(--color-copper-500)] text-[var(--color-canvas)]'
                : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'
            }`}
          >
            Calculate from section
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {activeFields.map((field) => (
          <NumberField
            key={field.key}
            label={field.label}
            value={calc.fields[field.key]?.value ?? ''}
            onValueChange={(v) => calc.updateField(field.key, v)}
            unit={calc.fields[field.key]?.unit ?? field.defaultUnit}
            onUnitChange={(u) => calc.updateFieldUnit(field.key, u)}
            unitOptions={field.unitOptions}
          />
        ))}

        {category.hasLength && (
          <NumberField
            label="Length"
            value={calc.length.value}
            onValueChange={(v) => calc.setLength((prev) => ({ ...prev, value: v }))}
            unit={calc.length.unit}
            onUnitChange={(u) => calc.setLength((prev) => ({ ...prev, unit: u }))}
            unitOptions={LENGTH_UNIT_OPTIONS}
          />
        )}

        <NumberField
          label={category.quantityLabel}
          value={calc.pieces}
          onValueChange={(v) => calc.setPieces(v)}
          unit=""
          placeholder="1"
        />
      </div>
    </div>
  )
}
