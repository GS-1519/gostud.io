import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.gostudio.ai/'),
  alternates: {
    canonical: '/free-tools'
  }
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 