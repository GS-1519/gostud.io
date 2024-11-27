import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.gostudio.ai/'),
  alternates: {
    canonical: '/photos'
  }
}

export default function PhotosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 