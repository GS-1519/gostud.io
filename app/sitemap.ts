import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || 'https://www.gostudio.ai';
  
  // Add all your public routes here
  const routes = [
    '',                                    // homepage
    // '/privacy',                           
    // '/product-photography',
    '/headshot-types',
    '/photos',
    
    // Photo types
    '/photos/vintage-americana-photos',
    '/photos/onesie-portraits',
    '/photos/halloween-photos',
    '/photos/helmut-newton-photos',
    '/photos/jcrew-photos',
    '/photos/birthday-party-save-the-date-photoshoot',
    '/photos/artistic-portraits',
    '/photos/wrestlemania-photos',
    '/photos/actor-red-carpet-photos',
    '/photos/game-of-thrones-portraits',
    '/photos/kids-birthday-portraits',
    '/photos/mythical-creatures-portaits',
    '/photos/online-dating-profile-photos',
    '/photos/pet-photography-dog',
    '/photos/pop-color-photos',
    '/photos/youtube-thumbnail-photos',
    
    // Headshot types
    '/headshot-types/doctor-headshot',
    '/headshot-types/professional-tattoos-portraits',
    '/headshot-types/annie-headshot',
    '/headshot-types/barbie-headshot',
    '/headshot-types/viking-portraits',
    '/headshot-types/realtor-headshot',
    '/headshot-types/TED-speaker-headshot',
    
    // Free tools
    '/free-tools/background-library',
    '/free-tools/black-background',
    '/free-tools/grey-background',
    '/free-tools/red-background',
    '/free-tools/white-background',
    '/free-tools/abstract-background',
    '/free-tools/christmas-background',
    '/free-tools/halloween-background',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.9,
  }))

  return routes
}