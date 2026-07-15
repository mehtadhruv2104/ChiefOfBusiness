export function LoadingFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-pulse rounded-full border-2 border-[var(--color-border-strong)] border-t-[var(--color-copper-500)]" />
    </div>
  )
}
