import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || 'https://www.gostudio.ai';
  
  const routes = [
    '',                                    // homepage
    // '/privacy',
    '/photoshoot-packs',
    '/headshot-packs',
    // '/terms-of-service',
    
    // Headshot types
    '/headshot-types/doctor-headshot',
    '/headshot-types/lawyer-headshot',
    '/headshot-types/actor-headshot',
    '/headshot-types/professional-tattoos-portraits',
    '/headshot-types/annie-headshot',
    '/headshot-types/barbie-headshot',
    '/headshot-types/viking-portraits',
    '/headshot-types/realtor-headshot',
    '/headshot-types/ted-speaker-headshot',
    '/headshot-types/linkedin-headshot',
    '/headshot-types/model-headshots',
    
    // Photo types
    '/photoshoot-packs/vintage-americana-photos',
    '/photoshoot-packs/onesie-portraits',
    '/photoshoot-packs/halloween-photos',
    '/photoshoot-packs/actress-portraits',
    '/photoshoot-packs/birthday-party-save-the-date-photoshoot',
    '/photoshoot-packs/artistic-portraits',
    '/photoshoot-packs/wrestlemania-photos',
    '/photoshoot-packs/actor-red-carpet-photos',
    '/photoshoot-packs/game-of-thrones-portraits',
    '/photoshoot-packs/kids-birthday-portraits',
    '/photoshoot-packs/mythical-creatures-portaits',
    '/photoshoot-packs/online-dating-profile-photos',
    '/photoshoot-packs/pet-photography-dog',
    '/photoshoot-packs/pop-color-photos',
    '/photoshoot-packs/youtube-thumbnail-photos',
    '/photoshoot-packs/botanical-photos',
    '/photoshoot-packs/glamour-shots-photos',
    
    // Free tools
    '/free-tools/background-library',
    '/free-tools/background-remover',
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