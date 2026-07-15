import { Boxes, Fence, Hammer } from 'lucide-react'
import { ROUTES } from './routes'
import type { AppModule } from '@/types'

export const APP_MODULES: AppModule[] = [
  {
    id: 'bharat-trading',
    name: 'Bharat Trading',
    tagline: 'Material weight & value calculator',
    description:
      'Search standard steel sections, calculate piece and total weight, and price the order.',
    path: ROUTES.trading,
    icon: Boxes,
  },
  {
    id: 'bswi-chain-link',
    name: 'BSWI (Chain Link)',
    tagline: 'Chain link fencing estimator',
    description:
      'Estimate rolls and total wire weight required for a boundary from length and height.',
    path: ROUTES.chainLink,
    icon: Fence,
  },
  {
    id: 'bharat-fabrico',
    name: 'Bharat Fabrico',
    tagline: 'Fabrication quotation builder',
    description:
      'Build a material list, add fabrication and site charges, and export a client-ready PDF.',
    path: ROUTES.fabrico,
    icon: Hammer,
  },
]
