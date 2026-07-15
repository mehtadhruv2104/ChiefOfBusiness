import { Sheet } from '@/components/ui/Sheet'
import { MATERIAL_CATEGORIES } from '@/data/materials'
import type { MaterialCategory } from '@/data/materials'

interface CategoryPickerModalProps {
  open: boolean
  onClose: () => void
  onPick: (category: MaterialCategory) => void
}

export function CategoryPickerModal({ open, onClose, onPick }: CategoryPickerModalProps) {
  return (
    <Sheet open={open} onClose={onClose} title="Custom material — choose type">
      <div className="grid grid-cols-2 gap-2">
        {MATERIAL_CATEGORIES.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onPick(category)}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-3 py-3 text-left text-sm font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-copper-500)] hover:bg-[var(--color-surface-hover)]"
          >
            {category.label}
          </button>
        ))}
      </div>
    </Sheet>
  )
}
