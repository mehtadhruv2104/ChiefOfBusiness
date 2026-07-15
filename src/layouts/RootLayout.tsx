import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { LoadingFallback } from '@/components/ui/LoadingFallback'

export function RootLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-[var(--color-canvas)] text-[var(--color-ink)]">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}
