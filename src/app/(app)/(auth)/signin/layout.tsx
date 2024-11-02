import { ReactNode } from 'react'
import AppSuspense from '../../../../lib/AppSuspense'

export default function Layout({ children }: { children: ReactNode }) {
  return <AppSuspense>{children}</AppSuspense>
}
