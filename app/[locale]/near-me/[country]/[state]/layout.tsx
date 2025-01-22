import { ReactNode } from 'react'

export default function StateLayout({
  children,
  params,
}: {
  children: ReactNode
  params?: { country: string; state: string }
}) {
  return (
    <div className="container mx-auto py-8">
      {children}
    </div>
  )
} 