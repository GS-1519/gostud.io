import { HeroConfig } from '@/types/hero-types';

export const heroConfigs: Record<string, HeroConfig> = {
  'dreamland-kids': {
    gradientTitle: 'Magical Kids Portraits',
    normalTitle: 'Where Dreams Come Alive',
    description: 'Transform your children\'s photos into enchanting dreamland portraits. Create magical memories with whimsical backgrounds, fairy-tale themes, and playful scenarios perfect for young imaginations.',
    buttonText: 'Create Magic',
    imagePath: '/dreamland.png',
    imageAlt: 'Dreamland Kids portraits',
    packType: 'dreamland-kids',
    packPath: '/photoshoot-packs/4dreamland-kids-photos',
    features: [
      { icon: 'mdi', text: 'Magical themes & styles' },
      { icon: 'circul', text: 'Ready in minutes' },
      { icon: 'lock', text: 'Safe & secure' },
      { icon: 'tick', text: 'Family-friendly' }
    ]
  },
  'baby-doodles': {
    gradientTitle: 'Baby Doodles',
    normalTitle: 'Magical Baby Portraits',
    description: 'Transform your baby photos into adorable, whimsical doodle-style portraits. Perfect for nursery decorations, birth announcements, and precious memories.',
    buttonText: 'Create Baby Magic',
    imagePath: '/Packs/Types/doll.jpg',
    imageAlt: 'Baby Doodles Portraits',
    packType: 'baby-doodles',
    packPath: '/photoshoot-packs/baby-doodles-photos',
    features: [
      { icon: 'mdi', text: 'Adorable doodle styles' },
      { icon: 'circul', text: 'Ready in minutes' },
      { icon: 'lock', text: 'Safe & secure' },
      { icon: 'tick', text: 'Family-friendly' },
    ]
  },
  'birthday-magic': {
    gradientTitle: 'Birthday Magic',
    normalTitle: 'Celebrate in Style',
    description: 'Transform your photos into magical birthday celebrations. Perfect for invitations, party decorations, and capturing those special moments with enchanting effects.',
    buttonText: 'Create Birthday Magic',
    imagePath: '/Packs/Types/magic.jpg',
    imageAlt: 'Birthday Magic Portraits',
    packType: 'birthday-magic',
    packPath: '/photoshoot-packs/birthday-magic-photos',
    features: [
      { icon: 'mdi', text: 'Magical celebration styles' },
      { icon: 'circul', text: 'Ready in minutes' },
      { icon: 'lock', text: 'Safe & secure' },
      { icon: 'tick', text: 'Perfect for parties' },
    ]
  },
  'branding-photography': {
    gradientTitle: 'Personal Brand Photography',
    normalTitle: 'Stand Out & Shine',
    description: 'Elevate your personal brand with professional AI-powered photography. Create a consistent, powerful visual presence that reflects your unique professional identity.',
    buttonText: 'Build Your Brand',
    imagePath: '/Packs/Types/branded.jpg',
    imageAlt: 'Professional Branding Photography',
    packType: 'branding-photography',
    packPath: '/photoshoot-packs/branding-photography',
    features: [
      { icon: 'mdi', text: 'Professional styles' },
      { icon: 'circul', text: 'Quick turnaround' },
      { icon: 'lock', text: 'Brand consistency' },
      { icon: 'tick', text: 'Multiple variations' },
    ]
  },
  'casual-photos': {
    gradientTitle: 'Casual Photography',
    normalTitle: 'Natural & Approachable',
    description: 'Create relaxed, natural portraits that showcase your authentic self. Perfect for social media, personal branding, and casual professional needs.',
    buttonText: 'Get Natural Photos',
    imagePath: '/Packs/Types/casual.jpg',
    imageAlt: 'Casual Portrait Photography',
    packType: 'casual-photos',
    packPath: '/photoshoot-packs/casual-photos',
    features: [
      { icon: 'mdi', text: 'Natural styles' },
      { icon: 'circul', text: 'Quick results' },
      { icon: 'lock', text: 'Authentic look' },
      { icon: 'tick', text: 'Social-ready' },
    ]
  },
  'casual-collection': {
    gradientTitle: 'Casual Collection',
    normalTitle: 'Lifestyle Series',
    description: 'Create a diverse collection of casual, lifestyle portraits perfect for maintaining a consistent online presence across all your platforms.',
    buttonText: 'Start Your Collection',
    imagePath: '/Packs/Types/casual.jpg',
    imageAlt: 'Casual Collection Photography',
    packType: 'casual-collection',
    packPath: '/photoshoot-packs/casualcollection-photos',
    features: [
      { icon: 'mdi', text: 'Multiple styles' },
      { icon: 'circul', text: 'Quick series' },
      { icon: 'lock', text: 'Consistent look' },
      { icon: 'tick', text: 'Platform-ready' },
    ]
  },
  'cat-magic': {
    gradientTitle: 'Cat Magic',
    normalTitle: 'Enchanting Pet Portraits',
    description: 'Transform your cat photos into magical portraits that capture their unique personality and charm. Perfect for pet parents and social media.',
    buttonText: 'Create Pet Magic',
    imagePath: '/Packs/Types/cat.jpg',
    imageAlt: 'Cat Magic Photography',
    packType: 'cat-magic',
    packPath: '/photoshoot-packs/catmeowgic-photos',
    features: [
      { icon: 'mdi', text: 'Pet-perfect styles' },
      { icon: 'circul', text: 'Quick transform' },
      { icon: 'lock', text: 'Safe process' },
      { icon: 'tick', text: 'Magical results' },
    ]
  },
  'christmas-elf': {
    gradientTitle: 'Christmas Elf',
    normalTitle: 'Magical Holiday Portraits',
    description: 'Transform into a magical Christmas elf with our AI photography. Perfect for spreading holiday cheer and creating enchanting seasonal memories.',
    buttonText: 'Create Elf Magic',
    imagePath: '/Packs/Types/elf.jpg',
    imageAlt: 'Christmas Elf Portrait Photography',
    packType: 'christmas-elf',
    packPath: '/photoshoot-packs/christmas-elf-photos',
    features: [
      { icon: 'mdi', text: 'Elf magic styles' },
      { icon: 'circul', text: 'Quick transform' },
      { icon: 'lock', text: 'Holiday ready' },
      { icon: 'tick', text: 'Magical results' },
    ]
  },
  'christmas-sweater': {
    gradientTitle: 'Christmas Sweater',
    normalTitle: 'Festive Holiday Style',
    description: 'Create fun and festive Christmas sweater portraits that capture the joy of the season. Perfect for holiday cards and office parties.',
    buttonText: 'Get Festive',
    imagePath: '/Packs/Types/swetter.jpg',
    imageAlt: 'Christmas Sweater Portrait Photography',
    packType: 'christmas-sweater',
    packPath: '/photoshoot-packs/christmas-sweater-photos',
    features: [
      { icon: 'mdi', text: 'Festive styles' },
      { icon: 'circul', text: 'Quick results' },
      { icon: 'lock', text: 'Holiday ready' },
      { icon: 'tick', text: 'Fun designs' },
    ]
  },
  'family-christmas': {
    gradientTitle: 'Family Christmas',
    normalTitle: 'Magical Holiday Memories',
    description: 'Create enchanting family Christmas portraits that capture the magic of the season. Perfect for holiday cards and cherished family memories.',
    buttonText: 'Create Family Magic',
    imagePath: '/Packs/Types/cool.jpg',
    imageAlt: 'Family Christmas Portrait Photography',
    packType: 'family-christmas',
    packPath: '/photoshoot-packs/cool-family-christmas-photos',
    features: [
      { icon: 'mdi', text: 'Family styles' },
      { icon: 'circul', text: 'Quick results' },
      { icon: 'lock', text: 'Holiday perfect' },
      { icon: 'tick', text: 'Magical moments' },
    ]
  },
  'cyberpunk': {
    gradientTitle: 'Cyberpunk',
    normalTitle: 'Futuristic Portraits',
    description: 'Transform into a stunning cyberpunk character. Perfect for gaming profiles, sci-fi enthusiasts, and creating futuristic digital art.',
    buttonText: 'Get Cyberpunk',
    imagePath: '/Packs/Types/cyber.jpg',
    imageAlt: 'Cyberpunk Portrait Photography',
    packType: 'cyberpunk',
    packPath: '/photoshoot-packs/cyberpunk-photos',
    features: [
      { icon: 'mdi', text: 'Futuristic styles' },
      { icon: 'circul', text: 'Quick transform' },
      { icon: 'lock', text: 'High-tech look' },
      { icon: 'tick', text: 'Gaming ready' },
    ]
  },
  'hanukkah-miracle': {
    gradientTitle: 'Hanukkah Miracle',
    normalTitle: 'Festival of Lights',
    description: 'Create beautiful Hanukkah-themed portraits that capture the magic of the Festival of Lights. Perfect for holiday cards and family celebrations.',
    buttonText: 'Create Light',
    imagePath: '/Packs/Types/hakkuka.jpg',
    imageAlt: 'Hanukkah Miracle Photography',
    packType: 'hanukkah-miracle',
    packPath: '/photoshoot-packs/hanukka-miracle-photos',
    features: [
      { icon: 'mdi', text: 'Festival styles' },
      { icon: 'circul', text: 'Quick results' },
      { icon: 'lock', text: 'Holiday perfect' },
      { icon: 'tick', text: 'Magical light' },
    ]
  },
  'happy-kid': {
    gradientTitle: 'Happy Kid',
    normalTitle: 'Joyful Moments',
    description: 'Create delightful portraits of happy children that capture their pure joy and innocence. Perfect for family albums and precious memories.',
    buttonText: 'Capture Joy',
    imagePath: '/Packs/Types/happy.jpg',
    imageAlt: 'Happy Kid Photography',
    packType: 'happy-kid',
    packPath: '/photoshoot-packs/happy-kid-photos',
    features: [
      { icon: 'mdi', text: 'Playful styles' },
      { icon: 'circul', text: 'Quick photos' },
      { icon: 'lock', text: 'Kid-friendly' },
      { icon: 'tick', text: 'Joyful results' },
    ]
  },
  'influencer': {
    gradientTitle: 'Influencer',
    normalTitle: 'Social Media Ready',
    description: 'Create stunning influencer-style portraits that help you stand out on social media. Perfect for content creators and personal branding.',
    buttonText: 'Get Noticed',
    imagePath: '/Packs/Types/infulencer.jpg',
    imageAlt: 'Influencer Photography',
    packType: 'influencer',
    packPath: '/photoshoot-packs/influencer-photos',
    features: [
      { icon: 'mdi', text: 'Trendy styles' },
      { icon: 'circul', text: 'Quick content' },
      { icon: 'lock', text: 'Social ready' },
      { icon: 'tick', text: 'Stand out' },
    ]
  },
  'me-iconic': {
    gradientTitle: 'Me Iconic',
    normalTitle: 'Your Signature Style',
    description: 'Create your own iconic portrait style that makes you stand out. Perfect for personal branding and those wanting a unique visual identity.',
    buttonText: 'Be Iconic',
    imagePath: '/Packs/Types/me.jpg',
    imageAlt: 'Me Iconic Photography',
    packType: 'me-iconic',
    packPath: '/photoshoot-packs/me-iconic-photos',
    features: [
      { icon: 'mdi', text: 'Unique styles' },
      { icon: 'circul', text: 'Quick results' },
      { icon: 'lock', text: 'Your brand' },
      { icon: 'tick', text: 'Stand out' },
    ]
  },
  'merry-christmas': {
    gradientTitle: 'Merry Christmas',
    normalTitle: 'Holiday Magic',
    description: 'Create magical Christmas portraits that capture the joy and warmth of the holiday season. Perfect for cards and sharing festive memories.',
    buttonText: 'Spread Joy',
    imagePath: '/Packs/Types/merry.jpg',
    imageAlt: 'Merry Christmas Photography',
    packType: 'merry-christmas',
    packPath: '/photoshoot-packs/merry-christmas-photos',
    features: [
      { icon: 'mdi', text: 'Festive styles' },
      { icon: 'circul', text: 'Quick magic' },
      { icon: 'lock', text: 'Holiday ready' },
      { icon: 'tick', text: 'Joyful results' },
    ]
  },
  'playful-casual': {
    gradientTitle: 'Playful Casual',
    normalTitle: 'Fun Lifestyle Portraits',
    description: 'Create fun and natural casual portraits that show your playful side. Perfect for social media and personal branding.',
    buttonText: 'Get Playful',
    imagePath: '/Packs/Types/playful.jpg',
    imageAlt: 'Playful Casual Photography',
    packType: 'playful-casual',
    packPath: '/photoshoot-packs/playful-casual-photos',
    features: [
      { icon: 'mdi', text: 'Fun styles' },
      { icon: 'circul', text: 'Quick shots' },
      { icon: 'lock', text: 'Natural look' },
      { icon: 'tick', text: 'Playful vibe' },
    ]
  },
  'podcaster': {
    gradientTitle: 'Podcaster',
    normalTitle: 'Audio Creator Portraits',
    description: 'Create professional podcaster portraits that help build your audio brand. Perfect for show artwork and media kits.',
    buttonText: 'Start Recording',
    imagePath: '/Packs/Types/podcast.jpg',
    imageAlt: 'Podcaster Photography',
    packType: 'podcaster',
    packPath: '/photoshoot-packs/podcaster-photos',
    features: [
      { icon: 'mdi', text: 'Pro styles' },
      { icon: 'circul', text: 'Quick setup' },
      { icon: 'lock', text: 'Show ready' },
      { icon: 'tick', text: 'Brand perfect' },
    ]
  },
  'romantic-maternity': {
    gradientTitle: 'Romantic Maternity',
    normalTitle: 'Beautiful Pregnancy Portraits',
    description: 'Create beautiful and romantic maternity portraits that celebrate the magic of pregnancy. Perfect for capturing precious moments.',
    buttonText: 'Capture Magic',
    imagePath: '/Packs/Types/maternity.jpg',
    imageAlt: 'Romantic Maternity Photography',
    packType: 'romantic-maternity',
    packPath: '/photoshoot-packs/romantic-maternity-photos',
    features: [
      { icon: 'mdi', text: 'Romantic styles' },
      { icon: 'circul', text: 'Quick photos' },
      { icon: 'lock', text: 'Beautiful glow' },
      { icon: 'tick', text: 'Precious moments' },
    ]
  },
  'social-media': {
    gradientTitle: 'Social Media',
    normalTitle: 'Platform-Perfect Portraits',
    description: 'Create stunning portraits optimized for all social media platforms. Perfect for building a strong online presence.',
    buttonText: 'Get Social',
    imagePath: '/Packs/Types/social-media.jpg',
    imageAlt: 'Social Media Photography',
    packType: 'social-media',
    packPath: '/photoshoot-packs/social-media-photos',
    features: [
      { icon: 'mdi', text: 'Platform styles' },
      { icon: 'circul', text: 'Quick content' },
      { icon: 'lock', text: 'Social ready' },
      { icon: 'tick', text: 'Stand out' },
    ]
  },
  'time-machine': {
    gradientTitle: 'Time Machine',
    normalTitle: 'Historical Era Portraits',
    description: 'Travel through time with stunning historical portraits. Perfect for period-themed photos and exploring different eras.',
    buttonText: 'Travel Time',
    imagePath: '/Packs/Types/machin.jpg',
    imageAlt: 'Time Machine Photography',
    packType: 'time-machine',
    packPath: '/photoshoot-packs/time-machine-photos',
    features: [
      { icon: 'mdi', text: 'Era styles' },
      { icon: 'circul', text: 'Quick travel' },
      { icon: 'lock', text: 'Period look' },
      { icon: 'tick', text: 'Historical' },
    ]
  },
  'timeless-studio': {
    gradientTitle: 'Timeless Studio',
    normalTitle: 'Classic Professional Portraits',
    description: 'Create elegant studio portraits with a timeless appeal. Perfect for professional headshots and classic photography.',
    buttonText: 'Be Timeless',
    imagePath: '/Packs/Types/timeless.jpg',
    imageAlt: 'Timeless Studio Photography',
    packType: 'timeless-studio',
    packPath: '/photoshoot-packs/timeless-studio-photos',
    features: [
      { icon: 'mdi', text: 'Classic styles' },
      { icon: 'circul', text: 'Quick shots' },
      { icon: 'lock', text: 'Studio look' },
      { icon: 'tick', text: 'Professional' },
    ]
  },
  'tlv-fashion': {
    gradientTitle: 'Tel Aviv Fashion',
    normalTitle: 'Urban Style Portraits',
    description: 'Create stunning Tel Aviv-inspired fashion portraits. Perfect for capturing the vibrant, modern style of the city.',
    buttonText: 'Get Stylish',
    imagePath: '/Packs/Types/tlv.jpg',
    imageAlt: 'Tel Aviv Fashion Photography',
    packType: 'tlv-fashion',
    packPath: '/photoshoot-packs/TLV-fashion-photos',
    features: [
      { icon: 'mdi', text: 'Urban styles' },
      { icon: 'circul', text: 'Quick fashion' },
      { icon: 'lock', text: 'City vibe' },
      { icon: 'tick', text: 'Modern look' },
    ]
  },
  'wild-friends': {
    gradientTitle: 'Wild Friends',
    normalTitle: 'Pet and Animal Portraits',
    description: 'Create magical portraits with your pets and animal friends. Perfect for capturing the special bond with your furry companions.',
    buttonText: 'Get Wild',
    imagePath: '/Packs/Types/wild.jpg',
    imageAlt: 'Wild Friends Photography',
    packType: 'wild-friends',
    packPath: '/photoshoot-packs/wild-friends-photos',
    features: [
      { icon: 'mdi', text: 'Pet styles' },
      { icon: 'circul', text: 'Quick shots' },
      { icon: 'lock', text: 'Animal magic' },
      { icon: 'tick', text: 'Special bond' },
    ]
  },
  'winter-wonderland': {
    gradientTitle: 'Winter Wonderland',
    normalTitle: 'Magical Snow Portraits',
    description: 'Create enchanting winter wonderland portraits. Perfect for capturing the magic of the snowy season.',
    buttonText: 'Get Frosty',
    imagePath: '/Packs/Types/wonder.jpg',
    imageAlt: 'Winter Wonderland Photography',
    packType: 'winter-wonderland',
    packPath: '/photoshoot-packs/winter-wonderland-photos',
    features: [
      { icon: 'mdi', text: 'Winter styles' },
      { icon: 'circul', text: 'Quick magic' },
      { icon: 'lock', text: 'Snow scenes' },
      { icon: 'tick', text: 'Seasonal joy' },
    ]
  },
  'work-from-home': {
    gradientTitle: 'Work From Home',
    normalTitle: 'Remote Professional Portraits',
    description: 'Create professional work-from-home portraits. Perfect for remote workers and virtual meetings.',
    buttonText: 'Work Smart',
    imagePath: '/Packs/Types/WHF.jpg',
    imageAlt: 'Work From Home Photography',
    packType: 'work-from-home',
    packPath: '/photoshoot-packs/work-from-home-photos',
    features: [
      { icon: 'mdi', text: 'Home office' },
      { icon: 'circul', text: 'Quick setup' },
      { icon: 'lock', text: 'Pro look' },
      { icon: 'tick', text: 'Remote ready' },
    ]
  },
  'vintage-pack': {
    gradientTitle: 'Vintage Pack',
    normalTitle: 'Retro Style Portraits',
    description: 'Create beautiful vintage-style portraits. Perfect for retro aesthetics and classic throwback photos.',
    buttonText: 'Go Retro',
    imagePath: '/Packs/Types/vintage.jpg',
    imageAlt: 'Vintage Photography',
    packType: 'vintage-pack',
    packPath: '/photoshoot-packs/vintage-pack-photos',
    features: [
      { icon: 'mdi', text: 'Retro styles' },
      { icon: 'circul', text: 'Quick vintage' },
      { icon: 'lock', text: 'Classic look' },
      { icon: 'tick', text: 'Timeless' },
    ]
  }
}; 