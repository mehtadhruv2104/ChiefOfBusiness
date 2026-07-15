import type { LucideIcon } from 'lucide-react'
import type { AppRoute } from '@/constants/routes'

export interface AppModule {
  id: string
  name: string
  tagline: string
  description: string
  path: AppRoute
  icon: LucideIcon
}
