import { lazy } from 'react'

export const HomePage = lazy(() => import('@/pages/home/HomePage'))
export const BharatTradingPage = lazy(() => import('@/pages/bharat-trading/BharatTradingPage'))
export const ChainLinkPage = lazy(() => import('@/pages/chain-link/ChainLinkPage'))
export const BharatFabricoPage = lazy(() => import('@/pages/bharat-fabrico/BharatFabricoPage'))
export const SettingsPage = lazy(() => import('@/pages/settings/SettingsPage'))
export const NotFoundPage = lazy(() => import('@/pages/not-found/NotFoundPage'))
