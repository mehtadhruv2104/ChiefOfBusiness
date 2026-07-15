import { useMemo } from 'react'
import { useLocalStorageState } from '@/lib/storage'
import type { CalculatedRow } from '../types'

const STORAGE_KEY = 'bharat-trading:calculation-list'

export function useCalculationList() {
  const [rows, setRows] = useLocalStorageState<CalculatedRow[]>(STORAGE_KEY, [])

  function add(row: CalculatedRow) {
    setRows((prev) => [...prev, row])
  }

  function remove(id: string) {
    setRows((prev) => prev.filter((r) => r.id !== id))
  }

  function updateRate(id: string, rate: number) {
    setRows((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, rate, totalValue: (r.pricingBasis === 'piece' ? r.pieces : r.totalWeight) * rate }
          : r,
      ),
    )
  }

  function clear() {
    setRows([])
  }

  const totals = useMemo(
    () => ({
      weight: rows.reduce((sum, r) => sum + r.totalWeight, 0),
      value: rows.reduce((sum, r) => sum + r.totalValue, 0),
    }),
    [rows],
  )

  return { rows, add, remove, updateRate, clear, totals }
}
