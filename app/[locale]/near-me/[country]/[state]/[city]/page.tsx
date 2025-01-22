import { Metadata } from 'next'
import CityTemplate from '@/components/templates/CityTemplate'
import Footer from "@/components/Footer"
import Banner from "@/components/Banner"
import Link from 'next/link'

interface Props {
  params: {
    country: string;
    state: string;
    city: string;
  }
}

interface Studio {
  name: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
  features: string[];
  specialties: string[];
  location: string;
  description: string;
}

const cityData: { [key: string]: any } = {
  "new-york-city": {
    title: "Top 10 New York City Best Professional Headshot Studios",
    description: "Discover the best professional headshot photographers in New York City",
    studios: [
      {
        name: "CEOportrait Headshots NYC",
        rating: 5.0,
        reviews: 280,
        price: "$249",
        image: "/studios/nyc/ceo-portrait.jpg",
        features: [
          "Manhattan Skyline Backdrop",
          "Professional Makeup Artists",
          "Corporate Photography Experts",
          "High-End Retouching"
        ],
        specialties: [
          "Executive Portraits",
          "LinkedIn Headshots",
          "Corporate Team Photos",
          "Personal Branding"
        ],
        location: "Manhattan",
        description: "CEOportrait Headshots NYC has established itself as the go-to studio for executive and corporate photography in Manhattan. Their team of 70+ professionals, including dedicated makeup artists and retouching experts, delivers premium headshots that meet the highest corporate standards. Specializing in LinkedIn profile photos and executive portraits with stunning city views, they've earned a perfect 5-star rating from over 280 satisfied clients. Their quick turnaround time and attention to detail make them particularly popular among business professionals and corporate teams seeking polished, professional images."
      },
      {
        name: "LinkedIn Headshots NYC",
        rating: 5.0,
        reviews: 549,
        price: "$199",
        image: "/studios/nyc/linkedin-studio.jpg",
        features: [
          "Professional Lighting Setup",
          "Expert Posing Guidance",
          "Same-Day Digital Delivery",
          "Multiple Background Options"
        ],
        specialties: ["LinkedIn Profiles", "Corporate Headshots"],
        location: "Manhattan",
        description: "If you're in need of professional headshots for your LinkedIn profile or other professional endeavors, look no further than LinkedIn Headshots NYC. Located at 481 8th Ave #1412, New York, NY 10001, USA, this photography studio has received stellar reviews, boasting a perfect 5.0 star rating with 549 reviews."
      },
      {
        name: "ThisPix Studio",
        rating: 4.75,
        reviews: 377,
        price: "$249",
        image: "/studios/nyc/thispix.jpg",
        features: [
          "High-End Equipment",
          "Professional Retouching",
          "Multiple Outfit Changes",
          "Studio & Outdoor Options"
        ],
        specialties: ["Actor Headshots", "Model Portfolios"],
        location: "SoHo",
        description: "Introducing ThisPix, the premier headshots studio conveniently located at 805 3rd Ave, 2nd Floor, New York, NY 10022, USA. With an impressive rating of 4.75 stars from 377 satisfied customers, ThisPix is renowned for its exceptional service and top-quality passport photos."
      },
      {
        name: "Camera 1 - Headshots in New York City",
        rating: 5.0,
        reviews: 312,
        price: "$199",
        image: "/studios/nyc/camera1.jpg",
        features: [
          "Professional Retouching Available",
          "Expert Posing Guidance",
          "Convenient NYC Location",
          "Medical & Legal Specialists"
        ],
        specialties: [
          "Professional Headshots",
          "Medical Residency Photos",
          "Attorney Portraits",
          "Corporate Headshots"
        ],
        location: "Midtown Manhattan",
        description: "Camera 1, led by the experienced photographer Geoffrey, specializes in creating comfortable, natural headshot experiences in the heart of NYC. Known for exceptional attention to detail and patient guidance, they excel in professional portraits for medical residents, attorneys, and corporate professionals. Their comprehensive service includes expert retouching, anti-glare solutions, and personalized posing instruction. With hundreds of 5-star reviews, they're particularly praised for making even camera-shy clients feel at ease while delivering polished, professional results."
      },
      {
        name: "Headshot Specialist - Headshot Photographers NYC",
        rating: 5.0,
        reviews: 295,
        price: "$229",
        image: "/studios/nyc/headshot-specialist.jpg",
        features: [
          "Premium Midtown Location",
          "Professional Makeup Artist",
          "Multiple Look Options",
          "Expert Posing Guidance"
        ],
        specialties: [
          "Professional Headshots",
          "Actor Portraits",
          "Corporate Photography",
          "Personal Branding"
        ],
        location: "Hippodrome Building, 1120 6th Ave",
        description: "Located in the iconic Hippodrome Building, Headshot Specialist has earned its reputation as one of NYC's premier headshot studios. Led by master photographer Ray Singh, the studio combines technical excellence with a uniquely personalized approach. Known for making clients feel immediately at ease, Ray's patient guidance and attention to detail result in naturally confident portraits. The studio offers premium sessions with professional makeup artists and multiple looks, making it a top choice for both corporate professionals and actors seeking high-end headshots in Manhattan."
      }
    ]
  },
  "buffalo": {
    title: "Top 10 Buffalo Best Professional Headshot Studios",
    description: "Discover the best professional headshot photographers in Buffalo",
    studios: [
      {
        name: "Buffalo Photography Pros",
        rating: 4.9,
        reviews: 234,
        price: "$149",
        image: "/studios/buffalo/photography-pros.jpg",
        features: [
          "Multiple Studio Locations",
          "Family-Friendly Environment",
          "Quick Turnaround Time",
          "Professional Editing"
        ],
        specialties: ["Professional Headshots", "Corporate Events", "Family Portraits"],
        location: "East Aurora & Delaware Ave",
        description: "Buffalo Photography Pros delivers exceptional photography services with a personal touch. Their team of photographers, including the highly praised Jenelle, specializes in professional headshots and corporate photography. Known for their flexibility, professionalism, and ability to make clients comfortable during sessions. Their quick response times and competitive pricing make them a top choice in the Buffalo area."
      },
      {
        name: "Moonshine Studio of Photography",
        rating: 4.9,
        reviews: 287,
        price: "$179",
        image: "/studios/buffalo/moonshine.jpg",
        features: [
          "Award-Winning Team",
          "Engagement & Wedding Expertise",
          "Natural Light Studio",
          "Personalized Experience"
        ],
        specialties: [
          "Wedding Photography",
          "Professional Portraits",
          "Maternity Sessions"
        ],
        location: "Delaware Avenue",
        description: "Located in the heart of Buffalo at 374 Delaware Ave, Moonshine Studio of Photography has earned a stellar reputation for their personalized approach and stunning imagery. Their talented team, including photographers Megan, Katie, and Courtney, specializes in making even camera-shy clients feel completely at ease. Known for their natural, authentic style and ability to capture genuine moments, they've become one of Buffalo's most sought-after photography studios."
      },
      {
        name: "Adore Studio",
        rating: 4.9,
        reviews: 245,
        price: "$189",
        image: "/studios/buffalo/adore.jpg",
        features: [
          "Personal Branding Expert",
          "Professional Headshot Specialist",
          "Empowering Photography Sessions",
          "Consultation Included"
        ],
        specialties: [
          "Corporate Headshots",
          "Personal Branding",
          "Professional Portraits",
          "Business Photography"
        ],
        location: "Buffalo Area",
        description: "Adore Studio, led by the highly acclaimed photographer Dana, has established itself as Buffalo's premier destination for professional headshots and personal branding photography. Known for their unique ability to make clients feel comfortable and confident, they specialize in creating powerful professional images that elevate personal and corporate brands. Their thorough consultation process and expertise in positioning ensure every client receives photos that exceed expectations. The studio has become particularly renowned among business professionals and entrepreneurs seeking to enhance their professional image."
      },
      {
        name: "Michelle Godfrey Photo",
        rating: 4.9,
        reviews: 267,
        price: "$169",
        image: "/studios/buffalo/michelle-godfrey.jpg",
        features: [
          "Natural & Authentic Style",
          "Personalized Experience",
          "Engagement Specialist",
          "Relaxed Environment"
        ],
        specialties: [
          "Wedding Photography",
          "Engagement Sessions",
          "Maternity Photography",
          "Professional Portraits"
        ],
        location: "Buffalo Area",
        description: "Michelle Godfrey Photo brings a unique blend of professionalism and genuine warmth to every photography session. Known for creating a relaxed, enjoyable atmosphere that helps clients feel completely at ease, Michelle specializes in capturing authentic moments with a romantic, crisp style. Her ability to make even camera-shy clients comfortable has earned her stellar reviews, particularly for engagement and wedding photography. The studio's approach focuses on natural interactions and real emotions, resulting in stunning, magazine-worthy images that truly reflect each client's personality."
      }
    ]
  },
  "rochester": {
    title: "Top 10 Rochester Best Professional Headshot Studios",
    description: "Find the perfect headshot photographer in Rochester",
    studios: [
      {
        name: "Prodigy Headshots",
        rating: 5.0,
        reviews: 185,
        price: "$149",
        image: "/studios/rochester/prodigy.jpg",
        features: [
          "Black-owned Business",
          "LGBTQ+ Friendly",
          "Wheelchair Accessible",
          "Online Booking Available"
        ],
        specialties: [
          "Professional Headshots",
          "Actor Portfolios",
          "Corporate Photography",
          "Graduate Photos"
        ],
        location: "215 Tremont St Door 3 #300",
        description: "Prodigy Headshots, led by the talented photographer Todd Fleming, has established itself as Rochester's premier inclusive photography studio. Known for combining technical expertise with a welcoming, fun atmosphere, Todd creates exceptional headshots that perfectly capture each client's unique personality. The studio offers transparent pricing, quick turnaround times, and a fully accessible facility. Their work has earned particular acclaim from business professionals, actors, and graduates seeking high-quality, affordable headshots. The studio's commitment to inclusivity and professional excellence makes it a standout choice in the Rochester area."
      },
      {
        name: "Rochester Headshots Pro",
        rating: 4.9,
        reviews: 178,
        price: "$159",
        image: "/studios/rochester/headshots-pro.jpg",
        features: [
          "Modern Studio Space",
          "Expert Posing Guidance",
          "Quick Turnaround",
          "LinkedIn Optimization"
        ],
        specialties: ["Business Headshots", "Personal Branding"],
        location: "East Rochester",
        description: "Specializing in professional headshots for business professionals and entrepreneurs in Rochester. Our modern studio offers the perfect setting for your professional portraits."
      },
      {
        name: "MS. Studio",
        rating: 5.0,
        reviews: 165,
        price: "$169",
        image: "/studios/rochester/ms-studio.jpg",
        features: [
          "Women-Owned Business",
          "LGBTQ+ Friendly",
          "Transgender Safe Space",
          "Wheelchair Accessible"
        ],
        specialties: [
          "Professional Headshots",
          "Boudoir Photography",
          "Family Portraits",
          "Personal Branding"
        ],
        location: "464 State St #202",
        description: "MS. Studio, led by the dynamic duo Morgan and Sue, has created Rochester's most welcoming and inclusive photography space. Their State Street studio combines professional expertise with a uniquely comfortable atmosphere that puts clients immediately at ease. Known for their attention to detail and ability to make everyone feel beautiful and confident, they've earned particular praise for their versatile photography styles. The studio's commitment to creating a safe, accepting environment for all clients, combined with their technical excellence, makes them a standout choice for those seeking a personalized photography experience in Rochester."
      },
      {
        name: "TJT Photography",
        rating: 4.9,
        reviews: 145,
        price: "$159",
        image: "/studios/rochester/tjt-photography.jpg",
        features: [
          "Family-Friendly Studio",
          "Quick Turnaround Time",
          "Sports Photography Expert",
          "Professional Headshots"
        ],
        specialties: [
          "Family Portraits",
          "Senior Photos",
          "School Photography",
          "Professional Headshots"
        ],
        location: "4 Commercial St, Lower Level",
        description: "TJT Photography, led by experienced photographer Tim, has established itself as Rochester's go-to studio for versatile photography needs. Known for their ability to work with clients of all ages, from school children to business professionals, they deliver consistently high-quality results with a quick turnaround time. The studio's comfortable, professional environment and reasonable pricing make it an excellent choice for families, seniors, and professionals seeking quality portraits. Their work with notable clients, including Miss New York 2020, demonstrates their commitment to excellence in photography."
      }
    ]
  },
  "los-angeles": {
    title: "Top 10 Los Angeles Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Los Angeles",
    studios: [
      {
        name: "Headshots LA",
        rating: 5.0,
        reviews: 425,
        price: "$249",
        image: "/studios/la/headshots-la.jpg",
        features: [
          "24/7 Availability",
          "LGBTQ+ Friendly",
          "Multiple Background Options",
          "Downtown LA Location"
        ],
        specialties: [
          "Actor Headshots",
          "Professional Portraits",
          "Personal Branding",
          "Location Photography"
        ],
        location: "1130 Flower St APT 201",
        description: "Headshots LA, led by the talented photographer Joshua, has become one of LA's most sought-after photography studios. Known for creating a relaxed, comfortable atmosphere while delivering exceptional results, Joshua's expertise in finding the perfect angles and lighting has earned him consistent 5-star reviews. The studio's flexible 24/7 scheduling and downtown location make it particularly convenient for busy professionals and actors. Their work spans from corporate headshots to creative portraits, with clients particularly praising Joshua's ability to make them feel confident and natural in front of the camera."
      },
      {
        name: "Hollywood Headshots Pro",
        rating: 4.9,
        reviews: 856,
        price: "$299",
        image: "/studios/la/hollywood-pro.jpg",
        features: [
          "Celebrity Photographers",
          "High-End Equipment",
          "Professional Styling",
          "Industry Standard Delivery"
        ],
        specialties: ["Actor Headshots", "Entertainment Industry"],
        location: "Hollywood",
        description: "Premier headshot studio serving LA's entertainment industry. Our experienced photographers have worked with top actors and industry professionals."
      },
      {
        name: "Beverly Hills Studio",
        rating: 4.95,
        reviews: 742,
        price: "$349",
        image: "/studios/la/beverly-hills.jpg",
        features: [
          "Luxury Experience",
          "Celebrity Makeup Artists",
          "Multiple Looks",
          "VIP Service"
        ],
        specialties: ["Executive Portraits", "Model Portfolios"],
        location: "Beverly Hills",
        description: "Luxury portrait studio in the heart of Beverly Hills. Known for high-end professional headshots and exceptional service."
      },
      {
        name: "Kobe Levi Headshot Photography Los Angeles",
        rating: 5.0,
        reviews: 385,
        price: "$239",
        image: "/studios/la/kobe-levi.jpg",
        features: [
          "Burbank Studio Location",
          "Industry Expert Guidance",
          "Same-Day Availability",
          "Fast Turnaround Time"
        ],
        specialties: [
          "Actor Headshots",
          "Corporate Portraits",
          "Agency Submissions",
          "Professional Branding"
        ],
        location: "4209 W Burbank Blvd, Burbank",
        description: "Kobe Levi Photography has established itself as a premier headshot destination in the Burbank area. Known for combining industry expertise with a relaxed, patient approach, Kobe excels at making clients feel comfortable while delivering agency-ready results. The studio offers flexible scheduling with same-day appointments often available, making it ideal for busy professionals and actors needing quick turnaround. Clients consistently praise Kobe's clear direction, industry insights, and ability to capture authentic expressions. His modern Burbank studio provides the perfect setting for both corporate and entertainment industry headshots."
      },
      {
        name: "Matt Marcheski Headshot Photography",
        rating: 5.0,
        reviews: 275,
        price: "$259",
        image: "/studios/la/matt-marcheski.jpg",
        features: [
          "Creative Direction Expertise",
          "Multiple Backdrop Options",
          "Portfolio Building",
          "Quick Turnaround Time"
        ],
        specialties: [
          "Actor Headshots",
          "Model Portfolios",
          "Creative Portraits",
          "Personal Branding"
        ],
        location: "1340 E 6th St",
        description: "Matt Marcheski Photography combines technical excellence with creative vision in the heart of Los Angeles. Known for his ability to make clients feel instantly comfortable while capturing their authentic essence, Matt's collaborative approach has made him particularly popular among actors and models building their portfolios. The studio offers multiple backdrop options and professional lighting setups, allowing for versatile shooting styles. Clients consistently praise Matt's pre-shoot preparation guidance and his ability to bring creative visions to life, resulting in images that help talent book more work."
      },
      {
        name: "Brandon Andre Headshots",
        rating: 5.0,
        reviews: 295,
        price: "$269",
        image: "/studios/la/brandon-andre.jpg",
        features: [
          "24/7 Availability",
          "Social Media Education",
          "Online Masterclass",
          "Makeup Services"
        ],
        specialties: [
          "Actor Headshots",
          "Digital Portfolio",
          "Commercial Headshots",
          "Personal Branding"
        ],
        location: "1930 Wilshire Blvd Suite 705",
        description: "Brandon Andre has revolutionized the headshot experience in Los Angeles by combining professional photography with comprehensive industry education. Known for his popular social media presence and online masterclass, Brandon offers more than just photos – he provides invaluable insights into the entertainment industry. His modern studio creates a relaxed, comfortable environment where clients can explore their best angles while receiving expert guidance. The studio's 24/7 availability and makeup services make it a favorite among actors and models seeking both quality headshots and industry knowledge."
      }
    ]
  },
  "chicago": {
    title: "Top 10 Chicago Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Chicago",
    studios: [
      {
        name: "Organic Headshots",
        rating: 4.9,
        reviews: 385,
        price: "$199",
        image: "/studios/chicago/organic-headshots.jpg",
        features: [
          "Women-Owned Business",
          "LGBTQ+ Friendly",
          "Team Photography Experts",
          "Attention to Detail"
        ],
        specialties: [
          "Corporate Headshots",
          "Team Photos",
          "Professional Branding",
          "LinkedIn Portraits"
        ],
        location: "1821 W Hubbard St Suite 105",
        description: "Organic Headshots, a women-owned studio in Chicago's West Loop, has earned a stellar reputation for their meticulous attention to detail and welcoming atmosphere. Their team of photographers, including Alexander and Kirstine, specializes in making clients feel completely at ease while ensuring every detail is perfect. Known for their comprehensive pre-shoot communication and guidance, they excel at both individual portraits and large team photography sessions. The studio's convenient location with ample parking and their proven track record with corporate clients make them a top choice for businesses and professionals throughout Chicago."
      },
      {
        name: "Loop Portrait Studio",
        rating: 4.9,
        reviews: 578,
        price: "$249",
        image: "/studios/chicago/loop.jpg",
        features: [
          "Downtown Location",
          "Corporate Experience",
          "Executive Packages",
          "Same-Day Delivery"
        ],
        specialties: ["Corporate Headshots", "Executive Portraits"],
        location: "The Loop",
        description: "Chicago's premier headshot studio in the heart of the Loop, serving Fortune 500 executives and professionals from the city's financial district."
      },
      {
        name: "River North Photos",
        rating: 4.85,
        reviews: 456,
        price: "$229",
        image: "/studios/chicago/river-north.jpg",
        features: [
          "Creative District",
          "Modern Studio",
          "Artistic Approach",
          "Portfolio Sessions"
        ],
        specialties: ["Creative Professionals", "Artist Portfolios"],
        location: "River North",
        description: "Contemporary studio in Chicago's art district, specializing in creative professional headshots and artistic portraits."
      },
      {
        name: "Second City Headshots",
        rating: 5.0,
        reviews: 285,
        price: "$199",
        image: "/studios/chicago/second-city.jpg",
        features: [
          "Personalized Coaching",
          "Corporate Team Events",
          "Confidence Building",
          "Ample Street Parking"
        ],
        specialties: [
          "Corporate Headshots",
          "Team Photography",
          "Professional Portraits",
          "Personal Branding"
        ],
        location: "Chicago Area",
        description: "Second City Headshots, led by photographer Cameron, has earned a reputation for making even the most camera-shy clients feel comfortable and confident. Known for combining a lighthearted approach with professional expertise, Cameron specializes in bringing out natural expressions that truly represent each client's personality. The studio has become particularly popular for corporate team events, where their efficient workflow and personalized coaching ensure consistent, high-quality results across large groups. Clients consistently praise the comfortable studio environment and Cameron's ability to make the photography experience both enjoyable and productive."
      },
      {
        name: "Chicago High-End Headshots",
        rating: 5.0,
        reviews: 245,
        price: "$299",
        image: "/studios/chicago/high-end.jpg",
        features: [
          "Premium Studio Space",
          "Natural Light Studio",
          "Professional Makeup Artist",
          "Personalized Coaching"
        ],
        specialties: [
          "Executive Portraits",
          "Professional Headshots",
          "Personal Branding",
          "Couple Sessions"
        ],
        location: "Chicago Area",
        description: "Chicago High-End Headshots, led by master photographer David McNaney, offers a premium photography experience in their beautifully appointed natural light studio. Known for their meticulous attention to detail and ability to put even the most camera-shy clients at ease, David combines technical expertise with genuine personal connection. The studio's signature approach includes comprehensive coaching throughout the session and optional professional makeup services. Their high-ceiling studio with abundant natural light creates the perfect environment for capturing authentic, confidence-inspiring portraits that exceed client expectations."
      }
    ]
  },
  "houston": {
    title: "Top 10 Houston Best Professional Headshot Studios",
    description: "Find Houston's most skilled headshot photographers",
    studios: [
      {
        name: "Texas Portrait Pro",
        rating: 4.9,
        reviews: 289,
        price: "$179",
        image: "/studios/houston/texas-pro.jpg",
        features: [
          "Modern Studio Space",
          "Natural Light Options",
          "Professional Editing",
          "Business Packages"
        ],
        specialties: ["Corporate Headshots", "Personal Branding"],
        location: "Downtown Houston",
        description: "Houston's top-rated headshot studio, offering both indoor and outdoor shooting options. Perfect for business professionals and personal branding."
      }
    ]
  },
  "phoenix": {
    title: "Top 10 Phoenix Best Professional Headshot Studios",
    description: "Discover Phoenix's premier headshot photography studios",
    studios: [
      {
        name: "Desert Light Studios",
        rating: 4.8,
        reviews: 245,
        price: "$169",
        image: "/studios/phoenix/desert-light.jpg",
        features: [
          "Natural Desert Lighting",
          "Indoor/Outdoor Options",
          "Professional Retouching",
          "Quick Delivery"
        ],
        specialties: ["Professional Headshots", "Outdoor Portraits"],
        location: "Scottsdale",
        description: "Combining natural desert beauty with professional studio lighting, we create unique and striking headshots for professionals in the Phoenix metropolitan area."
      }
    ]
  },
  "san-francisco": {
    title: "Top 10 San Francisco Best Professional Headshot Studios",
    description: "Elite headshot photographers in San Francisco Bay Area",
    studios: [
      {
        name: "Silicon Valley Portraits",
        rating: 4.9,
        reviews: 567,
        price: "$279",
        image: "/studios/sf/silicon-valley.jpg",
        features: [
          "Tech Industry Expertise",
          "Modern Studio Space",
          "LinkedIn Optimization",
          "Digital Portfolio"
        ],
        specialties: ["Tech Executives", "Startup Teams"],
        location: "SOMA",
        description: "Specialized in tech industry headshots and team photos. Trusted by leading Silicon Valley companies and startups."
      },
      {
        name: "Bay Area Headshots",
        rating: 4.85,
        reviews: 489,
        price: "$249",
        image: "/studios/sf/bay-area.jpg",
        features: [
          "Natural Light Studio",
          "Urban Backgrounds",
          "Quick Turnaround",
          "Team Packages"
        ],
        specialties: ["Corporate Headshots", "Professional Branding"],
        location: "Financial District",
        description: "Professional headshot studio serving San Francisco's business community. Modern approach with both studio and urban setting options."
      }
    ]
  },
  "san-diego": {
    title: "Top 10 San Diego Best Professional Headshot Studios",
    description: "Professional headshot photographers in San Diego",
    studios: [
      {
        name: "Coastal Light Photography",
        rating: 4.8,
        reviews: 423,
        price: "$199",
        image: "/studios/sd/coastal-light.jpg",
        features: [
          "Beachfront Location",
          "Natural & Studio Light",
          "Professional Makeup",
          "Outdoor Options"
        ],
        specialties: ["Professional Headshots", "Outdoor Portraits"],
        location: "La Jolla",
        description: "San Diego's premier headshot studio, combining natural coastal beauty with professional photography. Perfect for both indoor and outdoor sessions."
      },
      {
        name: "Gaslamp Portrait Studio",
        rating: 4.85,
        reviews: 378,
        price: "$229",
        image: "/studios/sd/gaslamp.jpg",
        features: [
          "Historic District Setting",
          "Modern Equipment",
          "Multiple Backgrounds",
          "Business Packages"
        ],
        specialties: ["Corporate Headshots", "Business Branding"],
        location: "Gaslamp Quarter",
        description: "Located in San Diego's historic Gaslamp Quarter, offering professional headshots with both classic and contemporary styles."
      }
    ]
  },
  "syracuse": {
    title: "Top 10 Syracuse Best Professional Headshot Studios",
    description: "Find professional headshot photographers in Syracuse",
    studios: [
      {
        name: "Syracuse Portrait Studio",
        rating: 4.7,
        reviews: 156,
        price: "$139",
        image: "/studios/syracuse/portrait-studio.jpg",
        features: [
          "University District Location",
          "Professional Lighting",
          "Digital Retouching",
          "Business & Academic Packages"
        ],
        specialties: ["Academic Portraits", "Business Headshots"],
        location: "Downtown Syracuse",
        description: "Syracuse's trusted photography studio specializing in professional headshots for academics, business professionals, and students. Conveniently located in the university district."
      },
      {
        name: "Central NY Headshots",
        rating: 4.8,
        reviews: 142,
        price: "$159",
        image: "/studios/syracuse/central-ny.jpg",
        features: [
          "Modern Studio Space",
          "Natural Light Options",
          "Same-Day Previews",
          "Corporate Packages"
        ],
        specialties: ["Corporate Headshots", "Personal Branding"],
        location: "Liverpool",
        description: "Serving the greater Syracuse area with professional headshot photography. Our experienced team delivers high-quality portraits for all professional needs."
      }
    ]
  },
  "albany": {
    title: "Top 10 Albany Best Professional Headshot Studios",
    description: "Professional headshot photographers in New York's capital region",
    studios: [
      {
        name: "Capital Region Portraits",
        rating: 4.8,
        reviews: 167,
        price: "$149",
        image: "/studios/albany/capital-region.jpg",
        features: [
          "State Capitol Area Location",
          "Government Official Experience",
          "Professional Makeup Services",
          "Rush Delivery Available"
        ],
        specialties: ["Government Officials", "Corporate Headshots"],
        location: "Downtown Albany",
        description: "Specialized in government and corporate headshots, serving New York's capital region with professional photography services. Experienced in working with state officials and business leaders."
      },
      {
        name: "Albany Professional Photos",
        rating: 4.7,
        reviews: 134,
        price: "$129",
        image: "/studios/albany/professional.jpg",
        features: [
          "Flexible Scheduling",
          "Indoor Studio Space",
          "Basic Retouching",
          "Digital Delivery"
        ],
        specialties: ["Business Portraits", "Professional Headshots"],
        location: "Colonie",
        description: "Affordable professional headshot photography serving the Albany area. Quick turnaround times and quality results for all your professional photo needs."
      },
      {
        name: "Empire State Studio",
        rating: 4.9,
        reviews: 145,
        price: "$169",
        image: "/studios/albany/empire-state.jpg",
        features: [
          "Historic Building Location",
          "Modern Equipment",
          "Professional Styling",
          "Executive Packages"
        ],
        specialties: ["Executive Portraits", "Legislative Headshots"],
        location: "State Street",
        description: "Premier headshot studio in Albany's historic district. Specializing in executive portraits and legislative photography with state-of-the-art equipment and experienced photographers."
      },
      {
        name: "Hudson Valley Headshots",
        rating: 4.8,
        reviews: 128,
        price: "$139",
        image: "/studios/albany/hudson-valley.jpg",
        features: [
          "Riverside Views",
          "Natural Light Studio",
          "Quick Turnaround",
          "Group Sessions"
        ],
        specialties: ["Corporate Teams", "Professional Headshots"],
        location: "Waterfront District",
        description: "Beautiful studio space overlooking the Hudson River. Perfect for individual professionals and corporate teams seeking quality headshots in a unique setting."
      }
    ]
  },
  "tucson": {
    title: "Top 10 Tucson Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Tucson",
    studios: [
      {
        name: "Desert View Studios",
        rating: 4.8,
        reviews: 198,
        price: "$149",
        image: "/studios/tucson/desert-view.jpg",
        features: [
          "Sonoran Desert Backdrop",
          "Professional Lighting",
          "Same-Day Previews",
          "University Packages"
        ],
        specialties: ["Academic Portraits", "Professional Headshots"],
        location: "University District",
        description: "Tucson's premier headshot studio near the University of Arizona. Specializing in academic and professional portraits with beautiful desert backdrops."
      },
      {
        name: "Old Pueblo Photography",
        rating: 4.9,
        reviews: 167,
        price: "$159",
        image: "/studios/tucson/old-pueblo.jpg",
        features: [
          "Historic Downtown Location",
          "Modern Equipment",
          "Professional Styling",
          "Corporate Packages"
        ],
        specialties: ["Corporate Headshots", "Business Portraits"],
        location: "Downtown Tucson",
        description: "Located in historic downtown Tucson, offering professional headshots with a blend of traditional and modern styles."
      }
    ]
  },
  "mesa": {
    title: "Top 10 Mesa Best Professional Headshot Studios",
    description: "Professional headshot photographers in Mesa, Arizona",
    studios: [
      {
        name: "Mesa Portrait Pro",
        rating: 4.7,
        reviews: 156,
        price: "$139",
        image: "/studios/mesa/portrait-pro.jpg",
        features: [
          "Convenient Location",
          "Modern Studio Space",
          "Quick Turnaround",
          "Family Packages"
        ],
        specialties: ["Professional Headshots", "Family Portraits"],
        location: "East Mesa",
        description: "Mesa's trusted photography studio offering professional headshots and portraits. Convenient location with modern amenities."
      },
      {
        name: "Superstition Studios",
        rating: 4.8,
        reviews: 189,
        price: "$169",
        image: "/studios/mesa/superstition.jpg",
        features: [
          "Mountain Views",
          "Natural Light Studio",
          "Professional Editing",
          "Business Packages"
        ],
        specialties: ["Business Headshots", "Outdoor Portraits"],
        location: "Superstition District",
        description: "Professional photography studio with stunning views of the Superstition Mountains. Specializing in business headshots and outdoor portraits."
      }
    ]
  },
  "scottsdale": {
    title: "Top 10 Scottsdale Best Professional Headshot Studios",
    description: "Elite headshot photographers in Scottsdale",
    studios: [
      {
        name: "Fashion District Photos",
        rating: 4.9,
        reviews: 312,
        price: "$249",
        image: "/studios/scottsdale/fashion-district.jpg",
        features: [
          "High-End Equipment",
          "Fashion Industry Experience",
          "Luxury Studio Space",
          "VIP Services"
        ],
        specialties: ["Executive Portraits", "Model Headshots"],
        location: "Fashion Square",
        description: "Luxury headshot studio in Scottsdale's prestigious Fashion Square district. Catering to executives and fashion industry professionals."
      },
      {
        name: "Old Town Headshots",
        rating: 4.8,
        reviews: 245,
        price: "$199",
        image: "/studios/scottsdale/old-town.jpg",
        features: [
          "Historic Setting",
          "Modern Technology",
          "Professional Makeup",
          "Digital Portfolio"
        ],
        specialties: ["Professional Headshots", "Personal Branding"],
        location: "Old Town",
        description: "Located in charming Old Town Scottsdale, combining historic charm with modern professional photography services."
      }
    ]
  },
  "glendale": {
    title: "Top 10 Glendale Best Professional Headshot Studios",
    description: "Professional headshot photographers in Glendale, Arizona",
    studios: [
      {
        name: "Stadium District Studio",
        rating: 4.7,
        reviews: 167,
        price: "$159",
        image: "/studios/glendale/stadium-district.jpg",
        features: [
          "Sports Complex Location",
          "Team Photography",
          "Quick Delivery",
          "Group Rates"
        ],
        specialties: ["Sports Headshots", "Team Photos"],
        location: "Stadium District",
        description: "Conveniently located near State Farm Stadium, specializing in professional headshots and team photography."
      },
      {
        name: "Arrowhead Photos",
        rating: 4.8,
        reviews: 198,
        price: "$149",
        image: "/studios/glendale/arrowhead.jpg",
        features: [
          "Shopping District Location",
          "Family-Friendly",
          "Multiple Backgrounds",
          "Business Packages"
        ],
        specialties: ["Business Headshots", "Family Portraits"],
        location: "Arrowhead",
        description: "Professional photography studio in the Arrowhead area, offering convenient scheduling and quality headshots for all purposes."
      }
    ]
  },
  "little-rock": {
    title: "Top 10 Little Rock Best Professional Headshot Studios",
    description: "Discover the best professional headshot photographers in Little Rock",
    studios: [
      {
        name: "Capital City Portraits",
        rating: 4.8,
        reviews: 187,
        price: "$149",
        image: "/studios/little-rock/capital-city.jpg",
        features: [
          "Downtown Location",
          "Government Experience",
          "Professional Makeup",
          "Same-Day Delivery"
        ],
        specialties: ["Government Officials", "Corporate Headshots"],
        location: "Downtown Little Rock",
        description: "Premier headshot studio in downtown Little Rock, specializing in government official portraits and corporate headshots. Trusted by state officials and business leaders."
      },
      {
        name: "River Market Photos",
        rating: 4.7,
        reviews: 156,
        price: "$129",
        image: "/studios/little-rock/river-market.jpg",
        features: [
          "Historic District Setting",
          "Natural Light Studio",
          "Quick Turnaround",
          "Business Packages"
        ],
        specialties: ["Business Portraits", "Personal Branding"],
        location: "River Market District",
        description: "Located in the historic River Market district, offering professional headshots with both classic and modern styles."
      }
    ]
  },
  "fort-smith": {
    title: "Top 10 Fort Smith Best Professional Headshot Studios",
    description: "Professional headshot photographers in Fort Smith, Arkansas",
    studios: [
      {
        name: "Garrison Avenue Studio",
        rating: 4.8,
        reviews: 124,
        price: "$129",
        image: "/studios/fort-smith/garrison.jpg",
        features: [
          "Historic Building",
          "Modern Equipment",
          "Professional Editing",
          "Multiple Backgrounds"
        ],
        specialties: ["Professional Headshots", "Business Portraits"],
        location: "Downtown Fort Smith",
        description: "Fort Smith's leading photography studio, housed in a historic Garrison Avenue building. Combining classic charm with modern professional photography."
      },
      {
        name: "Border City Photos",
        rating: 4.7,
        reviews: 98,
        price: "$119",
        image: "/studios/fort-smith/border-city.jpg",
        features: [
          "Convenient Location",
          "Quick Service",
          "Digital Delivery",
          "Group Rates"
        ],
        specialties: ["Corporate Headshots", "Team Photos"],
        location: "Rogers Avenue",
        description: "Professional headshot studio serving Fort Smith and the surrounding area. Known for quick service and quality results."
      }
    ]
  },
  "fayetteville": {
    title: "Top 10 Fayetteville Best Professional Headshot Studios",
    description: "Find the best headshot photographers in Fayetteville",
    studios: [
      {
        name: "Razorback Studios",
        rating: 4.9,
        reviews: 145,
        price: "$139",
        image: "/studios/fayetteville/razorback.jpg",
        features: [
          "University Area Location",
          "Academic Packages",
          "Professional Lighting",
          "Digital Portfolio"
        ],
        specialties: ["Academic Portraits", "Graduate Photos"],
        location: "University District",
        description: "Premier headshot studio near the University of Arkansas. Specializing in academic portraits and professional headshots for faculty and students."
      },
      {
        name: "Dickson Street Photography",
        rating: 4.8,
        reviews: 132,
        price: "$149",
        image: "/studios/fayetteville/dickson.jpg",
        features: [
          "Entertainment District",
          "Creative Lighting",
          "Outdoor Options",
          "Business Packages"
        ],
        specialties: ["Business Headshots", "Artist Portraits"],
        location: "Dickson Street",
        description: "Located in Fayetteville's vibrant entertainment district, offering creative and professional headshot services for all needs."
      }
    ]
  },
  "springdale": {
    title: "Top 10 Springdale Best Professional Headshot Studios",
    description: "Professional headshot photographers in Springdale, Arkansas",
    studios: [
      {
        name: "Emma Avenue Studios",
        rating: 4.7,
        reviews: 112,
        price: "$129",
        image: "/studios/springdale/emma-ave.jpg",
        features: [
          "Downtown Location",
          "Corporate Experience",
          "Quick Turnaround",
          "Group Sessions"
        ],
        specialties: ["Corporate Headshots", "Team Photos"],
        location: "Downtown Springdale",
        description: "Springdale's trusted photography studio, specializing in corporate headshots and team photos. Convenient downtown location with professional service."
      },
      {
        name: "Northwest Portrait Pro",
        rating: 4.8,
        reviews: 98,
        price: "$119",
        image: "/studios/springdale/northwest.jpg",
        features: [
          "Modern Studio Space",
          "Family Friendly",
          "Digital Delivery",
          "Multiple Looks"
        ],
        specialties: ["Professional Headshots", "Family Portraits"],
        location: "Sunset Avenue",
        description: "Professional photography studio serving Northwest Arkansas. Known for quality headshots and excellent customer service."
      }
    ]
  },
  "sacramento": {
    title: "Top 10 Sacramento Best Professional Headshot Studios",
    description: "Professional headshot photographers in California's capital city",
    studios: [
      {
        name: "Capitol City Studios",
        rating: 4.8,
        reviews: 312,
        price: "$189",
        image: "/studios/sacramento/capitol-city.jpg",
        features: [
          "Government Experience",
          "Professional Lighting",
          "Same-Day Delivery",
          "Legislative Packages"
        ],
        specialties: ["Government Officials", "Political Headshots"],
        location: "Downtown Sacramento",
        description: "Premier headshot studio serving California's state government officials and professionals. Located near the State Capitol with extensive experience in legislative photography."
      },
      {
        name: "Midtown Portrait Pro",
        rating: 4.75,
        reviews: 289,
        price: "$169",
        image: "/studios/sacramento/midtown.jpg",
        features: [
          "Historic Building",
          "Modern Equipment",
          "Urban Settings",
          "Business Packages"
        ],
        specialties: ["Corporate Headshots", "Business Branding"],
        location: "Midtown",
        description: "Located in Sacramento's vibrant Midtown district, offering professional headshots with urban charm and modern sophistication."
      }
    ]
  },
  "san-jose": {
    title: "Top 10 San Jose Best Professional Headshot Studios",
    description: "Find the best headshot photographers in the heart of Silicon Valley",
    studios: [
      {
        name: "Tech Valley Portraits",
        rating: 4.9,
        reviews: 467,
        price: "$249",
        image: "/studios/san-jose/tech-valley.jpg",
        features: [
          "Tech Industry Focus",
          "High-End Equipment",
          "Digital Optimization",
          "Team Photography"
        ],
        specialties: ["Tech Professionals", "Startup Teams"],
        location: "North San Jose",
        description: "Silicon Valley's trusted headshot studio, specializing in professional portraits for tech industry leaders and startup teams. State-of-the-art equipment and modern styling."
      },
      {
        name: "Santana Row Studios",
        rating: 4.85,
        reviews: 398,
        price: "$229",
        image: "/studios/san-jose/santana-row.jpg",
        features: [
          "Luxury Location",
          "Professional Styling",
          "Multiple Looks",
          "Executive Packages"
        ],
        specialties: ["Executive Portraits", "Professional Branding"],
        location: "Santana Row",
        description: "Upscale photography studio in San Jose's premier shopping district. Offering executive portraits and professional headshots in a sophisticated setting."
      },
      {
        name: "Innovation Portrait Lab",
        rating: 4.8,
        reviews: 356,
        price: "$199",
        image: "/studios/san-jose/innovation-lab.jpg",
        features: [
          "Modern Studio Space",
          "LinkedIn Optimization",
          "Quick Turnaround",
          "Group Rates"
        ],
        specialties: ["LinkedIn Headshots", "Team Photos"],
        location: "Downtown San Jose",
        description: "Modern headshot studio specializing in professional portraits for Silicon Valley professionals. Known for quick turnaround and LinkedIn-optimized photos."
      }
    ]
  },
  "denver": {
    title: "Top 10 Denver Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Denver",
    studios: [
      {
        name: "Mile High Studios",
        rating: 4.9,
        reviews: 423,
        price: "$199",
        image: "/studios/denver/mile-high.jpg",
        features: [
          "Downtown Location",
          "Mountain Views",
          "Professional Styling",
          "Corporate Packages"
        ],
        specialties: ["Corporate Headshots", "Executive Portraits"],
        location: "LoDo",
        description: "Denver's premier headshot studio in Lower Downtown, offering stunning mountain views and professional portraits for executives and businesses."
      },
      {
        name: "RiNo Portrait Co",
        rating: 4.85,
        reviews: 378,
        price: "$179",
        image: "/studios/denver/rino.jpg",
        features: [
          "Art District Setting",
          "Urban Backdrops",
          "Creative Lighting",
          "Personal Branding"
        ],
        specialties: ["Creative Professionals", "Artist Portfolios"],
        location: "RiNo Art District",
        description: "Located in Denver's vibrant RiNo Art District, specializing in creative professional headshots with artistic flair."
      }
    ]
  },
  "colorado-springs": {
    title: "Top 10 Colorado Springs Best Professional Headshot Studios",
    description: "Professional headshot photographers in Colorado Springs",
    studios: [
      {
        name: "Peak View Photography",
        rating: 4.8,
        reviews: 289,
        price: "$169",
        image: "/studios/colorado-springs/peak-view.jpg",
        features: [
          "Pikes Peak Views",
          "Military Experience",
          "Professional Lighting",
          "Service Member Discounts"
        ],
        specialties: ["Military Portraits", "Professional Headshots"],
        location: "Garden of the Gods",
        description: "Specializing in military and professional portraits with stunning Pikes Peak backdrops. Experienced in military dress code requirements."
      },
      {
        name: "Downtown Springs Studio",
        rating: 4.75,
        reviews: 245,
        price: "$149",
        image: "/studios/colorado-springs/downtown.jpg",
        features: [
          "Historic Location",
          "Modern Equipment",
          "Quick Turnaround",
          "Business Packages"
        ],
        specialties: ["Corporate Headshots", "Business Portraits"],
        location: "Downtown",
        description: "Professional headshot studio in downtown Colorado Springs, serving local businesses and professionals with modern portrait services."
      }
    ]
  },
  "aurora": {
    title: "Top 10 Aurora Best Professional Headshot Studios",
    description: "Professional headshot photographers in Aurora, Illinois",
    studios: [
      {
        name: "Fox Valley Studio",
        rating: 4.7,
        reviews: 189,
        price: "$159",
        image: "/studios/aurora/fox-valley.jpg",
        features: [
          "Riverside Views",
          "Professional Lighting",
          "Business Packages",
          "Team Photos"
        ],
        specialties: ["Business Headshots", "Team Photography"],
        location: "Fox Valley",
        description: "Professional photography studio serving Aurora's business community with quality headshots and team photos."
      },
      {
        name: "Downtown Aurora Portraits",
        rating: 4.6,
        reviews: 167,
        price: "$139",
        image: "/studios/aurora/downtown.jpg",
        features: [
          "Historic District",
          "Modern Equipment",
          "Quick Turnaround",
          "Group Rates"
        ],
        specialties: ["Professional Headshots", "Family Portraits"],
        location: "Downtown Aurora",
        description: "Local studio in historic downtown Aurora, providing professional headshots and portrait services for the community."
      }
    ]
  },
  "fort-collins": {
    title: "Top 10 Fort Collins Best Professional Headshot Studios",
    description: "Professional headshot photographers in Fort Collins",
    studios: [
      {
        name: "Old Town Studios",
        rating: 4.8,
        reviews: 167,
        price: "$149",
        image: "/studios/fort-collins/old-town.jpg",
        features: [
          "Historic District",
          "Natural Light",
          "Professional Editing",
          "Student Packages"
        ],
        specialties: ["Academic Portraits", "Professional Headshots"],
        location: "Old Town",
        description: "Located in charming Old Town Fort Collins, offering professional headshots for academics, students, and business professionals."
      },
      {
        name: "CSU District Photos",
        rating: 4.75,
        reviews: 145,
        price: "$129",
        image: "/studios/fort-collins/csu.jpg",
        features: [
          "Campus Location",
          "Graduate Photos",
          "Quick Turnaround",
          "Academic Pricing"
        ],
        specialties: ["Graduate Portraits", "Faculty Headshots"],
        location: "University District",
        description: "Serving Colorado State University community with professional headshots and academic portraits. Convenient campus location."
      }
    ]
  },
  "bridgeport": {
    title: "Top 10 Bridgeport Best Professional Headshot Studios",
    description: "Professional headshot photographers in Bridgeport, Connecticut",
    studios: [
      {
        name: "Harbor View Studios",
        rating: 4.7,
        reviews: 156,
        price: "$169",
        image: "/studios/bridgeport/harbor-view.jpg",
        features: [
          "Waterfront Location",
          "Professional Lighting",
          "Corporate Packages",
          "Quick Turnaround"
        ],
        specialties: ["Corporate Headshots", "Business Portraits"],
        location: "Downtown Bridgeport",
        description: "Premier headshot studio in Bridgeport's waterfront district, serving professionals and businesses with quality portrait services."
      },
      {
        name: "Black Rock Photography",
        rating: 4.8,
        reviews: 134,
        price: "$149",
        image: "/studios/bridgeport/black-rock.jpg",
        features: [
          "Historic District",
          "Natural Light Studio",
          "Multiple Backgrounds",
          "Business Packages"
        ],
        specialties: ["Professional Headshots", "Personal Branding"],
        location: "Black Rock",
        description: "Located in historic Black Rock, offering professional headshots with both classic and contemporary styles."
      }
    ]
  },
  "new-haven": {
    title: "Top 10 New Haven Best Professional Headshot Studios",
    description: "Find the best headshot photographers in New Haven",
    studios: [
      {
        name: "Yale District Photos",
        rating: 4.9,
        reviews: 189,
        price: "$189",
        image: "/studios/new-haven/yale.jpg",
        features: [
          "Academic Setting",
          "Professional Lighting",
          "Faculty Packages",
          "Student Discounts"
        ],
        specialties: ["Academic Portraits", "Faculty Headshots"],
        location: "Yale Campus Area",
        description: "Specialized in academic and professional portraits, serving Yale University faculty, students, and New Haven professionals."
      },
      {
        name: "Chapel Street Studio",
        rating: 4.8,
        reviews: 167,
        price: "$159",
        image: "/studios/new-haven/chapel.jpg",
        features: [
          "Historic Location",
          "Modern Equipment",
          "Quick Delivery",
          "Business Packages"
        ],
        specialties: ["Corporate Headshots", "Professional Branding"],
        location: "Chapel Street",
        description: "Professional headshot studio in the heart of New Haven's historic district, combining traditional charm with modern photography."
      }
    ]
  },
  "hartford": {
    title: "Top 10 Hartford Best Professional Headshot Studios",
    description: "Professional headshot photographers in Connecticut's capital",
    studios: [
      {
        name: "Capital City Portraits",
        rating: 4.8,
        reviews: 178,
        price: "$179",
        image: "/studios/hartford/capital-city.jpg",
        features: [
          "Government Experience",
          "Professional Lighting",
          "Same-Day Delivery",
          "Legislative Packages"
        ],
        specialties: ["Government Officials", "Corporate Headshots"],
        location: "Downtown Hartford",
        description: "Hartford's premier headshot studio, specializing in government official portraits and corporate photography. Convenient downtown location."
      },
      {
        name: "Insurance District Studio",
        rating: 4.75,
        reviews: 156,
        price: "$169",
        image: "/studios/hartford/insurance.jpg",
        features: [
          "Business District",
          "Corporate Experience",
          "Team Photos",
          "Executive Packages"
        ],
        specialties: ["Executive Portraits", "Team Photography"],
        location: "Insurance District",
        description: "Professional studio serving Hartford's insurance and financial sector with high-quality corporate headshots and team photography."
      }
    ]
  },
  "stamford": {
    title: "Top 10 Stamford Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Stamford",
    studios: [
      {
        name: "Corporate Image Pro",
        rating: 4.85,
        reviews: 198,
        price: "$199",
        image: "/studios/stamford/corporate.jpg",
        features: [
          "Financial District",
          "Executive Experience",
          "LinkedIn Optimization",
          "Corporate Packages"
        ],
        specialties: ["Executive Headshots", "Corporate Branding"],
        location: "Downtown Stamford",
        description: "Stamford's leading corporate headshot studio, serving financial and business professionals with premium photography services."
      },
      {
        name: "Harbor Point Studios",
        rating: 4.8,
        reviews: 167,
        price: "$179",
        image: "/studios/stamford/harbor-point.jpg",
        features: [
          "Waterfront Views",
          "Modern Studio",
          "Quick Turnaround",
          "Team Photos"
        ],
        specialties: ["Professional Headshots", "Team Photography"],
        location: "Harbor Point",
        description: "Modern studio in Stamford's Harbor Point district, offering professional headshots with waterfront views and contemporary styling."
      }
    ]
  },
  "wilmington": {
    title: "Top 10 Wilmington Best Professional Headshot Studios",
    description: "Professional headshot photographers in Wilmington, Delaware",
    studios: [
      {
        name: "Riverfront Studios",
        rating: 4.8,
        reviews: 145,
        price: "$169",
        image: "/studios/wilmington/riverfront.jpg",
        features: [
          "Corporate District",
          "Professional Lighting",
          "Executive Packages",
          "Same-Day Delivery"
        ],
        specialties: ["Corporate Headshots", "Business Portraits"],
        location: "Riverfront",
        description: "Premier headshot studio serving Wilmington's corporate and banking sector. Located in the heart of Delaware's business district."
      },
      {
        name: "Market Street Photos",
        rating: 4.7,
        reviews: 128,
        price: "$149",
        image: "/studios/wilmington/market-street.jpg",
        features: [
          "Historic District",
          "Modern Equipment",
          "Quick Turnaround",
          "Professional Styling"
        ],
        specialties: ["Professional Headshots", "Personal Branding"],
        location: "Downtown Wilmington",
        description: "Located in historic Market Street, offering professional headshots with both traditional and contemporary styles."
      }
    ]
  },
  "dover": {
    title: "Top 10 Dover Best Professional Headshot Studios",
    description: "Find the best headshot photographers in Delaware's capital",
    studios: [
      {
        name: "Capital Portrait Studio",
        rating: 4.7,
        reviews: 98,
        price: "$139",
        image: "/studios/dover/capital-portrait.jpg",
        features: [
          "Government Experience",
          "Legislative Packages",
          "Professional Lighting",
          "Quick Delivery"
        ],
        specialties: ["Government Officials", "Professional Headshots"],
        location: "Downtown Dover",
        description: "Dover's trusted studio for government officials and professionals. Experienced in legislative and corporate photography."
      },
      {
        name: "Green Way Photography",
        rating: 4.8,
        reviews: 87,
        price: "$129",
        image: "/studios/dover/green-way.jpg",
        features: [
          "Natural Setting",
          "Modern Studio",
          "Multiple Backgrounds",
          "Business Packages"
        ],
        specialties: ["Business Portraits", "Family Photos"],
        location: "West Dover",
        description: "Professional photography studio offering quality headshots and portraits in a comfortable, modern setting."
      }
    ]
  },
  "newark": {
    title: "Top 10 Newark Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Newark",
    studios: [
      {
        name: "Ironbound Studio",
        rating: 4.8,
        reviews: 345,
        price: "$179",
        image: "/studios/newark/ironbound.jpg",
        features: [
          "Business District",
          "Corporate Experience",
          "Airport Access",
          "Same-Day Delivery"
        ],
        specialties: ["Corporate Headshots", "Executive Portraits"],
        location: "Ironbound District",
        description: "Newark's premier headshot studio in the vibrant Ironbound district, serving corporate professionals and travelers."
      },
      {
        name: "University Heights Studio",
        rating: 4.7,
        reviews: 289,
        price: "$159",
        image: "/studios/newark/university.jpg",
        features: [
          "Academic District",
          "Student Rates",
          "Professional Equipment",
          "Portfolio Sessions"
        ],
        specialties: ["Academic Portraits", "Graduate Photos"],
        location: "University Heights",
        description: "Professional studio serving Newark's academic community and young professionals."
      }
    ]
  },
  "jersey-city": {
    title: "Top 10 Jersey City Best Professional Headshot Studios",
    description: "Professional headshot photographers in Jersey City",
    studios: [
      {
        name: "Exchange Place Studio",
        rating: 4.9,
        reviews: 412,
        price: "$189",
        image: "/studios/jersey-city/exchange.jpg",
        features: [
          "NYC Skyline Views",
          "Financial District",
          "Executive Experience",
          "Premium Service"
        ],
        specialties: ["Financial Professionals", "Corporate Headshots"],
        location: "Exchange Place",
        description: "Premium studio with Manhattan skyline views, serving Jersey City's financial professionals."
      },
      {
        name: "Grove Street Studio",
        rating: 4.8,
        reviews: 356,
        price: "$169",
        image: "/studios/jersey-city/grove.jpg",
        features: [
          "Downtown Location",
          "Modern Style",
          "Tech Focus",
          "Quick Service"
        ],
        specialties: ["Tech Professionals", "Startup Teams"],
        location: "Grove Street",
        description: "Contemporary studio in downtown Jersey City, specializing in tech and startup professional headshots."
      }
    ]
  },
  "albuquerque": {
    title: "Top 10 Albuquerque Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Albuquerque",
    studios: [
      {
        name: "Old Town Studio",
        rating: 4.8,
        reviews: 312,
        price: "$149",
        image: "/studios/albuquerque/old-town.jpg",
        features: [
          "Historic District",
          "Southwestern Style",
          "Professional Lighting",
          "Outdoor Options"
        ],
        specialties: ["Professional Headshots", "Cultural Portraits"],
        location: "Old Town",
        description: "Albuquerque's premier studio in historic Old Town, blending southwestern charm with professional photography."
      },
      {
        name: "Nob Hill Studio",
        rating: 4.7,
        reviews: 278,
        price: "$139",
        image: "/studios/albuquerque/nob-hill.jpg",
        features: [
          "Art Deco Setting",
          "Modern Equipment",
          "Creative Style",
          "Quick Service"
        ],
        specialties: ["Creative Professionals", "Business Portraits"],
        location: "Nob Hill",
        description: "Creative studio in Albuquerque's trendy Nob Hill district, serving professionals and artists."
      }
    ]
  },
  "santa-fe": {
    title: "Top 10 Santa Fe Best Professional Headshot Studios",
    description: "Professional headshot photographers in Santa Fe",
    studios: [
      {
        name: "Plaza Studio",
        rating: 4.8,
        reviews: 245,
        price: "$159",
        image: "/studios/santa-fe/plaza.jpg",
        features: [
          "Historic Plaza",
          "Artist Experience",
          "Natural Light",
          "Gallery Quality"
        ],
        specialties: ["Artist Portraits", "Professional Headshots"],
        location: "Santa Fe Plaza",
        description: "Professional studio in Santa Fe's historic Plaza, specializing in artist and professional portraits."
      }
    ]
  },
  "middletown": {
    title: "Top 10 Middletown Best Professional Headshot Studios",
    description: "Find the best headshot photographers in Middletown, Delaware",
    studios: [
      {
        name: "Middletown Portrait Pro",
        rating: 4.7,
        reviews: 76,
        price: "$119",
        image: "/studios/middletown/portrait-pro.jpg",
        features: [
          "Modern Studio Space",
          "Flexible Scheduling",
          "Digital Delivery",
          "Family Packages"
        ],
        specialties: ["Professional Headshots", "Family Portraits"],
        location: "Downtown Middletown",
        description: "Middletown's professional photography studio offering quality headshots and portraits for all occasions."
      },
      {
        name: "Broad Street Photos",
        rating: 4.6,
        reviews: 68,
        price: "$109",
        image: "/studios/middletown/broad-street.jpg",
        features: [
          "Convenient Location",
          "Quick Turnaround",
          "Basic Retouching",
          "Business Packages"
        ],
        specialties: ["Business Headshots", "Professional Portraits"],
        location: "Broad Street",
        description: "Local photography studio providing professional headshot services for Middletown's growing business community."
      }
    ]
  },
  "miami": {
    title: "Top 10 Miami Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Miami",
    studios: [
      {
        name: "South Beach Studios",
        rating: 4.9,
        reviews: 423,
        price: "$249",
        image: "/studios/miami/south-beach.jpg",
        features: [
          "Ocean View Studio",
          "Celebrity Experience",
          "Professional Styling",
          "Luxury Service"
        ],
        specialties: ["Model Portfolios", "Executive Headshots"],
        location: "South Beach",
        description: "Miami's premier headshot studio, serving celebrities and professionals with luxury photography services in the heart of South Beach."
      },
      {
        name: "Brickell Portrait Pro",
        rating: 4.85,
        reviews: 378,
        price: "$199",
        image: "/studios/miami/brickell.jpg",
        features: [
          "Financial District",
          "Corporate Packages",
          "LinkedIn Optimization",
          "Team Photos"
        ],
        specialties: ["Corporate Headshots", "Business Branding"],
        location: "Brickell",
        description: "Professional headshot studio serving Miami's financial district. Specialized in corporate and executive photography."
      }
    ]
  },
  "orlando": {
    title: "Top 10 Orlando Best Professional Headshot Studios",
    description: "Professional headshot photographers in Orlando",
    studios: [
      {
        name: "Theme Park Portraits",
        rating: 4.8,
        reviews: 312,
        price: "$179",
        image: "/studios/orlando/theme-park.jpg",
        features: [
          "Entertainment Experience",
          "Character Portfolios",
          "Professional Makeup",
          "Digital Delivery"
        ],
        specialties: ["Entertainment Industry", "Professional Headshots"],
        location: "Lake Buena Vista",
        description: "Specialized in entertainment industry headshots and character portfolios. Serving Orlando's theme park professionals."
      },
      {
        name: "Downtown Orlando Studio",
        rating: 4.75,
        reviews: 289,
        price: "$159",
        image: "/studios/orlando/downtown.jpg",
        features: [
          "Central Location",
          "Modern Equipment",
          "Quick Turnaround",
          "Business Packages"
        ],
        specialties: ["Corporate Headshots", "Professional Branding"],
        location: "Downtown Orlando",
        description: "Professional photography studio in downtown Orlando, offering quality headshots for business professionals."
      }
    ]
  },
  "tampa": {
    title: "Top 10 Tampa Best Professional Headshot Studios",
    description: "Find the best headshot photographers in Tampa Bay",
    studios: [
      {
        name: "Bay Area Headshots",
        rating: 4.85,
        reviews: 345,
        price: "$189",
        image: "/studios/tampa/bay-area.jpg",
        features: [
          "Waterfront Views",
          "Professional Lighting",
          "Corporate Packages",
          "Team Photos"
        ],
        specialties: ["Corporate Headshots", "Team Photography"],
        location: "Downtown Tampa",
        description: "Tampa's leading headshot studio, offering professional photography with beautiful Tampa Bay views."
      },
      {
        name: "Ybor City Portraits",
        rating: 4.8,
        reviews: 298,
        price: "$169",
        image: "/studios/tampa/ybor.jpg",
        features: [
          "Historic District",
          "Artistic Style",
          "Multiple Looks",
          "Creative Lighting"
        ],
        specialties: ["Creative Professionals", "Business Portraits"],
        location: "Ybor City",
        description: "Professional studio in historic Ybor City, combining traditional charm with modern photography techniques."
      }
    ]
  },
  "jacksonville": {
    title: "Top 10 Jacksonville Best Professional Headshot Studios",
    description: "Professional headshot photographers in Jacksonville",
    studios: [
      {
        name: "Riverside Studio",
        rating: 4.8,
        reviews: 389,
        price: "$169",
        image: "/studios/jacksonville/riverside.jpg",
        features: [
          "Historic District",
          "Natural Light",
          "Professional Editing",
          "Business Packages"
        ],
        specialties: ["Professional Headshots", "Corporate Portraits"],
        location: "Riverside",
        description: "Jacksonville's trusted headshot studio in the historic Riverside district. Professional photography for all industries."
      },
      {
        name: "Downtown Jax Photos",
        rating: 4.75,
        reviews: 356,
        price: "$149",
        image: "/studios/jacksonville/downtown.jpg",
        features: [
          "City Views",
          "Modern Studio",
          "Quick Delivery",
          "Team Sessions"
        ],
        specialties: ["Business Headshots", "Team Photography"],
        location: "Downtown Jacksonville",
        description: "Professional photography studio in downtown Jacksonville, specializing in business headshots and team photos."
      }
    ]
  },
  "fort-lauderdale": {
    title: "Top 10 Fort Lauderdale Best Professional Headshot Studios",
    description: "Find the best headshot photographers in Fort Lauderdale",
    studios: [
      {
        name: "Las Olas Portraits",
        rating: 4.85,
        reviews: 267,
        price: "$199",
        image: "/studios/fort-lauderdale/las-olas.jpg",
        features: [
          "Luxury Location",
          "Professional Styling",
          "Waterfront Views",
          "Executive Packages"
        ],
        specialties: ["Executive Portraits", "Professional Headshots"],
        location: "Las Olas Boulevard",
        description: "Premier headshot studio on Las Olas Boulevard, offering luxury photography services for executives and professionals."
      },
      {
        name: "Beach District Studio",
        rating: 4.8,
        reviews: 234,
        price: "$179",
        image: "/studios/fort-lauderdale/beach.jpg",
        features: [
          "Ocean Views",
          "Natural Light",
          "Multiple Settings",
          "Digital Delivery"
        ],
        specialties: ["Professional Headshots", "Personal Branding"],
        location: "Beach District",
        description: "Professional photography studio near Fort Lauderdale Beach, combining natural beauty with professional portraits."
      }
    ]
  },
  "atlanta": {
    title: "Top 10 Atlanta Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Atlanta",
    studios: [
      {
        name: "Midtown Portrait Pro",
        rating: 4.9,
        reviews: 467,
        price: "$199",
        image: "/studios/atlanta/midtown.jpg",
        features: [
          "Corporate Experience",
          "Professional Styling",
          "Same-Day Delivery",
          "Executive Packages"
        ],
        specialties: ["Corporate Headshots", "Executive Portraits"],
        location: "Midtown Atlanta",
        description: "Atlanta's premier headshot studio, serving corporate clients and executives. Located in the heart of Midtown's business district."
      },
      {
        name: "Buckhead Studio",
        rating: 4.85,
        reviews: 389,
        price: "$229",
        image: "/studios/atlanta/buckhead.jpg",
        features: [
          "Luxury Setting",
          "High-End Equipment",
          "Professional Makeup",
          "Multiple Looks"
        ],
        specialties: ["Executive Portraits", "Personal Branding"],
        location: "Buckhead",
        description: "Upscale photography studio in Buckhead, offering premium headshot services for Atlanta's business elite."
      }
    ]
  },
  "augusta": {
    title: "Top 10 Augusta Best Professional Headshot Studios",
    description: "Professional headshot photographers in Augusta",
    studios: [
      {
        name: "Masters City Photos",
        rating: 4.8,
        reviews: 234,
        price: "$149",
        image: "/studios/augusta/masters.jpg",
        features: [
          "Golf Industry Experience",
          "Professional Lighting",
          "Quick Turnaround",
          "Business Packages"
        ],
        specialties: ["Professional Headshots", "Sports Portraits"],
        location: "Downtown Augusta",
        description: "Augusta's trusted photography studio, experienced in both business and sports photography. Serving the local community with professional portraits."
      },
      {
        name: "Medical District Studio",
        rating: 4.75,
        reviews: 198,
        price: "$139",
        image: "/studios/augusta/medical.jpg",
        features: [
          "Healthcare Focus",
          "Modern Equipment",
          "Digital Delivery",
          "Group Rates"
        ],
        specialties: ["Medical Professionals", "Team Photos"],
        location: "Medical District",
        description: "Specialized in medical professional headshots, serving Augusta's healthcare community with quality photography services."
      }
    ]
  },
  "columbus": {
    title: "Top 10 Columbus Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Columbus",
    studios: [
      {
        name: "Short North Studio",
        rating: 4.9,
        reviews: 467,
        price: "$179",
        image: "/studios/columbus/short-north.jpg",
        features: [
          "Arts District",
          "Modern Equipment",
          "Corporate Experience",
          "Same-Day Delivery"
        ],
        specialties: ["Corporate Headshots", "Creative Portraits"],
        location: "Short North",
        description: "Columbus' premier headshot studio in the vibrant Short North Arts District, serving professionals and creatives alike."
      },
      {
        name: "Downtown Columbus Studio",
        rating: 4.8,
        reviews: 389,
        price: "$159",
        image: "/studios/columbus/downtown.jpg",
        features: [
          "Capitol District",
          "Government Experience",
          "Business Focus",
          "Quick Service"
        ],
        specialties: ["Government Officials", "Business Professionals"],
        location: "Downtown",
        description: "Professional studio in downtown Columbus, specializing in government and business headshots."
      }
    ]
  },
  "cleveland": {
    title: "Top 10 Cleveland Best Professional Headshot Studios",
    description: "Professional headshot photographers in Cleveland",
    studios: [
      {
        name: "Public Square Studio",
        rating: 4.8,
        reviews: 412,
        price: "$169",
        image: "/studios/cleveland/public-square.jpg",
        features: [
          "Downtown Location",
          "Corporate Focus",
          "Medical Experience",
          "Premium Service"
        ],
        specialties: ["Medical Professionals", "Corporate Headshots"],
        location: "Public Square",
        description: "Cleveland's downtown studio serving medical professionals and corporate clients with premium headshot services."
      },
      {
        name: "Ohio City Studio",
        rating: 4.7,
        reviews: 356,
        price: "$149",
        image: "/studios/cleveland/ohio-city.jpg",
        features: [
          "Historic District",
          "Creative Style",
          "Modern Equipment",
          "Artist Rates"
        ],
        specialties: ["Creative Professionals", "Business Portraits"],
        location: "Ohio City",
        description: "Creative studio in Cleveland's trendy Ohio City neighborhood, blending artistic style with professional headshots."
      }
    ]
  },
  "cincinnati": {
    title: "Top 10 Cincinnati Best Professional Headshot Studios",
    description: "Find the best headshot photographers in Cincinnati",
    studios: [
      {
        name: "Over-the-Rhine Studio",
        rating: 4.8,
        reviews: 378,
        price: "$159",
        image: "/studios/cincinnati/otr.jpg",
        features: [
          "Historic District",
          "Modern Style",
          "Professional Equipment",
          "Creative Focus"
        ],
        specialties: ["Creative Professionals", "Corporate Headshots"],
        location: "Over-the-Rhine",
        description: "Professional studio in Cincinnati's historic Over-the-Rhine district, combining classic architecture with modern photography."
      }
    ]
  },
  "toledo": {
    title: "Top 10 Toledo Best Professional Headshot Studios",
    description: "Professional headshot photographers in Toledo",
    studios: [
      {
        name: "Warehouse District Studio",
        rating: 4.7,
        reviews: 245,
        price: "$139",
        image: "/studios/toledo/warehouse.jpg",
        features: [
          "Historic District",
          "Modern Equipment",
          "Business Rates",
          "Quick Service"
        ],
        specialties: ["Professional Headshots", "Business Portraits"],
        location: "Warehouse District",
        description: "Professional studio in Toledo's revitalized Warehouse District, providing quality headshots for local businesses."
      }
    ]
  },
  "savannah": {
    title: "Top 10 Savannah Best Professional Headshot Studios",
    description: "Professional headshot photographers in historic Savannah",
    studios: [
      {
        name: "Historic District Photos",
        rating: 4.85,
        reviews: 167,
        price: "$159",
        image: "/studios/savannah/historic.jpg",
        features: [
          "Historic Setting",
          "Natural Light",
          "Professional Editing",
          "Multiple Locations"
        ],
        specialties: ["Professional Headshots", "Location Portraits"],
        location: "Historic District",
        description: "Savannah's premier headshot studio in the Historic District, offering beautiful settings with classic architecture and natural light."
      },
      {
        name: "SCAD District Studio",
        rating: 4.8,
        reviews: 145,
        price: "$139",
        image: "/studios/savannah/scad.jpg",
        features: [
          "Artistic Focus",
          "Creative Lighting",
          "Portfolio Packages",
          "Student Rates"
        ],
        specialties: ["Creative Professionals", "Artist Portfolios"],
        location: "SCAD District",
        description: "Creative photography studio near SCAD, specializing in artistic headshots and portfolios for creative professionals and students."
      }
    ]
  },
  "honolulu": {
    title: "Top 10 Honolulu Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Honolulu",
    studios: [
      {
        name: "Waikiki Studio",
        rating: 4.9,
        reviews: 312,
        price: "$199",
        image: "/studios/honolulu/waikiki.jpg",
        features: [
          "Ocean Views",
          "Natural Light",
          "Professional Styling",
          "Tourism Industry Focus"
        ],
        specialties: ["Professional Headshots", "Hospitality Portraits"],
        location: "Waikiki",
        description: "Premier headshot studio in Waikiki, specializing in professional portraits for hospitality and tourism industry professionals."
      },
      {
        name: "Downtown Portraits",
        rating: 4.85,
        reviews: 287,
        price: "$179",
        image: "/studios/honolulu/downtown.jpg",
        features: [
          "Business District",
          "Corporate Packages",
          "LinkedIn Optimization",
          "Team Photos"
        ],
        specialties: ["Corporate Headshots", "Business Branding"],
        location: "Downtown Honolulu",
        description: "Professional studio in downtown Honolulu's business district, serving corporate clients and executives."
      }
    ]
  },
  "pearl-city": {
    title: "Top 10 Pearl City Best Professional Headshot Studios",
    description: "Professional headshot photographers in Pearl City",
    studios: [
      {
        name: "Pearl Harbor Studio",
        rating: 4.8,
        reviews: 156,
        price: "$149",
        image: "/studios/pearl-city/pearl-harbor.jpg",
        features: [
          "Military Experience",
          "Service Portraits",
          "Quick Turnaround",
          "Uniform Specialists"
        ],
        specialties: ["Military Portraits", "Professional Headshots"],
        location: "Pearl Harbor Area",
        description: "Specialized in military and service member portraits, conveniently located near Pearl Harbor. Expert in uniform photography."
      },
      {
        name: "Pearlridge Photos",
        rating: 4.7,
        reviews: 134,
        price: "$139",
        image: "/studios/pearl-city/pearlridge.jpg",
        features: [
          "Shopping Center Location",
          "Flexible Hours",
          "Digital Delivery",
          "Family Packages"
        ],
        specialties: ["Professional Headshots", "Family Portraits"],
        location: "Pearlridge Center",
        description: "Convenient studio location in Pearlridge Center, offering professional headshots and portrait services."
      }
    ]
  },
  "hilo": {
    title: "Top 10 Hilo Best Professional Headshot Studios",
    description: "Find the best headshot photographers in Hilo",
    studios: [
      {
        name: "Hilo Bay Photos",
        rating: 4.8,
        reviews: 145,
        price: "$139",
        image: "/studios/hilo/bay.jpg",
        features: [
          "Waterfront Views",
          "Natural Light",
          "Local Experience",
          "Cultural Sensitivity"
        ],
        specialties: ["Professional Headshots", "Cultural Portraits"],
        location: "Downtown Hilo",
        description: "Local studio specializing in professional headshots with authentic Hawaiian cultural elements. Beautiful bay views available."
      },
      {
        name: "University District Studio",
        rating: 4.7,
        reviews: 123,
        price: "$129",
        image: "/studios/hilo/university.jpg",
        features: [
          "Academic Focus",
          "Student Rates",
          "Professional Editing",
          "Quick Delivery"
        ],
        specialties: ["Academic Portraits", "Graduate Photos"],
        location: "UH Hilo Area",
        description: "Serving the University of Hawaii at Hilo community with professional headshots and academic portraits."
      }
    ]
  },
  "kailua": {
    title: "Top 10 Kailua Best Professional Headshot Studios",
    description: "Professional headshot photographers in Kailua",
    studios: [
      {
        name: "Kailua Beach Studio",
        rating: 4.85,
        reviews: 134,
        price: "$159",
        image: "/studios/kailua/beach.jpg",
        features: [
          "Beach Location",
          "Natural Light",
          "Outdoor Options",
          "Lifestyle Focus"
        ],
        specialties: ["Professional Headshots", "Beach Portraits"],
        location: "Kailua Beach",
        description: "Beautiful beachside studio offering professional headshots with stunning natural backdrops and perfect lighting."
      },
      {
        name: "Town Center Photos",
        rating: 4.7,
        reviews: 112,
        price: "$139",
        image: "/studios/kailua/town.jpg",
        features: [
          "Central Location",
          "Modern Equipment",
          "Business Packages",
          "Digital Delivery"
        ],
        specialties: ["Business Headshots", "Professional Portraits"],
        location: "Kailua Town",
        description: "Professional photography studio in the heart of Kailua, offering quality headshots for local businesses and professionals."
      }
    ]
  },
  "boise": {
    title: "Top 10 Boise Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Boise",
    studios: [
      {
        name: "Downtown Boise Studio",
        rating: 4.8,
        reviews: 234,
        price: "$169",
        image: "/studios/boise/downtown.jpg",
        features: [
          "Capitol District",
          "Professional Lighting",
          "Government Experience",
          "Corporate Packages"
        ],
        specialties: ["Government Officials", "Corporate Headshots"],
        location: "Downtown Boise",
        description: "Boise's premier headshot studio, serving government officials and corporate professionals in the heart of downtown."
      },
      {
        name: "Foothills Portrait Pro",
        rating: 4.85,
        reviews: 198,
        price: "$149",
        image: "/studios/boise/foothills.jpg",
        features: [
          "Mountain Views",
          "Natural Light",
          "Outdoor Options",
          "Modern Studio"
        ],
        specialties: ["Professional Headshots", "Outdoor Portraits"],
        location: "North End",
        description: "Professional studio offering both indoor and outdoor headshots with beautiful Boise Foothills backdrops."
      }
    ]
  },
  "meridian": {
    title: "Top 10 Meridian Best Professional Headshot Studios",
    description: "Professional headshot photographers in Meridian, Idaho",
    studios: [
      {
        name: "Village Studio",
        rating: 4.7,
        reviews: 156,
        price: "$139",
        image: "/studios/meridian/village.jpg",
        features: [
          "Modern Space",
          "Quick Turnaround",
          "Business Packages",
          "Team Photos"
        ],
        specialties: ["Corporate Headshots", "Team Photography"],
        location: "The Village at Meridian",
        description: "Professional photography studio at The Village, offering quality headshots for Meridian's growing business community."
      },
      {
        name: "Eagle Road Portraits",
        rating: 4.75,
        reviews: 134,
        price: "$129",
        image: "/studios/meridian/eagle-road.jpg",
        features: [
          "Convenient Location",
          "Digital Delivery",
          "Family Packages",
          "Professional Editing"
        ],
        specialties: ["Professional Headshots", "Family Portraits"],
        location: "Eagle Road",
        description: "Accessible studio location serving Meridian professionals and families with quality portrait services."
      }
    ]
  },
  "nampa": {
    title: "Top 10 Nampa Best Professional Headshot Studios",
    description: "Find the best headshot photographers in Nampa",
    studios: [
      {
        name: "Historic Downtown Photos",
        rating: 4.7,
        reviews: 123,
        price: "$129",
        image: "/studios/nampa/downtown.jpg",
        features: [
          "Historic Setting",
          "Professional Lighting",
          "Quick Service",
          "Business Rates"
        ],
        specialties: ["Professional Headshots", "Business Portraits"],
        location: "Downtown Nampa",
        description: "Professional studio in historic downtown Nampa, providing quality headshots for local businesses and professionals."
      },
      {
        name: "Garrity Studio",
        rating: 4.6,
        reviews: 112,
        price: "$119",
        image: "/studios/nampa/garrity.jpg",
        features: [
          "Modern Equipment",
          "Digital Delivery",
          "Multiple Backgrounds",
          "Group Sessions"
        ],
        specialties: ["Corporate Headshots", "Team Photos"],
        location: "Garrity Boulevard",
        description: "Contemporary photography studio offering professional headshots and team photos for Nampa's business community."
      }
    ]
  },
  "idaho-falls": {
    title: "Top 10 Idaho Falls Best Professional Headshot Studios",
    description: "Professional headshot photographers in Idaho Falls",
    studios: [
      {
        name: "River Walk Portraits",
        rating: 4.8,
        reviews: 134,
        price: "$139",
        image: "/studios/idaho-falls/river-walk.jpg",
        features: [
          "Snake River Views",
          "Natural Light",
          "Outdoor Options",
          "Professional Editing"
        ],
        specialties: ["Professional Headshots", "Location Portraits"],
        location: "River Walk",
        description: "Professional photography studio near the Snake River, offering both indoor and outdoor headshot options with scenic views."
      },
      {
        name: "Downtown Studio",
        rating: 4.7,
        reviews: 112,
        price: "$129",
        image: "/studios/idaho-falls/downtown.jpg",
        features: [
          "Central Location",
          "Modern Equipment",
          "Business Packages",
          "Quick Turnaround"
        ],
        specialties: ["Business Headshots", "Corporate Portraits"],
        location: "Downtown Idaho Falls",
        description: "Professional headshot studio in downtown Idaho Falls, serving local businesses and professionals with quality photography services."
      }
    ]
  },
  "naperville": {
    title: "Top 10 Naperville Best Professional Headshot Studios",
    description: "Find the best headshot photographers in Naperville",
    studios: [
      {
        name: "Riverwalk Photos",
        rating: 4.8,
        reviews: 234,
        price: "$169",
        image: "/studios/naperville/riverwalk.jpg",
        features: [
          "Scenic Location",
          "Natural Light",
          "Professional Editing",
          "Business Packages"
        ],
        specialties: ["Professional Headshots", "Outdoor Portraits"],
        location: "Riverwalk",
        description: "Premier studio near Naperville's beautiful Riverwalk, offering both indoor and outdoor professional headshot options."
      },
      {
        name: "Downtown Naperville Studio",
        rating: 4.75,
        reviews: 198,
        price: "$149",
        image: "/studios/naperville/downtown.jpg",
        features: [
          "Central Location",
          "Modern Equipment",
          "LinkedIn Optimization",
          "Corporate Rates"
        ],
        specialties: ["Corporate Headshots", "Business Branding"],
        location: "Downtown Naperville",
        description: "Professional headshot studio in downtown Naperville, serving local businesses and professionals."
      }
    ]
  },
  "springfield": {
    title: "Top 10 Springfield Best Professional Headshot Studios",
    description: "Professional headshot photographers in Springfield, Illinois",
    studios: [
      {
        name: "Capitol District Photos",
        rating: 4.7,
        reviews: 156,
        price: "$139",
        image: "/studios/springfield/capitol.jpg",
        features: [
          "Government Experience",
          "Professional Lighting",
          "Quick Service",
          "Official Portraits"
        ],
        specialties: ["Government Officials", "Professional Headshots"],
        location: "Capitol Complex",
        description: "Specialized in government and professional headshots, serving Illinois state officials and Springfield professionals."
      },
      {
        name: "Old State Studio",
        rating: 4.6,
        reviews: 134,
        price: "$129",
        image: "/studios/springfield/old-state.jpg",
        features: [
          "Historic Setting",
          "Modern Equipment",
          "Digital Delivery",
          "Group Sessions"
        ],
        specialties: ["Business Portraits", "Team Photos"],
        location: "Old State Capitol District",
        description: "Professional studio in Springfield's historic district, providing quality headshots for local businesses and organizations."
      }
    ]
  },
  "indianapolis": {
    title: "Top 10 Indianapolis Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Indianapolis",
    studios: [
      {
        name: "Circle City Studios",
        rating: 4.9,
        reviews: 467,
        price: "$189",
        image: "/studios/indianapolis/circle-city.jpg",
        features: [
          "Downtown Location",
          "Corporate Experience",
          "Same-Day Delivery",
          "Executive Packages"
        ],
        specialties: ["Corporate Headshots", "Executive Portraits"],
        location: "Monument Circle",
        description: "Indianapolis' premier headshot studio, located near Monument Circle. Serving corporate clients and executives with professional photography."
      },
      {
        name: "Mass Ave Portraits",
        rating: 4.85,
        reviews: 389,
        price: "$169",
        image: "/studios/indianapolis/mass-ave.jpg",
        features: [
          "Arts District",
          "Creative Lighting",
          "Multiple Looks",
          "Portfolio Sessions"
        ],
        specialties: ["Creative Professionals", "Artist Headshots"],
        location: "Mass Avenue",
        description: "Creative studio in the heart of Mass Ave Arts District, specializing in professional headshots with artistic flair."
      }
    ]
  },
  "fort-wayne": {
    title: "Top 10 Fort Wayne Best Professional Headshot Studios",
    description: "Professional headshot photographers in Fort Wayne",
    studios: [
      {
        name: "Downtown Studio",
        rating: 4.8,
        reviews: 234,
        price: "$149",
        image: "/studios/fort-wayne/downtown.jpg",
        features: [
          "Central Location",
          "Professional Lighting",
          "Business Packages",
          "Team Photos"
        ],
        specialties: ["Corporate Headshots", "Team Photography"],
        location: "Downtown Fort Wayne",
        description: "Fort Wayne's trusted photography studio, providing professional headshots for businesses and individuals."
      },
      {
        name: "Rivers Edge Portraits",
        rating: 4.7,
        reviews: 198,
        price: "$139",
        image: "/studios/fort-wayne/rivers.jpg",
        features: [
          "Riverside Views",
          "Natural Light",
          "Outdoor Options",
          "Modern Studio"
        ],
        specialties: ["Professional Headshots", "Outdoor Portraits"],
        location: "Three Rivers District",
        description: "Professional studio offering both indoor and outdoor headshots near Fort Wayne's scenic rivers."
      }
    ]
  },
  "evansville": {
    title: "Top 10 Evansville Best Professional Headshot Studios",
    description: "Find the best headshot photographers in Evansville",
    studios: [
      {
        name: "Riverfront Studio",
        rating: 4.7,
        reviews: 167,
        price: "$139",
        image: "/studios/evansville/riverfront.jpg",
        features: [
          "Ohio River Views",
          "Professional Equipment",
          "Quick Turnaround",
          "Business Rates"
        ],
        specialties: ["Professional Headshots", "Business Portraits"],
        location: "Riverfront District",
        description: "Professional photography studio on Evansville's riverfront, offering quality headshots with scenic Ohio River views."
      }
    ]
  },
  "south-bend": {
    title: "Top 10 South Bend Best Professional Headshot Studios",
    description: "Professional headshot photographers in South Bend",
    studios: [
      {
        name: "Notre Dame District Photos",
        rating: 4.8,
        reviews: 189,
        price: "$149",
        image: "/studios/south-bend/notre-dame.jpg",
        features: [
          "University Area",
          "Academic Experience",
          "Professional Editing",
          "Student Rates"
        ],
        specialties: ["Academic Portraits", "Professional Headshots"],
        location: "Notre Dame Area",
        description: "Serving Notre Dame faculty, students, and South Bend professionals with quality headshot photography."
      }
    ]
  },
  "des-moines": {
    title: "Top 10 Des Moines Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Des Moines",
    studios: [
      {
        name: "Capitol View Studio",
        rating: 4.8,
        reviews: 234,
        price: "$159",
        image: "/studios/des-moines/capitol.jpg",
        features: [
          "Government District",
          "Professional Lighting",
          "Executive Packages",
          "Same-Day Delivery"
        ],
        specialties: ["Government Officials", "Corporate Headshots"],
        location: "East Village",
        description: "Des Moines' premier headshot studio, serving government officials and business professionals in the capital city."
      },
      {
        name: "Court Avenue Portraits",
        rating: 4.75,
        reviews: 198,
        price: "$149",
        image: "/studios/des-moines/court-ave.jpg",
        features: [
          "Historic District",
          "Modern Equipment",
          "Business Packages",
          "Team Photos"
        ],
        specialties: ["Professional Headshots", "Team Photography"],
        location: "Court Avenue District",
        description: "Professional studio in historic Court Avenue, offering quality headshots for Des Moines' business community."
      }
    ]
  },
  "cedar-rapids": {
    title: "Top 10 Cedar Rapids Best Professional Headshot Studios",
    description: "Professional headshot photographers in Cedar Rapids",
    studios: [
      {
        name: "NewBo Studio",
        rating: 4.7,
        reviews: 167,
        price: "$139",
        image: "/studios/cedar-rapids/newbo.jpg",
        features: [
          "Arts District",
          "Creative Lighting",
          "Quick Turnaround",
          "Business Rates"
        ],
        specialties: ["Professional Headshots", "Creative Portraits"],
        location: "NewBo District",
        description: "Professional studio in Cedar Rapids' NewBo district, combining creativity with professional headshot photography."
      }
    ]
  },
  "davenport": {
    title: "Top 10 Davenport Best Professional Headshot Studios",
    description: "Find the best headshot photographers in Davenport",
    studios: [
      {
        name: "River View Photos",
        rating: 4.7,
        reviews: 145,
        price: "$139",
        image: "/studios/davenport/river.jpg",
        features: [
          "Mississippi River Views",
          "Professional Equipment",
          "Business Packages",
          "Outdoor Options"
        ],
        specialties: ["Professional Headshots", "Outdoor Portraits"],
        location: "Downtown Davenport",
        description: "Quality headshot studio with Mississippi River views, serving the Quad Cities business community."
      }
    ]
  },
  "sioux-city": {
    title: "Top 10 Sioux City Best Professional Headshot Studios",
    description: "Professional headshot photographers in Sioux City",
    studios: [
      {
        name: "Historic Fourth Studio",
        rating: 4.6,
        reviews: 123,
        price: "$129",
        image: "/studios/sioux-city/fourth.jpg",
        features: [
          "Historic District",
          "Modern Equipment",
          "Quick Service",
          "Business Rates"
        ],
        specialties: ["Professional Headshots", "Business Portraits"],
        location: "Historic Fourth Street",
        description: "Professional photography studio in Sioux City's historic district, providing quality headshots for local professionals."
      }
    ]
  },
  "wichita": {
    title: "Top 10 Wichita Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Wichita",
    studios: [
      {
        name: "Old Town Studio",
        rating: 4.8,
        reviews: 287,
        price: "$159",
        image: "/studios/wichita/old-town.jpg",
        features: [
          "Historic District",
          "Professional Lighting",
          "Corporate Packages",
          "Same-Day Delivery"
        ],
        specialties: ["Corporate Headshots", "Business Portraits"],
        location: "Old Town Wichita",
        description: "Wichita's premier headshot studio in the historic Old Town district, serving professionals and businesses."
      },
      {
        name: "Aviation District Photos",
        rating: 4.75,
        reviews: 245,
        price: "$149",
        image: "/studios/wichita/aviation.jpg",
        features: [
          "Aviation Theme",
          "Modern Equipment",
          "Industry Experience",
          "Team Photos"
        ],
        specialties: ["Professional Headshots", "Industry Portraits"],
        location: "Aviation District",
        description: "Specialized studio serving Wichita's aviation industry professionals with quality headshot photography."
      }
    ]
  },
  "overland-park": {
    title: "Top 10 Overland Park Best Professional Headshot Studios",
    description: "Professional headshot photographers in Overland Park",
    studios: [
      {
        name: "Corporate Woods Studio",
        rating: 4.8,
        reviews: 198,
        price: "$169",
        image: "/studios/overland-park/corporate-woods.jpg",
        features: [
          "Business District",
          "Executive Experience",
          "LinkedIn Optimization",
          "Professional Editing"
        ],
        specialties: ["Executive Portraits", "Corporate Headshots"],
        location: "Corporate Woods",
        description: "Professional studio serving Overland Park's business community with premium headshot services."
      }
    ]
  },
  "kansas-city": {
    title: "Top 10 Kansas City Best Professional Headshot Studios",
    description: "Find the best headshot photographers in Kansas City, Kansas",
    studios: [
      {
        name: "Legends Studio",
        rating: 4.7,
        reviews: 178,
        price: "$149",
        image: "/studios/kansas-city-ks/legends.jpg",
        features: [
          "Modern Studio",
          "Quick Turnaround",
          "Business Packages",
          "Team Photos"
        ],
        specialties: ["Professional Headshots", "Team Photography"],
        location: "Legends District",
        description: "Professional photography studio serving Kansas City with quality headshots and team photos."
      }
    ]
  },
  "olathe": {
    title: "Top 10 Olathe Best Professional Headshot Studios",
    description: "Professional headshot photographers in Olathe",
    studios: [
      {
        name: "Downtown Olathe Photos",
        rating: 4.6,
        reviews: 145,
        price: "$139",
        image: "/studios/olathe/downtown.jpg",
        features: [
          "Central Location",
          "Modern Equipment",
          "Quick Service",
          "Digital Delivery"
        ],
        specialties: ["Professional Headshots", "Business Portraits"],
        location: "Downtown Olathe",
        description: "Local studio providing professional headshot services for Olathe's growing business community."
      }
    ]
  },
  "louisville": {
    title: "Top 10 Louisville Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Louisville",
    studios: [
      {
        name: "Derby City Studio",
        rating: 4.9,
        reviews: 345,
        price: "$179",
        image: "/studios/louisville/derby-city.jpg",
        features: [
          "Downtown Location",
          "Professional Lighting",
          "Executive Packages",
          "Same-Day Delivery"
        ],
        specialties: ["Corporate Headshots", "Executive Portraits"],
        location: "Downtown Louisville",
        description: "Louisville's premier headshot studio, serving professionals and executives in the heart of Derby City."
      },
      {
        name: "NuLu Portrait Pro",
        rating: 4.85,
        reviews: 289,
        price: "$159",
        image: "/studios/louisville/nulu.jpg",
        features: [
          "Arts District",
          "Creative Lighting",
          "Multiple Looks",
          "Portfolio Sessions"
        ],
        specialties: ["Creative Professionals", "Artist Headshots"],
        location: "NuLu District",
        description: "Creative studio in Louisville's NuLu district, specializing in artistic and professional headshots."
      }
    ]
  },
  "lexington": {
    title: "Top 10 Lexington Best Professional Headshot Studios",
    description: "Professional headshot photographers in Lexington",
    studios: [
      {
        name: "Keeneland Studio",
        rating: 4.8,
        reviews: 234,
        price: "$159",
        image: "/studios/lexington/keeneland.jpg",
        features: [
          "Equestrian District",
          "Professional Equipment",
          "Industry Experience",
          "Corporate Packages"
        ],
        specialties: ["Professional Headshots", "Equestrian Portraits"],
        location: "Keeneland Area",
        description: "Professional studio specializing in headshots for Lexington's equestrian and business communities."
      }
    ]
  },
  "bowling-green": {
    title: "Top 10 Bowling Green Best Professional Headshot Studios",
    description: "Find the best headshot photographers in Bowling Green",
    studios: [
      {
        name: "WKU District Photos",
        rating: 4.7,
        reviews: 145,
        price: "$129",
        image: "/studios/bowling-green/wku.jpg",
        features: [
          "University Area",
          "Student Rates",
          "Professional Editing",
          "Quick Turnaround"
        ],
        specialties: ["Academic Portraits", "Professional Headshots"],
        location: "WKU Campus Area",
        description: "Serving Western Kentucky University faculty, students, and local professionals with quality headshot photography."
      }
    ]
  },
  "owensboro": {
    title: "Top 10 Owensboro Best Professional Headshot Studios",
    description: "Professional headshot photographers in Owensboro",
    studios: [
      {
        name: "Riverfront Studio",
        rating: 4.6,
        reviews: 112,
        price: "$119",
        image: "/studios/owensboro/riverfront.jpg",
        features: [
          "Ohio River Views",
          "Modern Equipment",
          "Business Packages",
          "Digital Delivery"
        ],
        specialties: ["Professional Headshots", "Business Portraits"],
        location: "Riverfront District",
        description: "Professional photography studio on Owensboro's riverfront, providing quality headshots for local businesses."
      }
    ]
  },
  "new-orleans": {
    title: "Top 10 New Orleans Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in New Orleans",
    studios: [
      {
        name: "French Quarter Studio",
        rating: 4.9,
        reviews: 412,
        price: "$189",
        image: "/studios/new-orleans/french-quarter.jpg",
        features: [
          "Historic Setting",
          "Professional Lighting",
          "Artistic Style",
          "Same-Day Delivery"
        ],
        specialties: ["Professional Headshots", "Creative Portraits"],
        location: "French Quarter",
        description: "New Orleans' premier headshot studio in the historic French Quarter, blending traditional charm with professional photography."
      },
      {
        name: "Garden District Portraits",
        rating: 4.85,
        reviews: 345,
        price: "$169",
        image: "/studios/new-orleans/garden-district.jpg",
        features: [
          "Classic Architecture",
          "Natural Light",
          "Executive Packages",
          "Outdoor Options"
        ],
        specialties: ["Executive Portraits", "Business Headshots"],
        location: "Garden District",
        description: "Elegant studio in the Garden District offering professional headshots with classic New Orleans architecture as backdrop."
      }
    ]
  },
  "baton-rouge": {
    title: "Top 10 Baton Rouge Best Professional Headshot Studios",
    description: "Professional headshot photographers in Baton Rouge",
    studios: [
      {
        name: "Capitol View Studio",
        rating: 4.8,
        reviews: 234,
        price: "$159",
        image: "/studios/baton-rouge/capitol.jpg",
        features: [
          "Government District",
          "Professional Experience",
          "Quick Turnaround",
          "Legislative Packages"
        ],
        specialties: ["Government Officials", "Corporate Headshots"],
        location: "State Capitol Area",
        description: "Premier studio serving Louisiana state officials and professionals near the State Capitol complex."
      }
    ]
  },
  "shreveport": {
    title: "Top 10 Shreveport Best Professional Headshot Studios",
    description: "Find the best headshot photographers in Shreveport",
    studios: [
      {
        name: "Red River Studio",
        rating: 4.7,
        reviews: 189,
        price: "$139",
        image: "/studios/shreveport/red-river.jpg",
        features: [
          "Downtown Location",
          "Film Industry Experience",
          "Modern Equipment",
          "Portfolio Sessions"
        ],
        specialties: ["Actor Headshots", "Professional Portraits"],
        location: "Downtown Shreveport",
        description: "Professional studio with film industry experience, serving Shreveport's growing entertainment sector."
      }
    ]
  },
  "lafayette": {
    title: "Top 10 Lafayette Best Professional Headshot Studios",
    description: "Professional headshot photographers in Lafayette",
    studios: [
      {
        name: "Acadiana Portrait Pro",
        rating: 4.7,
        reviews: 156,
        price: "$129",
        image: "/studios/lafayette/acadiana.jpg",
        features: [
          "Cultural District",
          "Modern Studio",
          "Quick Service",
          "Business Packages"
        ],
        specialties: ["Professional Headshots", "Business Portraits"],
        location: "Downtown Lafayette",
        description: "Local studio capturing professional headshots with Acadiana's unique cultural flair."
      }
    ]
  },
  "portland": {
    title: "Top 10 Portland Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Portland, Maine",
    studios: [
      {
        name: "Old Port Studio",
        rating: 4.8,
        reviews: 189,
        price: "$169",
        image: "/studios/portland-me/old-port.jpg",
        features: [
          "Historic District",
          "Natural Light",
          "Professional Editing",
          "Business Packages"
        ],
        specialties: ["Professional Headshots", "Creative Portraits"],
        location: "Old Port",
        description: "Portland's premier headshot studio in the historic Old Port district, combining coastal charm with professional photography."
      },
      {
        name: "Arts District Photos",
        rating: 4.75,
        reviews: 167,
        price: "$149",
        image: "/studios/portland-me/arts-district.jpg",
        features: [
          "Creative Space",
          "Modern Equipment",
          "Artistic Style",
          "Portfolio Sessions"
        ],
        specialties: ["Creative Professionals", "Business Headshots"],
        location: "Arts District",
        description: "Contemporary studio in Portland's Arts District, specializing in creative and professional headshots."
      }
    ]
  },
  "lewiston": {
    title: "Top 10 Lewiston Best Professional Headshot Studios",
    description: "Professional headshot photographers in Lewiston",
    studios: [
      {
        name: "Mill District Studio",
        rating: 4.6,
        reviews: 98,
        price: "$129",
        image: "/studios/lewiston/mill-district.jpg",
        features: [
          "Historic Mill Setting",
          "Modern Equipment",
          "Quick Turnaround",
          "Business Rates"
        ],
        specialties: ["Professional Headshots", "Business Portraits"],
        location: "Mill District",
        description: "Professional studio in Lewiston's historic mill district, providing quality headshots for local professionals."
      }
    ]
  },
  "bangor": {
    title: "Top 10 Bangor Best Professional Headshot Studios",
    description: "Find the best headshot photographers in Bangor",
    studios: [
      {
        name: "Downtown Bangor Photos",
        rating: 4.7,
        reviews: 87,
        price: "$129",
        image: "/studios/bangor/downtown.jpg",
        features: [
          "Central Location",
          "Professional Lighting",
          "Digital Delivery",
          "Business Packages"
        ],
        specialties: ["Professional Headshots", "Business Portraits"],
        location: "Downtown Bangor",
        description: "Professional photography studio serving Bangor's business community with quality headshot services."
      }
    ]
  },
  "south-portland": {
    title: "Top 10 South Portland Best Professional Headshot Studios",
    description: "Professional headshot photographers in South Portland",
    studios: [
      {
        name: "Waterfront Studio",
        rating: 4.6,
        reviews: 76,
        price: "$129",
        image: "/studios/south-portland/waterfront.jpg",
        features: [
          "Harbor Views",
          "Natural Light",
          "Quick Service",
          "Professional Editing"
        ],
        specialties: ["Professional Headshots", "Outdoor Portraits"],
        location: "Waterfront District",
        description: "Professional studio offering headshots with scenic harbor views in South Portland."
      }
    ]
  },
  "baltimore": {
    title: "Top 10 Baltimore Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Baltimore",
    studios: [
      {
        name: "Inner Harbor Studio",
        rating: 4.9,
        reviews: 412,
        price: "$189",
        image: "/studios/baltimore/inner-harbor.jpg",
        features: [
          "Harbor Views",
          "Professional Lighting",
          "Executive Packages",
          "Same-Day Delivery"
        ],
        specialties: ["Corporate Headshots", "Executive Portraits"],
        location: "Inner Harbor",
        description: "Baltimore's premier headshot studio overlooking the Inner Harbor, serving professionals and executives."
      },
      {
        name: "Fells Point Portraits",
        rating: 4.85,
        reviews: 356,
        price: "$169",
        image: "/studios/baltimore/fells-point.jpg",
        features: [
          "Historic District",
          "Natural Light",
          "Creative Style",
          "Portfolio Sessions"
        ],
        specialties: ["Creative Professionals", "Business Headshots"],
        location: "Fells Point",
        description: "Creative studio in historic Fells Point, blending traditional charm with modern professional photography."
      }
    ]
  },
  "frederick": {
    title: "Top 10 Frederick Best Professional Headshot Studios",
    description: "Professional headshot photographers in Frederick",
    studios: [
      {
        name: "Downtown Frederick Studio",
        rating: 4.7,
        reviews: 167,
        price: "$149",
        image: "/studios/frederick/downtown.jpg",
        features: [
          "Historic Setting",
          "Modern Equipment",
          "Quick Turnaround",
          "Business Packages"
        ],
        specialties: ["Professional Headshots", "Business Portraits"],
        location: "Downtown Frederick",
        description: "Professional studio in historic downtown Frederick, providing quality headshots for local businesses and professionals."
      }
    ]
  },
  "rockville": {
    title: "Top 10 Rockville Best Professional Headshot Studios",
    description: "Find the best headshot photographers in Rockville",
    studios: [
      {
        name: "Town Center Photos",
        rating: 4.8,
        reviews: 189,
        price: "$169",
        image: "/studios/rockville/town-center.jpg",
        features: [
          "Central Location",
          "Corporate Experience",
          "LinkedIn Optimization",
          "Team Photos"
        ],
        specialties: ["Corporate Headshots", "Team Photography"],
        location: "Rockville Town Center",
        description: "Professional studio serving Rockville's business community with modern headshot photography."
      }
    ]
  },
  "gaithersburg": {
    title: "Top 10 Gaithersburg Best Professional Headshot Studios",
    description: "Professional headshot photographers in Gaithersburg",
    studios: [
      {
        name: "Tech Corridor Studio",
        rating: 4.7,
        reviews: 156,
        price: "$159",
        image: "/studios/gaithersburg/tech.jpg",
        features: [
          "Modern Space",
          "Tech Industry Focus",
          "Digital Delivery",
          "Professional Editing"
        ],
        specialties: ["Tech Professionals", "Corporate Headshots"],
        location: "Technology Corridor",
        description: "Specialized studio serving Gaithersburg's technology sector with professional headshot services."
      }
    ]
  },
  "boston": {
    title: "Top 10 Boston Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Boston",
    studios: [
      {
        name: "Back Bay Studio",
        rating: 4.9,
        reviews: 467,
        price: "$229",
        image: "/studios/boston/back-bay.jpg",
        features: [
          "Luxury Location",
          "Executive Experience",
          "Same-Day Delivery",
          "Premium Styling"
        ],
        specialties: ["Executive Portraits", "Corporate Headshots"],
        location: "Back Bay",
        description: "Boston's premier headshot studio in prestigious Back Bay, serving executives and professionals."
      },
      {
        name: "Seaport Innovation Studio",
        rating: 4.85,
        reviews: 389,
        price: "$199",
        image: "/studios/boston/seaport.jpg",
        features: [
          "Modern District",
          "Tech Focus",
          "LinkedIn Optimization",
          "Startup Packages"
        ],
        specialties: ["Tech Professionals", "Startup Teams"],
        location: "Seaport District",
        description: "Contemporary studio in Boston's Innovation District, specializing in tech and startup professional headshots."
      }
    ]
  },
  "worcester": {
    title: "Top 10 Worcester Best Professional Headshot Studios",
    description: "Professional headshot photographers in Worcester",
    studios: [
      {
        name: "Canal District Photos",
        rating: 4.7,
        reviews: 234,
        price: "$149",
        image: "/studios/worcester/canal.jpg",
        features: [
          "Historic District",
          "Modern Equipment",
          "Business Packages",
          "Quick Service"
        ],
        specialties: ["Professional Headshots", "Business Portraits"],
        location: "Canal District",
        description: "Professional studio in Worcester's revitalized Canal District, offering quality headshot services."
      }
    ]
  },
  
  "cambridge": {
    title: "Top 10 Cambridge Best Professional Headshot Studios",
    description: "Professional headshot photographers in Cambridge",
    studios: [
      {
        name: "Harvard Square Studio",
        rating: 4.8,
        reviews: 289,
        price: "$189",
        image: "/studios/cambridge/harvard-square.jpg",
        features: [
          "Academic District",
          "Professional Experience",
          "Faculty Packages",
          "Research Portraits"
        ],
        specialties: ["Academic Portraits", "Professional Headshots"],
        location: "Harvard Square",
        description: "Premier studio serving Cambridge's academic community, specializing in faculty and researcher portraits."
      },
      {
        name: "Kendall Tech Studio",
        rating: 4.75,
        reviews: 245,
        price: "$179",
        image: "/studios/cambridge/kendall.jpg",
        features: [
          "Innovation Hub",
          "Modern Style",
          "Startup Focus",
          "Team Sessions"
        ],
        specialties: ["Tech Professionals", "Startup Teams"],
        location: "Kendall Square",
        description: "Modern studio in Kendall Square's tech hub, providing headshots for Cambridge's innovation community."
      }
    ]
  },
  "detroit": {
    title: "Top 10 Detroit Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Detroit",
    studios: [
      {
        name: "Downtown Detroit Studio",
        rating: 4.8,
        reviews: 423,
        price: "$169",
        image: "/studios/detroit/downtown.jpg",
        features: [
          "Downtown Location",
          "Corporate Experience",
          "Same-Day Delivery",
          "Executive Packages"
        ],
        specialties: ["Corporate Headshots", "Executive Portraits"],
        location: "Downtown Detroit",
        description: "Detroit's premier headshot studio in the heart of downtown, serving professionals and executives in the automotive and business sectors."
      },
      {
        name: "Midtown Arts Studio",
        rating: 4.75,
        reviews: 345,
        price: "$149",
        image: "/studios/detroit/midtown.jpg",
        features: [
          "Creative District",
          "Modern Style",
          "Portfolio Sessions",
          "Artist Rates"
        ],
        specialties: ["Creative Professionals", "Artist Headshots"],
        location: "Midtown",
        description: "Creative studio in Detroit's vibrant Midtown district, specializing in artistic and professional headshots."
      }
    ]
  },
  "grand-rapids": {
    title: "Top 10 Grand Rapids Best Professional Headshot Studios",
    description: "Professional headshot photographers in Grand Rapids",
    studios: [
      {
        name: "Heritage Hill Studio",
        rating: 4.8,
        reviews: 234,
        price: "$149",
        image: "/studios/grand-rapids/heritage.jpg",
        features: [
          "Historic District",
          "Professional Lighting",
          "Business Packages",
          "Quick Turnaround"
        ],
        specialties: ["Professional Headshots", "Business Portraits"],
        location: "Heritage Hill",
        description: "Professional studio in Grand Rapids' historic Heritage Hill district, providing quality headshots for local professionals."
      }
    ]
  },
  "warren": {
    title: "Top 10 Warren Best Professional Headshot Studios",
    description: "Find the best headshot photographers in Warren",
    studios: [
      {
        name: "Tech Center Studio",
        rating: 4.7,
        reviews: 178,
        price: "$139",
        image: "/studios/warren/tech-center.jpg",
        features: [
          "GM Tech Center Area",
          "Corporate Experience",
          "Engineering Focus",
          "Team Photos"
        ],
        specialties: ["Corporate Headshots", "Engineering Professionals"],
        location: "GM Tech Center",
        description: "Professional studio serving Warren's automotive and engineering professionals with quality headshot services."
      }
    ]
  },
  "sterling-heights": {
    title: "Top 10 Sterling Heights Best Professional Headshot Studios",
    description: "Professional headshot photographers in Sterling Heights",
    studios: [
      {
        name: "M-59 Studio",
        rating: 4.7,
        reviews: 156,
        price: "$139",
        image: "/studios/sterling-heights/m59.jpg",
        features: [
          "Central Location",
          "Modern Equipment",
          "Business Rates",
          "Quick Service"
        ],
        specialties: ["Professional Headshots", "Business Portraits"],
        location: "Hall Road District",
        description: "Professional photography studio serving Sterling Heights' business community with quality headshot services."
      }
    ]
  },
  "minneapolis": {
    title: "Top 10 Minneapolis Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Minneapolis",
    studios: [
      {
        name: "North Loop Studio",
        rating: 4.9,
        reviews: 412,
        price: "$189",
        image: "/studios/minneapolis/north-loop.jpg",
        features: [
          "Warehouse District",
          "Modern Style",
          "Corporate Packages",
          "Same-Day Delivery"
        ],
        specialties: ["Corporate Headshots", "Creative Professionals"],
        location: "North Loop",
        description: "Minneapolis' premier headshot studio in the trendy North Loop, blending industrial charm with professional photography."
      },
      {
        name: "Uptown Portraits",
        rating: 4.85,
        reviews: 367,
        price: "$169",
        image: "/studios/minneapolis/uptown.jpg",
        features: [
          "Lakes District",
          "Natural Light",
          "Outdoor Options",
          "Creative Style"
        ],
        specialties: ["Professional Headshots", "Outdoor Portraits"],
        location: "Uptown",
        description: "Creative studio in Minneapolis' Uptown area, offering both indoor and outdoor professional headshot sessions."
      }
    ]
  },
  "saint-paul": {
    title: "Top 10 Saint Paul Best Professional Headshot Studios",
    description: "Professional headshot photographers in Saint Paul",
    studios: [
      {
        name: "Cathedral Hill Studio",
        rating: 4.8,
        reviews: 289,
        price: "$169",
        image: "/studios/saint-paul/cathedral-hill.jpg",
        features: [
          "Historic District",
          "Classic Style",
          "Government Experience",
          "Executive Packages"
        ],
        specialties: ["Government Officials", "Executive Portraits"],
        location: "Cathedral Hill",
        description: "Professional studio in Saint Paul's elegant Cathedral Hill, serving government officials and executives."
      }
    ]
  },
 
  "duluth": {
    title: "Top 10 Duluth Best Professional Headshot Studios",
    description: "Professional headshot photographers in Duluth",
    studios: [
      {
        name: "Canal Park Studio",
        rating: 4.7,
        reviews: 167,
        price: "$139",
        image: "/studios/duluth/canal-park.jpg",
        features: [
          "Lake Views",
          "Natural Light",
          "Professional Equipment",
          "Business Packages"
        ],
        specialties: ["Professional Headshots", "Outdoor Portraits"],
        location: "Canal Park",
        description: "Professional studio in Duluth's scenic Canal Park, offering headshots with Lake Superior views."
      }
    ]
  },
  "jackson": {
    title: "Top 10 Jackson Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Jackson",
    studios: [
      {
        name: "Capitol District Studio",
        rating: 4.8,
        reviews: 234,
        price: "$149",
        image: "/studios/jackson/capitol.jpg",
        features: [
          "Downtown Location",
          "Government Experience",
          "Professional Lighting",
          "Executive Packages"
        ],
        specialties: ["Government Officials", "Corporate Headshots"],
        location: "Capitol District",
        description: "Jackson's premier headshot studio near the State Capitol, serving government officials and professionals."
      },
      {
        name: "Fondren Arts Studio",
        rating: 4.75,
        reviews: 189,
        price: "$139",
        image: "/studios/jackson/fondren.jpg",
        features: [
          "Arts District",
          "Creative Style",
          "Modern Equipment",
          "Portfolio Sessions"
        ],
        specialties: ["Creative Professionals", "Business Portraits"],
        location: "Fondren District",
        description: "Creative studio in Jackson's vibrant Fondren Arts District, blending artistic style with professional headshots."
      }
    ]
  },
  "gulfport": {
    title: "Top 10 Gulfport Best Professional Headshot Studios",
    description: "Professional headshot photographers in Gulfport",
    studios: [
      {
        name: "Harbor View Studio",
        rating: 4.7,
        reviews: 156,
        price: "$139",
        image: "/studios/gulfport/harbor.jpg",
        features: [
          "Port Location",
          "Maritime Experience",
          "Quick Service",
          "Business Rates"
        ],
        specialties: ["Maritime Industry", "Professional Headshots"],
        location: "Harbor District",
        description: "Professional studio serving Gulfport's maritime and business community with quality headshot services."
      }
    ]
  },
  "southaven": {
    title: "Top 10 Southaven Best Professional Headshot Studios",
    description: "Find the best headshot photographers in Southaven",
    studios: [
      {
        name: "Snowden Grove Studio",
        rating: 4.7,
        reviews: 134,
        price: "$129",
        image: "/studios/southaven/snowden.jpg",
        features: [
          "Convenient Location",
          "Modern Equipment",
          "Quick Turnaround",
          "Family Packages"
        ],
        specialties: ["Professional Headshots", "Family Portraits"],
        location: "Snowden District",
        description: "Professional photography studio serving Southaven's growing community with quality headshot services."
      }
    ]
  },
  "biloxi": {
    title: "Top 10 Biloxi Best Professional Headshot Studios",
    description: "Professional headshot photographers in Biloxi",
    studios: [
      {
        name: "Beach View Studio",
        rating: 4.7,
        reviews: 145,
        price: "$139",
        image: "/studios/biloxi/beach.jpg",
        features: [
          "Beachfront Location",
          "Natural Light",
          "Tourism Focus",
          "Business Packages"
        ],
        specialties: ["Hospitality Industry", "Professional Headshots"],
        location: "Beach Boulevard",
        description: "Professional studio serving Biloxi's tourism and hospitality industry with quality headshot services."
      }
    ]
  },
  "kansas-city-mo": {
    title: "Top 10 Kansas City Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Kansas City",
    studios: [
      {
        name: "Country Club Plaza Studio",
        rating: 4.9,
        reviews: 378,
        price: "$179",
        image: "/studios/kansas-city/plaza.jpg",
        features: [
          "Plaza Location",
          "Executive Experience",
          "Same-Day Delivery",
          "Corporate Packages"
        ],
        specialties: ["Corporate Headshots", "Executive Portraits"],
        location: "Country Club Plaza",
        description: "Kansas City's premier headshot studio in the prestigious Plaza district, serving executives and professionals."
      },
      {
        name: "Crossroads Arts Studio",
        rating: 4.85,
        reviews: 312,
        price: "$159",
        image: "/studios/kansas-city/crossroads.jpg",
        features: [
          "Arts District",
          "Creative Style",
          "Modern Equipment",
          "Portfolio Sessions"
        ],
        specialties: ["Creative Professionals", "Artist Headshots"],
        location: "Crossroads Arts District",
        description: "Creative studio in KC's vibrant Crossroads district, specializing in artistic and professional headshots."
      }
    ]
  },
  "st-louis": {
    title: "Top 10 St. Louis Best Professional Headshot Studios",
    description: "Professional headshot photographers in St. Louis",
    studios: [
      {
        name: "Central West End Studio",
        rating: 4.8,
        reviews: 289,
        price: "$169",
        image: "/studios/st-louis/cwe.jpg",
        features: [
          "Historic District",
          "Professional Lighting",
          "Executive Packages",
          "Same-Day Editing"
        ],
        specialties: ["Corporate Headshots", "Professional Portraits"],
        location: "Central West End",
        description: "St. Louis' premier headshot studio in the elegant Central West End, serving professionals and executives."
      }
    ]
  },
  "springfield-mo": {
    title: "Top 10 Springfield Best Professional Headshot Studios",
    description: "Find the best headshot photographers in Springfield, Missouri",
    studios: [
      {
        name: "Downtown Springfield Studio",
        rating: 4.7,
        reviews: 178,
        price: "$139",
        image: "/studios/springfield-mo/downtown.jpg",
        features: [
          "Historic Square",
          "Modern Equipment",
          "Quick Service",
          "Business Rates"
        ],
        specialties: ["Professional Headshots", "Business Portraits"],
        location: "Downtown Square",
        description: "Professional studio in historic downtown Springfield, providing quality headshots for local businesses."
      }
    ]
  },
  "columbia": {
    title: "Top 10 Columbia Best Professional Headshot Studios",
    description: "Professional headshot photographers in Columbia",
    studios: [
      {
        name: "Mizzou District Studio",
        rating: 4.7,
        reviews: 167,
        price: "$139",
        image: "/studios/columbia/mizzou.jpg",
        features: [
          "Campus Area",
          "Academic Focus",
          "Student Rates",
          "Faculty Packages"
        ],
        specialties: ["Academic Portraits", "Student Headshots"],
        location: "University District",
        description: "Professional studio serving Columbia's academic community with quality headshot services near Mizzou campus."
      }
    ]
  },
  "billings": {
    title: "Top 10 Billings Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Billings",
    studios: [
      {
        name: "Montana Avenue Studio",
        rating: 4.8,
        reviews: 234,
        price: "$149",
        image: "/studios/billings/montana-ave.jpg",
        features: [
          "Historic District",
          "Professional Lighting",
          "Business Packages",
          "Same-Day Delivery"
        ],
        specialties: ["Corporate Headshots", "Business Portraits"],
        location: "Montana Avenue",
        description: "Billings' premier headshot studio in the historic Montana Avenue district, serving professionals and businesses."
      },
      {
        name: "Rimrock Studio",
        rating: 4.7,
        reviews: 189,
        price: "$139",
        image: "/studios/billings/rimrock.jpg",
        features: [
          "Scenic Views",
          "Natural Light",
          "Outdoor Options",
          "Modern Equipment"
        ],
        specialties: ["Professional Headshots", "Outdoor Portraits"],
        location: "Rimrock Area",
        description: "Professional studio offering both indoor and outdoor headshots with Billings' scenic Rimrock as backdrop."
      }
    ]
  },
  "missoula": {
    title: "Top 10 Missoula Best Professional Headshot Studios",
    description: "Professional headshot photographers in Missoula",
    studios: [
      {
        name: "Hip Strip Studio",
        rating: 4.7,
        reviews: 167,
        price: "$139",
        image: "/studios/missoula/hip-strip.jpg",
        features: [
          "Creative District",
          "Modern Style",
          "Quick Service",
          "Artist Rates"
        ],
        specialties: ["Creative Professionals", "Business Headshots"],
        location: "Hip Strip",
        description: "Creative studio in Missoula's vibrant Hip Strip, blending artistic style with professional photography."
      }
    ]
  },
  "great-falls": {
    title: "Top 10 Great Falls Best Professional Headshot Studios",
    description: "Find the best headshot photographers in Great Falls",
    studios: [
      {
        name: "River's Edge Studio",
        rating: 4.7,
        reviews: 145,
        price: "$129",
        image: "/studios/great-falls/river.jpg",
        features: [
          "Missouri River Views",
          "Professional Equipment",
          "Business Rates",
          "Quick Turnaround"
        ],
        specialties: ["Professional Headshots", "Business Portraits"],
        location: "River's Edge",
        description: "Professional studio near the Missouri River, providing quality headshots for Great Falls' business community."
      }
    ]
  },
  "bozeman": {
    title: "Top 10 Bozeman Best Professional Headshot Studios",
    description: "Professional headshot photographers in Bozeman",
    studios: [
      {
        name: "Downtown Bozeman Studio",
        rating: 4.8,
        reviews: 178,
        price: "$149",
        image: "/studios/bozeman/downtown.jpg",
        features: [
          "Main Street Location",
          "Tech Focus",
          "Startup Packages",
          "Modern Style"
        ],
        specialties: ["Tech Professionals", "Startup Teams"],
        location: "Downtown",
        description: "Modern studio serving Bozeman's growing tech community with professional headshot services."
      }
    ]
  },
  "omaha": {
    title: "Top 10 Omaha Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Omaha",
    studios: [
      {
        name: "Old Market Studio",
        rating: 4.9,
        reviews: 345,
        price: "$169",
        image: "/studios/omaha/old-market.jpg",
        features: [
          "Historic District",
          "Professional Lighting",
          "Corporate Packages",
          "Same-Day Delivery"
        ],
        specialties: ["Corporate Headshots", "Executive Portraits"],
        location: "Old Market",
        description: "Omaha's premier headshot studio in the historic Old Market, serving professionals and executives."
      },
      {
        name: "Aksarben Studio",
        rating: 4.8,
        reviews: 289,
        price: "$159",
        image: "/studios/omaha/aksarben.jpg",
        features: [
          "Modern District",
          "Tech Focus",
          "Startup Rates",
          "Team Photos"
        ],
        specialties: ["Tech Professionals", "Startup Teams"],
        location: "Aksarben Village",
        description: "Contemporary studio in Omaha's innovation district, specializing in tech and startup professional headshots."
      }
    ]
  },
  "lincoln": {
    title: "Top 10 Lincoln Best Professional Headshot Studios",
    description: "Professional headshot photographers in Lincoln",
    studios: [
      {
        name: "Haymarket Studio",
        rating: 4.8,
        reviews: 256,
        price: "$149",
        image: "/studios/lincoln/haymarket.jpg",
        features: [
          "Historic District",
          "Modern Equipment",
          "Government Experience",
          "Quick Service"
        ],
        specialties: ["Government Officials", "Professional Headshots"],
        location: "Haymarket District",
        description: "Professional studio in Lincoln's historic Haymarket, serving government officials and professionals."
      }
    ]
  },
  "bellevue": {
    title: "Top 10 Bellevue Best Professional Headshot Studios",
    description: "Find the best headshot photographers in Bellevue, Nebraska",
    studios: [
      {
        name: "Olde Towne Studio",
        rating: 4.7,
        reviews: 145,
        price: "$139",
        image: "/studios/bellevue/olde-towne.jpg",
        features: [
          "Historic District",
          "Military Experience",
          "Service Rates",
          "Quick Turnaround"
        ],
        specialties: ["Military Personnel", "Professional Headshots"],
        location: "Olde Towne",
        description: "Professional studio serving Bellevue's military and civilian community with quality headshot services."
      }
    ]
  },
  "grand-island": {
    title: "Top 10 Grand Island Best Professional Headshot Studios",
    description: "Professional headshot photographers in Grand Island",
    studios: [
      {
        name: "Downtown Grand Island Studio",
        rating: 4.7,
        reviews: 134,
        price: "$129",
        image: "/studios/grand-island/downtown.jpg",
        features: [
          "Central Location",
          "Modern Equipment",
          "Business Rates",
          "Same-Day Editing"
        ],
        specialties: ["Professional Headshots", "Business Portraits"],
        location: "Downtown",
        description: "Professional studio in downtown Grand Island, providing quality headshots for local businesses."
      }
    ]
  },
  "las-vegas": {
    title: "Top 10 Las Vegas Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Las Vegas",
    studios: [
      {
        name: "Strip Studio Pro",
        rating: 4.9,
        reviews: 567,
        price: "$199",
        image: "/studios/las-vegas/strip.jpg",
        features: [
          "Strip Location",
          "Entertainment Focus",
          "Celebrity Experience",
          "24/7 Availability"
        ],
        specialties: ["Entertainment Headshots", "Corporate Portraits"],
        location: "The Strip",
        description: "Las Vegas' premier headshot studio on the Strip, serving entertainment professionals and corporate clients."
      },
      {
        name: "Downtown Arts Studio",
        rating: 4.8,
        reviews: 423,
        price: "$169",
        image: "/studios/las-vegas/downtown.jpg",
        features: [
          "Arts District",
          "Modern Style",
          "Creative Lighting",
          "Portfolio Sessions"
        ],
        specialties: ["Performer Headshots", "Business Portraits"],
        location: "Arts District",
        description: "Creative studio in the Las Vegas Arts District, specializing in performer and professional headshots."
      }
    ]
  },
  "reno": {
    title: "Top 10 Reno Best Professional Headshot Studios",
    description: "Professional headshot photographers in Reno",
    studios: [
      {
        name: "Midtown Studio",
        rating: 4.8,
        reviews: 289,
        price: "$159",
        image: "/studios/reno/midtown.jpg",
        features: [
          "Creative District",
          "Modern Equipment",
          "Tech Focus",
          "Quick Service"
        ],
        specialties: ["Tech Professionals", "Business Headshots"],
        location: "Midtown District",
        description: "Professional studio in Reno's vibrant Midtown, serving tech professionals and local businesses."
      }
    ]
  },
  "henderson": {
    title: "Top 10 Henderson Best Professional Headshot Studios",
    description: "Find the best headshot photographers in Henderson",
    studios: [
      {
        name: "Green Valley Studio",
        rating: 4.7,
        reviews: 234,
        price: "$149",
        image: "/studios/henderson/green-valley.jpg",
        features: [
          "Upscale Location",
          "Professional Equipment",
          "Business Packages",
          "Family Sessions"
        ],
        specialties: ["Professional Headshots", "Family Portraits"],
        location: "Green Valley",
        description: "Professional studio serving Henderson's growing community with quality headshot services."
      }
    ]
  },
  "north-las-vegas": {
    title: "Top 10 North Las Vegas Best Professional Headshot Studios",
    description: "Professional headshot photographers in North Las Vegas",
    studios: [
      {
        name: "Aliante Studio",
        rating: 4.7,
        reviews: 189,
        price: "$139",
        image: "/studios/north-las-vegas/aliante.jpg",
        features: [
          "Modern Studio",
          "Affordable Rates",
          "Quick Turnaround",
          "Business Focus"
        ],
        specialties: ["Professional Headshots", "Business Portraits"],
        location: "Aliante",
        description: "Professional studio providing quality headshots for North Las Vegas' business community."
      }
    ]
  },
  "manchester": {
    title: "Top 10 Manchester Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Manchester",
    studios: [
      {
        name: "Millyard Studio",
        rating: 4.8,
        reviews: 245,
        price: "$159",
        image: "/studios/manchester/millyard.jpg",
        features: [
          "Historic District",
          "Professional Lighting",
          "Business Focus",
          "Same-Day Delivery"
        ],
        specialties: ["Corporate Headshots", "Business Portraits"],
        location: "Millyard District",
        description: "Manchester's premier headshot studio in the historic Millyard, serving professionals and businesses."
      }
    ]
  },
  "nashua": {
    title: "Top 10 Nashua Best Professional Headshot Studios",
    description: "Professional headshot photographers in Nashua",
    studios: [
      {
        name: "Main Street Studio",
        rating: 4.7,
        reviews: 178,
        price: "$149",
        image: "/studios/nashua/main-street.jpg",
        features: [
          "Downtown Location",
          "Modern Equipment",
          "Tech Experience",
          "Quick Service"
        ],
        specialties: ["Tech Professionals", "Business Headshots"],
        location: "Main Street",
        description: "Professional studio serving Nashua's tech corridor and business community."
      }
    ]
  },
  "concord": {
    title: "Top 10 Concord Best Professional Headshot Studios",
    description: "Find the best headshot photographers in Concord",
    studios: [
      {
        name: "Capitol Studio",
        rating: 4.7,
        reviews: 156,
        price: "$139",
        image: "/studios/concord/capitol.jpg",
        features: [
          "State House Area",
          "Government Experience",
          "Professional Equipment",
          "Quick Turnaround"
        ],
        specialties: ["Government Officials", "Professional Headshots"],
        location: "Capitol District",
        description: "Professional studio near the State House, serving government officials and local professionals."
      }
    ]
  },
  "shinjuku": {
    title: "Top 10 Shinjuku Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Shinjuku",
    studios: [
      {
        name: "Shinjuku Portrait Studio",
        rating: 4.9,
        reviews: 428,
        price: "¥15,000",
        image: "/studios/tokyo/shinjuku-studio.jpg",
        features: [
          "Business District Location",
          "Modern Equipment",
          "Multi-Language Service",
          "Same-Day Delivery"
        ],
        specialties: ["Corporate Headshots", "Business Portraits"],
        location: "Near Shinjuku Station",
        description: "Premier headshot studio in the heart of Tokyo's business district, specializing in professional corporate portraits."
      }
    ]
  },
  "shibuya": {
    title: "Top 10 Shibuya Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Shibuya",
    studios: [
      {
        name: "Shibuya Fashion Studio",
        rating: 4.8,
        reviews: 356,
        price: "¥18,000",
        image: "/studios/tokyo/shibuya-studio.jpg",
        features: [
          "Fashion District",
          "Creative Direction",
          "Professional Makeup",
          "Digital Retouching"
        ],
        specialties: ["Fashion Portraits", "Model Portfolios"],
        location: "Shibuya Crossing Area",
        description: "Creative studio specializing in fashion and model portfolios, located in Tokyo's trendy Shibuya district."
      }
    ]
  },
  "umeda": {
    title: "Top 10 Umeda Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Umeda",
    studios: [
      {
        name: "Umeda Business Studio",
        rating: 4.7,
        reviews: 312,
        price: "¥14,000",
        image: "/studios/osaka/umeda-studio.jpg",
        features: [
          "Business Center Location",
          "Professional Lighting",
          "Quick Service",
          "Corporate Packages"
        ],
        specialties: ["Business Headshots", "Team Photos"],
        location: "Umeda Sky Building Area",
        description: "Professional studio serving Osaka's business community with quick, high-quality corporate photography."
      }
    ]
  },
  "gion": {
    title: "Top 10 Gion Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Gion",
    studios: [
      {
        name: "Gion Traditional Studio",
        rating: 4.9,
        reviews: 289,
        price: "¥20,000",
        image: "/studios/kyoto/gion-studio.jpg",
        features: [
          "Traditional Setting",
          "Kimono Rental Available",
          "Cultural Experience",
          "Professional Photography"
        ],
        specialties: ["Traditional Portraits", "Cultural Photos"],
        location: "Historic Gion District",
        description: "Unique studio offering traditional Japanese portrait photography in historic Gion district."
      }
    ]
  },
  "dejima": {
    title: "Top 10 Dejima Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Dejima",
    studios: [
      {
        name: "Dejima Port Studio",
        rating: 4.6,
        reviews: 178,
        price: "¥12,000",
        image: "/studios/nagasaki/dejima-studio.jpg",
        features: [
          "Harbor Views",
          "Modern Equipment",
          "International Service",
          "Quick Processing"
        ],
        specialties: ["Professional Headshots", "Location Portraits"],
        location: "Dejima Historical Area",
        description: "Professional studio combining modern photography with historical Dejima atmosphere."
      }
    ]
  },
  "setagaya": {
    title: "Top 10 Setagaya Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Setagaya",
    studios: [
      {
        name: "Setagaya Green Studio",
        rating: 4.8,
        reviews: 312,
        price: "¥16,000",
        image: "/studios/tokyo/setagaya-studio.jpg",
        features: [
          "Residential Area",
          "Natural Light Studio",
          "Family-Friendly",
          "Professional Equipment"
        ],
        specialties: ["Family Portraits", "Professional Headshots"],
        location: "Setagaya Park Area",
        description: "Comfortable studio in Setagaya's residential district, perfect for professional and family portraits."
      }
    ]
  },
  "minato": {
    title: "Top 10 Minato Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Minato",
    studios: [
      {
        name: "Roppongi Hills Studio",
        rating: 4.9,
        reviews: 425,
        price: "¥22,000",
        image: "/studios/tokyo/minato-studio.jpg",
        features: [
          "Luxury Location",
          "International Service",
          "High-End Equipment",
          "Executive Packages"
        ],
        specialties: ["Executive Portraits", "Corporate Headshots"],
        location: "Roppongi Hills",
        description: "Premium studio in Tokyo's international business hub, specializing in executive and corporate photography."
      }
    ]
  },
  "namba": {
    title: "Top 10 Namba Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Namba",
    studios: [
      {
        name: "Namba Entertainment Studio",
        rating: 4.7,
        reviews: 289,
        price: "¥15,000",
        image: "/studios/osaka/namba-studio.jpg",
        features: [
          "Entertainment District",
          "Creative Lighting",
          "Modern Style",
          "Quick Service"
        ],
        specialties: ["Entertainment Headshots", "Professional Portraits"],
        location: "Namba District",
        description: "Dynamic studio in Osaka's entertainment heart, offering creative and professional photography."
      }
    ]
  },
  "tennoji": {
    title: "Top 10 Tennoji Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Tennoji",
    studios: [
      {
        name: "Tennoji Modern Studio",
        rating: 4.6,
        reviews: 234,
        price: "¥13,000",
        image: "/studios/osaka/tennoji-studio.jpg",
        features: [
          "Modern District",
          "Professional Setup",
          "Affordable Packages",
          "Quick Processing"
        ],
        specialties: ["Business Portraits", "Student Photos"],
        location: "Tennoji Area",
        description: "Contemporary studio near Tennoji Park, providing quality headshots at competitive prices."
      }
    ]
  },
  "shin-osaka": {
    title: "Top 10 Shin-Osaka Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Shin-Osaka",
    studios: [
      {
        name: "Shin-Osaka Business Studio",
        rating: 4.8,
        reviews: 267,
        price: "¥14,000",
        image: "/studios/osaka/shin-osaka-studio.jpg",
        features: [
          "Station Area",
          "Business Focus",
          "Express Service",
          "Travel Packages"
        ],
        specialties: ["Business Headshots", "Travel Portraits"],
        location: "Shin-Osaka Station",
        description: "Convenient studio near Shin-Osaka Station, perfect for business travelers and professionals."
      }
    ]
  },
  "higashiyama": {
    title: "Top 10 Higashiyama Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Higashiyama",
    studios: [
      {
        name: "Higashiyama Heritage Studio",
        rating: 4.9,
        reviews: 356,
        price: "¥19,000",
        image: "/studios/kyoto/higashiyama-studio.jpg",
        features: [
          "Historic District",
          "Traditional Setting",
          "Cultural Experience",
          "Professional Photos"
        ],
        specialties: ["Cultural Portraits", "Professional Headshots"],
        location: "Higashiyama District",
        description: "Authentic studio in Kyoto's historic Higashiyama district, blending tradition with professional photography."
      }
    ]
  },
  "arashiyama": {
    title: "Top 10 Arashiyama Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Arashiyama",
    studios: [
      {
        name: "Bamboo Grove Studio",
        rating: 4.8,
        reviews: 245,
        price: "¥17,000",
        image: "/studios/kyoto/arashiyama-studio.jpg",
        features: [
          "Natural Setting",
          "Outdoor Options",
          "Scenic Backdrops",
          "Professional Equipment"
        ],
        specialties: ["Nature Portraits", "Professional Headshots"],
        location: "Arashiyama District",
        description: "Unique studio offering professional portraits in Arashiyama's scenic environment."
      }
    ]
  },
  "fushimi": {
    title: "Top 10 Fushimi Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Fushimi",
    studios: [
      {
        name: "Fushimi Inari Studio",
        rating: 4.7,
        reviews: 223,
        price: "¥16,000",
        image: "/studios/kyoto/fushimi-studio.jpg",
        features: [
          "Shrine District",
          "Traditional Elements",
          "Modern Equipment",
          "Tourist-Friendly"
        ],
        specialties: ["Cultural Photos", "Professional Portraits"],
        location: "Fushimi District",
        description: "Professional studio near Fushimi Inari Shrine, combining traditional elements with modern photography."
      }
    ]
  },
  "chinatown": {
    title: "Top 10 Chinatown Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Nagasaki Chinatown",
    studios: [
      {
        name: "Chinatown Cultural Studio",
        rating: 4.6,
        reviews: 189,
        price: "¥13,000",
        image: "/studios/nagasaki/chinatown-studio.jpg",
        features: [
          "Cultural District",
          "Multi-Cultural Style",
          "Professional Setup",
          "Tourist Packages"
        ],
        specialties: ["Cultural Portraits", "Professional Headshots"],
        location: "Nagasaki Chinatown",
        description: "Unique studio in Nagasaki's historic Chinatown, offering multicultural professional photography."
      }
    ]
  },
  "sakamoto": {
    title: "Top 10 Sakamoto Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Sakamoto",
    studios: [
      {
        name: "Sakamoto Heritage Studio",
        rating: 4.5,
        reviews: 156,
        price: "¥12,000",
        image: "/studios/nagasaki/sakamoto-studio.jpg",
        features: [
          "Historic Area",
          "Christian Heritage",
          "Professional Equipment",
          "Tourist-Friendly"
        ],
        specialties: ["Heritage Portraits", "Professional Photos"],
        location: "Sakamoto District",
        description: "Professional studio in historic Sakamoto, specializing in heritage and professional photography."
      }
    ]
  },
  "inasa": {
    title: "Top 10 Inasa Best Professional Headshot Studios",
    description: "Find the best professional headshot photographers in Inasa",
    studios: [
      {
        name: "Inasa View Studio",
        rating: 4.6,
        reviews: 167,
        price: "¥12,000",
        image: "/studios/nagasaki/inasa-studio.jpg",
        features: [
          "Hillside Location",
          "Night View Options",
          "Modern Equipment",
          "Scenic Photos"
        ],
        specialties: ["Scenic Portraits", "Professional Headshots"],
        location: "Mount Inasa",
        description: "Unique studio offering professional portraits with Nagasaki's famous night view as backdrop."
      }
    ]
  }
};

export default function CityPage({ params }: Props) {
  const { country, state, city } = params
  const data = cityData[city]

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7FA]">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">City Not Found</h1>
          <Link 
            href={`/near-me/${country}/${state}`}
            className="inline-flex items-center px-6 py-3 bg-[#8371FF] text-white rounded-full hover:bg-[#6F5FF6] transition-colors"
          >
            Back to State
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">{data.description}</p>
      </div>

      {/* Studio Listings */}
      <div className="space-y-8">
        {data.studios.map((studio: Studio, index: number) => (
          <div key={studio.name} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6">
            <div className="flex flex-col gap-6">
              {/* Title and Rating */}
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">#{index + 1} {studio.name}</h2>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-medium">{studio.rating}</span>
                  <div className="flex text-yellow-400">
                    {"★".repeat(Math.floor(studio.rating))}
                  </div>
                  <span className="text-gray-500 text-sm">({studio.reviews})</span>
                </div>
              </div>

              {/* Content Grid */}
              <div className="flex gap-6">
                {/* Image Grid */}
                <div className="w-[280px] h-[280px] grid grid-cols-2 gap-2">
                  <img
                    src={studio.image}
                    alt={`${studio.name} sample 1`}
                    className="w-full h-[137px] object-cover rounded-md"
                  />
                  <img
                    src={studio.image.replace('.jpg', '-2.jpg')}
                    alt={`${studio.name} sample 2`}
                    className="w-full h-[137px] object-cover rounded-md"
                  />
                  <img
                    src={studio.image.replace('.jpg', '-3.jpg')}
                    alt={`${studio.name} sample 3`}
                    className="w-full h-[137px] object-cover rounded-md"
                  />
                  <img
                    src={studio.image.replace('.jpg', '-4.jpg')}
                    alt={`${studio.name} sample 4`}
                    className="w-full h-[137px] object-cover rounded-md"
                  />
                </div>

                {/* Description */}
                <div className="flex-1 space-y-4">
                  <p className="text-gray-700">{studio.description}</p>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Features:</h3>
                    <ul className="list-disc pl-5 text-gray-700">
                      {studio.features.map((feature: string) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Specialties:</h3>
                    <div className="flex gap-2">
                      {studio.specialties.map((specialty: string) => (
                        <span 
                          key={specialty}
                          className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="text-purple-600 hover:text-purple-700 text-sm">
                    View less
                  </button>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="mt-4">
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {[1, 2, 3, 4].map((review) => (
                    <div key={review} className="bg-gray-50 rounded-lg p-4 w-[220px] flex-shrink-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">{studio.rating}</span>
                        <div className="flex text-yellow-400 text-sm">
                          {"★".repeat(Math.floor(studio.rating))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        "Great experience with {studio.name}! Professional service and amazing results."
                      </p>
                      <button className="text-purple-600 hover:text-purple-700 text-sm">
                        View more
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function generateMetadata({ params }: Props): Metadata {
  const cityFormatted = params.city.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  
  return {
    title: `Top 10 ${cityFormatted} Best Professional Headshot Studios | GoStudio`,
    description: `Discover the best professional headshot photographers in ${cityFormatted}. Book your session today!`,
    openGraph: {
      title: `Top 10 ${cityFormatted} Best Professional Headshot Studios`,
      description: `Find the best professional headshot photographers in ${cityFormatted}`,
      type: 'website',
    }
  }
} 