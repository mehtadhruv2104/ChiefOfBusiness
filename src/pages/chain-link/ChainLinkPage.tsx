import { NumberField } from '@/components/ui/NumberField'
import { ChainLinkDiagram } from '@/features/chain-link/diagrams/ChainLinkDiagram'
import { useChainLinkCalculator } from '@/features/chain-link/hooks/useChainLinkCalculator'
import { formatKg } from '@/lib/format'
import { LENGTH_UNIT_OPTIONS, SMALL_LENGTH_UNIT_OPTIONS } from '@/lib/units'
import type { LengthUnit } from '@/lib/units'

export default function ChainLinkPage() {
  const calc = useChainLinkCalculator()

  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-8">
      <div>
        <h1 className="text-lg font-semibold text-[var(--color-ink)] sm:text-xl">
          BSWI (Chain Link)
        </h1>
        <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
          Enter the boundary and fabric specification to get rolls required and total weight.
        </p>
      </div>

      <div className="space-y-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-canvas)] py-4">
          <ChainLinkDiagram />
        </div>

        <p className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-3 py-2 text-xs leading-relaxed text-[var(--color-ink-faint)]">
          Mesh size is measured as the length of one diamond side (see diagram). If your
          supplier quotes mesh size differently, confirm before final pricing.
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <NumberField
            label="Boundary Length"
            value={calc.boundaryLength.value}
            onValueChange={(v) => calc.setBoundaryLength((prev) => ({ ...prev, value: v }))}
            unit={calc.boundaryLength.unit}
            onUnitChange={(u) =>
              calc.setBoundaryLength((prev) => ({ ...prev, unit: u as LengthUnit }))
            }
            unitOptions={LENGTH_UNIT_OPTIONS}
          />
          <NumberField
            label="Height"
            value={calc.height.value}
            onValueChange={(v) => calc.setHeight((prev) => ({ ...prev, value: v }))}
            unit={calc.height.unit}
            onUnitChange={(u) => calc.setHeight((prev) => ({ ...prev, unit: u as LengthUnit }))}
            unitOptions={LENGTH_UNIT_OPTIONS}
          />
          <NumberField
            label="Wire Diameter"
            value={calc.wireDiameter.value}
            onValueChange={(v) => calc.setWireDiameter((prev) => ({ ...prev, value: v }))}
            unit={calc.wireDiameter.unit}
            onUnitChange={(u) =>
              calc.setWireDiameter((prev) => ({ ...prev, unit: u as LengthUnit }))
            }
            unitOptions={SMALL_LENGTH_UNIT_OPTIONS}
          />
          <NumberField
            label="Mesh Size"
            value={calc.meshSize.value}
            onValueChange={(v) => calc.setMeshSize((prev) => ({ ...prev, value: v }))}
            unit={calc.meshSize.unit}
            onUnitChange={(u) => calc.setMeshSize((prev) => ({ ...prev, unit: u as LengthUnit }))}
            unitOptions={SMALL_LENGTH_UNIT_OPTIONS}
          />
          <NumberField
            label="Roll Length"
            value={calc.rollLength.value}
            onValueChange={(v) => calc.setRollLength((prev) => ({ ...prev, value: v }))}
            unit={calc.rollLength.unit}
            onUnitChange={(u) =>
              calc.setRollLength((prev) => ({ ...prev, unit: u as LengthUnit }))
            }
            unitOptions={LENGTH_UNIT_OPTIONS}
          />
        </div>

        <div className="space-y-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4">
          {calc.result ? (
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div>
                <p className="text-xs text-[var(--color-ink-faint)]">Weight per roll</p>
                <p className="font-semibold text-[var(--color-ink)] tabular-nums">
                  {formatKg(calc.result.weightPerRoll)}
                </p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-ink-faint)]">Rolls required</p>
                <p className="font-semibold text-[var(--color-ink)] tabular-nums">
                  {calc.result.rollsRequired}
                </p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-ink-faint)]">Total weight</p>
                <p className="font-semibold text-[var(--color-ink)] tabular-nums">
                  {formatKg(calc.result.totalWeight)}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-[var(--color-ink-faint)]">
              Fill in all fields above to calculate rolls and weight.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
