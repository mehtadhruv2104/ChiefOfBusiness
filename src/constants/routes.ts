export const ROUTES = {
  home: '/',
  trading: '/trading',
  chainLink: '/chain-link',
  fabrico: '/fabrico',
  settings: '/settings',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
