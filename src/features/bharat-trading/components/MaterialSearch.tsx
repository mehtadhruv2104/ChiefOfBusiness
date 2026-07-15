import { useMemo, useRef, useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { searchMaterialLibrary } from '@/data/materials'
import type { MaterialCategory, MaterialLibraryItem } from '@/data/materials'

interface MaterialSearchProps {
  onSelectItem: (item: MaterialLibraryItem, category: MaterialCategory) => void
  onSelectCustom: (category: MaterialCategory) => void
  onOpenCategoryPicker: () => void
}

type Row =
  | { type: 'item'; item: MaterialLibraryItem; category: MaterialCategory }
  | { type: 'custom'; category: MaterialCategory }

export function MaterialSearch({ onSelectItem, onSelectCustom, onOpenCategoryPicker }: MaterialSearchProps) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const groups = useMemo(() => searchMaterialLibrary(query), [query])

  const rows = useMemo<Row[]>(() => {
    const flat: Row[] = []
    for (const group of groups) {
      for (const item of group.items) {
        flat.push({ type: 'item', item, category: group.category })
      }
      flat.push({ type: 'custom', category: group.category })
    }
    return flat
  }, [groups])

  function commitRow(row: Row) {
    if (row.type === 'item') {
      onSelectItem(row.item, row.category)
    } else {
      onSelectCustom(row.category)
    }
    setQuery('')
    setOpen(false)
    setActiveIndex(0)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter')) {
      setOpen(true)
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, rows.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const row = rows[activeIndex]
      if (row) commitRow(row)
    } else if (e.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
    }
  }

  let runningIndex = -1

  return (
    <div className="relative">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--color-ink-faint)]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onFocus={() => setOpen(true)}
            onChange={(e) => {
              setQuery(e.target.value)
              setActiveIndex(0)
              setOpen(true)
            }}
            onKeyDown={handleKeyDown}
            onBlur={() => window.setTimeout(() => setOpen(false), 150)}
            placeholder="Search materials — e.g. Square Pipe, Flat 25x5..."
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] py-2.5 pr-3 pl-9 text-sm text-[var(--color-ink)] outline-none placeholder:text-[var(--color-ink-faint)] focus:border-[var(--color-copper-500)]"
          />
        </div>
        <button
          type="button"
          onClick={onOpenCategoryPicker}
          aria-label="Add custom material"
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-3 py-2.5 text-sm font-medium text-[var(--color-ink-muted)] transition-colors hover:border-[var(--color-copper-500)] hover:text-[var(--color-ink)]"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline" aria-hidden="true">Custom</span>
        </button>
      </div>

      {open && (
        <div className="absolute z-30 mt-1.5 max-h-96 w-full overflow-y-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-raised)]">
          {groups.length === 0 && (
            <p className="px-4 py-6 text-center text-sm text-[var(--color-ink-faint)]">
              No matches. Try a different search or add a custom material.
            </p>
          )}
          {groups.map((group) => (
            <div key={group.category.id} className="border-b border-[var(--color-border)] last:border-b-0">
              <div className="sticky top-0 bg-[var(--color-surface)] px-4 pt-2.5 pb-1 text-[11px] font-semibold tracking-wide text-[var(--color-ink-faint)] uppercase">
                {group.category.label}
              </div>
              {group.items.map((item) => {
                runningIndex += 1
                const isActive = runningIndex === activeIndex
                return (
                  <button
                    key={item.id}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => commitRow({ type: 'item', item, category: group.category })}
                    className={`block w-full px-4 py-2 text-left text-sm ${
                      isActive
                        ? 'bg-[var(--color-surface-hover)] text-[var(--color-ink)]'
                        : 'text-[var(--color-ink-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-ink)]'
                    }`}
                  >
                    {item.name}
                  </button>
                )
              })}
              {(() => {
                runningIndex += 1
                const isActive = runningIndex === activeIndex
                return (
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => commitRow({ type: 'custom', category: group.category })}
                    className={`flex w-full items-center gap-1.5 px-4 py-2 text-left text-sm font-medium ${
                      isActive
                        ? 'bg-[var(--color-surface-hover)] text-[var(--color-copper-500)]'
                        : 'text-[var(--color-copper-500)] hover:bg-[var(--color-surface-hover)]'
                    }`}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Custom size — {group.category.label}
                  </button>
                )
              })()}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
