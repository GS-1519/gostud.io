import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.gostudio.ai/')
}

export default function FreeToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
} 