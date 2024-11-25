import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || 'https://gostudio.ai';
  // Add all your public routes here
  const routes = [
    '',                    // homepage
    // '/product-photography',
    // '/privacy',
    // '/terms',
    // '/refund',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.9,
  }))

  return routes
}