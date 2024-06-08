'use client'

import { SaasProvider } from '@saas-ui/react'
import theme from './theme'

export function Providers({ children }: { children: React.ReactNode }) {
  return <SaasProvider theme={theme}>{children}</SaasProvider>
}