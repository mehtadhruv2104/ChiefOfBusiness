import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/layouts/RootLayout'
import { ROUTES } from '@/constants/routes'
import {
  HomePage,
  BharatTradingPage,
  ChainLinkPage,
  BharatFabricoPage,
  SettingsPage,
  NotFoundPage,
} from './lazyPages'

export const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'trading/*', element: <BharatTradingPage /> },
      { path: 'chain-link/*', element: <ChainLinkPage /> },
      { path: 'fabrico/*', element: <BharatFabricoPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
