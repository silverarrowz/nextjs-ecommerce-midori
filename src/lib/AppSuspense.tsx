'use client'

import React, { Suspense } from 'react'

export default function AppSuspense({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div>Загрузка...</div>}>{children}</Suspense>
}
