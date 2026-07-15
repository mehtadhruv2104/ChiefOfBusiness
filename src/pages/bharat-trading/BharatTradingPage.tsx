import { useState } from 'react'
import { CalculationList } from '@/features/bharat-trading/components/CalculationList'
import { CategoryPickerModal } from '@/features/bharat-trading/components/CategoryPickerModal'
import { DimensionForm } from '@/features/bharat-trading/components/DimensionForm'
import { MaterialSearch } from '@/features/bharat-trading/components/MaterialSearch'
import { ResultSummary } from '@/features/bharat-trading/components/ResultSummary'
import { UnitConverterPanel } from '@/features/bharat-trading/components/UnitConverterPanel'
import { useCalculationList } from '@/features/bharat-trading/hooks/useCalculationList'
import { useMaterialCalculator } from '@/features/bharat-trading/hooks/useMaterialCalculator'
import { formatSpecification } from '@/features/bharat-trading/utils/formatSpecification'

export default function BharatTradingPage() {
  const calc = useMaterialCalculator()
  const list = useCalculationList()
  const [converterOpen, setConverterOpen] = useState(false)
  const [categoryPickerOpen, setCategoryPickerOpen] = useState(false)

  function handleAddToList() {
    if (!calc.category || !calc.result) return
    const pieces = calc.pieces === '' ? 0 : calc.pieces
    const rate = calc.rate === '' ? 0 : calc.rate
    const totalValue = calc.result.pricingBasis === 'piece' ? pieces * rate : calc.result.totalWeight * rate

    list.add({
      id: crypto.randomUUID(),
      categoryLabel: calc.category.label,
      materialName: calc.materialName,
      specification: formatSpecification(calc.category, calc.fields, calc.channelMode, calc.length),
      pieces,
      weightPerPiece: calc.result.weightPerPiece,
      totalWeight: calc.result.totalWeight,
      pricingBasis: calc.result.pricingBasis,
      rate,
      totalValue,
    })
    calc.reset()
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-8">
      <div>
        <h1 className="text-lg font-semibold text-[var(--color-ink)] sm:text-xl">Bharat Trading</h1>
        <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
          Search a material, enter dimensions, and get weight and value instantly.
        </p>
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5">
        {!calc.category ? (
          <MaterialSearch
            onSelectItem={calc.selectItem}
            onSelectCustom={calc.selectCustom}
            onOpenCategoryPicker={() => setCategoryPickerOpen(true)}
          />
        ) : (
          <div className="space-y-5">
            <DimensionForm calc={calc} onBack={calc.reset} onOpenConverter={() => setConverterOpen(true)} />
            <ResultSummary calc={calc} onAddToList={handleAddToList} />
          </div>
        )}
      </div>

      <CalculationList list={list} />

      <CategoryPickerModal
        open={categoryPickerOpen}
        onClose={() => setCategoryPickerOpen(false)}
        onPick={(category) => {
          calc.selectCustom(category)
          setCategoryPickerOpen(false)
        }}
      />

      <UnitConverterPanel open={converterOpen} onClose={() => setConverterOpen(false)} />
    </div>
  )
}
