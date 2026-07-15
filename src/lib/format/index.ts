const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
})

const kgFormatter = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 })

export function formatInr(value: number): string {
  return inrFormatter.format(Number.isFinite(value) ? value : 0)
}

export function formatKg(value: number): string {
  return `${kgFormatter.format(Number.isFinite(value) ? value : 0)} kg`
}
