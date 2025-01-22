import { Metadata } from 'next'
import Link from 'next/link'
import Footer from "@/components/Footer"
import Banner from "@/components/Banner"

interface Props {
  params: {
    country: string;
    state: string;
  }
}

const citiesByState: { [key: string]: Array<{ name: string; slug: string; population: string }> } = {
  "new-york": [
    { name: "New York City", slug: "new-york-city", population: "8.8M" },
    { name: "Buffalo", slug: "buffalo", population: "278K" },
    { name: "Rochester", slug: "rochester", population: "211K" },
    { name: "Albany", slug: "albany", population: "99K" }
  ],
  "arizona": [
    { name: "Phoenix", slug: "phoenix", population: "1.6M" },
    { name: "Tucson", slug: "tucson", population: "545K" },
    { name: "Mesa", slug: "mesa", population: "504K" },
    { name: "Scottsdale", slug: "scottsdale", population: "241K" },
    { name: "Glendale", slug: "glendale", population: "248K" }
  ],
  "arkansas": [
    { name: "Little Rock", slug: "little-rock", population: "202K" },
    { name: "Fort Smith", slug: "fort-smith", population: "89K" },
    { name: "Fayetteville", slug: "fayetteville", population: "93K" },
    { name: "Springdale", slug: "springdale", population: "84K" }
  ],
  "california": [
    { name: "Los Angeles", slug: "los-angeles", population: "3.9M" },
    { name: "San Francisco", slug: "san-francisco", population: "873K" },
    { name: "San Diego", slug: "san-diego", population: "1.4M" },
    { name: "Sacramento", slug: "sacramento", population: "513K" },
    { name: "San Jose", slug: "san-jose", population: "1M" }
  ],
  "colorado": [
    { name: "Denver", slug: "denver", population: "727K" },
    { name: "Colorado Springs", slug: "colorado-springs", population: "478K" },
    { name: "Aurora", slug: "aurora", population: "386K" },
    { name: "Fort Collins", slug: "fort-collins", population: "169K" }
  ],
  "connecticut": [
    { name: "Bridgeport", slug: "bridgeport", population: "148K" },
    { name: "New Haven", slug: "new-haven", population: "134K" },
    { name: "Hartford", slug: "hartford", population: "123K" },
    { name: "Stamford", slug: "stamford", population: "135K" }
  ],
  "delaware": [
    { name: "Wilmington", slug: "wilmington", population: "71K" },
    { name: "Dover", slug: "dover", population: "39K" },
    { name: "Newark", slug: "newark", population: "33K" },
    { name: "Middletown", slug: "middletown", population: "23K" }
  ],
  "florida": [
    { name: "Miami", slug: "miami", population: "442K" },
    { name: "Orlando", slug: "orlando", population: "307K" },
    { name: "Tampa", slug: "tampa", population: "384K" },
    { name: "Jacksonville", slug: "jacksonville", population: "949K" },
    { name: "Fort Lauderdale", slug: "fort-lauderdale", population: "182K" }
  ],
  "georgia": [
    { name: "Atlanta", slug: "atlanta", population: "498K" },
    { name: "Augusta", slug: "augusta", population: "202K" },
    { name: "Columbus", slug: "columbus", population: "195K" },
    { name: "Savannah", slug: "savannah", population: "147K" }
  ],
  "hawaii": [
    { name: "Honolulu", slug: "honolulu", population: "350K" },
    { name: "Pearl City", slug: "pearl-city", population: "47K" },
    { name: "Hilo", slug: "hilo", population: "45K" },
    { name: "Kailua", slug: "kailua", population: "40K" }
  ],
  "idaho": [
    { name: "Boise", slug: "boise", population: "235K" },
    { name: "Meridian", slug: "meridian", population: "117K" },
    { name: "Nampa", slug: "nampa", population: "100K" },
    { name: "Idaho Falls", slug: "idaho-falls", population: "64K" }
  ],
  "illinois": [
    { name: "Chicago", slug: "chicago", population: "2.7M" },
    { name: "Aurora", slug: "aurora", population: "180K" },
    { name: "Naperville", slug: "naperville", population: "149K" },
    { name: "Springfield", slug: "springfield", population: "114K" }
  ],
  "indiana": [
    { name: "Indianapolis", slug: "indianapolis", population: "867K" },
    { name: "Fort Wayne", slug: "fort-wayne", population: "263K" },
    { name: "Evansville", slug: "evansville", population: "118K" },
    { name: "South Bend", slug: "south-bend", population: "102K" }
  ],
  "iowa": [
    { name: "Des Moines", slug: "des-moines", population: "214K" },
    { name: "Cedar Rapids", slug: "cedar-rapids", population: "137K" },
    { name: "Davenport", slug: "davenport", population: "101K" },
    { name: "Sioux City", slug: "sioux-city", population: "85K" }
  ],
  "kansas": [
    { name: "Wichita", slug: "wichita", population: "397K" },
    { name: "Overland Park", slug: "overland-park", population: "197K" },
    { name: "Kansas City", slug: "kansas-city", population: "153K" },
    { name: "Olathe", slug: "olathe", population: "141K" }
  ],
  "kentucky": [
    { name: "Louisville", slug: "louisville", population: "633K" },
    { name: "Lexington", slug: "lexington", population: "322K" },
    { name: "Bowling Green", slug: "bowling-green", population: "72K" },
    { name: "Owensboro", slug: "owensboro", population: "60K" }
  ],
  "louisiana": [
    { name: "New Orleans", slug: "new-orleans", population: "384K" },
    { name: "Baton Rouge", slug: "baton-rouge", population: "227K" },
    { name: "Shreveport", slug: "shreveport", population: "187K" },
    { name: "Lafayette", slug: "lafayette", population: "126K" }
  ],
  "maine": [
    { name: "Portland", slug: "portland", population: "68K" },
    { name: "Lewiston", slug: "lewiston", population: "37K" },
    { name: "Bangor", slug: "bangor", population: "32K" },
    { name: "South Portland", slug: "south-portland", population: "25K" }
  ],
  "maryland": [
    { name: "Baltimore", slug: "baltimore", population: "585K" },
    { name: "Frederick", slug: "frederick", population: "78K" },
    { name: "Rockville", slug: "rockville", population: "67K" },
    { name: "Gaithersburg", slug: "gaithersburg", population: "69K" }
  ],
  "massachusetts": [
    { name: "Boston", slug: "boston", population: "675K" },
    { name: "Worcester", slug: "worcester", population: "206K" },
    { name: "Springfield", slug: "springfield", population: "155K" },
    { name: "Cambridge", slug: "cambridge", population: "118K" }
  ],
  "michigan": [
    { name: "Detroit", slug: "detroit", population: "639K" },
    { name: "Grand Rapids", slug: "grand-rapids", population: "198K" },
    { name: "Warren", slug: "warren", population: "139K" },
    { name: "Sterling Heights", slug: "sterling-heights", population: "134K" }
  ],
  "minnesota": [
    { name: "Minneapolis", slug: "minneapolis", population: "429K" },
    { name: "Saint Paul", slug: "saint-paul", population: "311K" },
    { name: "Rochester", slug: "rochester", population: "118K" },
    { name: "Duluth", slug: "duluth", population: "86K" }
  ],
  "mississippi": [
    { name: "Jackson", slug: "jackson", population: "153K" },
    { name: "Gulfport", slug: "gulfport", population: "72K" },
    { name: "Southaven", slug: "southaven", population: "54K" },
    { name: "Biloxi", slug: "biloxi", population: "46K" }
  ],
  "missouri": [
    { name: "Kansas City", slug: "kansas-city", population: "508K" },
    { name: "St. Louis", slug: "st-louis", population: "301K" },
    { name: "Springfield", slug: "springfield", population: "169K" },
    { name: "Columbia", slug: "columbia", population: "126K" }
  ],
  "montana": [
    { name: "Billings", slug: "billings", population: "120K" },
    { name: "Missoula", slug: "missoula", population: "75K" },
    { name: "Great Falls", slug: "great-falls", population: "58K" },
    { name: "Bozeman", slug: "bozeman", population: "53K" }
  ],
  "nebraska": [
    { name: "Omaha", slug: "omaha", population: "486K" },
    { name: "Lincoln", slug: "lincoln", population: "289K" },
    { name: "Bellevue", slug: "bellevue", population: "53K" },
    { name: "Grand Island", slug: "grand-island", population: "51K" }
  ],
  "nevada": [
    { name: "Las Vegas", slug: "las-vegas", population: "651K" },
    { name: "Reno", slug: "reno", population: "255K" },
    { name: "Henderson", slug: "henderson", population: "320K" },
    { name: "North Las Vegas", slug: "north-las-vegas", population: "262K" }
  ],
  "new-hampshire": [
    { name: "Manchester", slug: "manchester", population: "115K" },
    { name: "Nashua", slug: "nashua", population: "89K" },
    { name: "Concord", slug: "concord", population: "43K" },
  ],
  "new-jersey": [
    { name: "Newark", slug: "newark", population: "282K" },
    { name: "Jersey City", slug: "jersey-city", population: "292K" },
  ],
  "new-mexico": [
    { name: "Albuquerque", slug: "albuquerque", population: "564K" },
    { name: "Santa Fe", slug: "santa-fe", population: "85K" }
  ],
 
  "ohio": [
    { name: "Columbus", slug: "columbus", population: "898K" },
    { name: "Cleveland", slug: "cleveland", population: "372K" },
    { name: "Cincinnati", slug: "cincinnati", population: "309K" },
    { name: "Toledo", slug: "toledo", population: "275K" }
  ],
 
  "tokyo": [
    { name: "Shinjuku", slug: "shinjuku", population: "346K" },
    { name: "Shibuya", slug: "shibuya", population: "228K" },
    { name: "Setagaya", slug: "setagaya", population: "932K" },
    { name: "Minato", slug: "minato", population: "256K" }
  ],
  
  "osaka": [
    { name: "Umeda", slug: "umeda", population: "521K" },
    { name: "Namba", slug: "namba", population: "245K" },
    { name: "Tennoji", slug: "tennoji", population: "183K" },
    { name: "Shin-Osaka", slug: "shin-osaka", population: "156K" }
  ],
  
  "kyoto": [
    { name: "Higashiyama", slug: "higashiyama", population: "180K" },
    { name: "Arashiyama", slug: "arashiyama", population: "85K" },
    { name: "Gion", slug: "gion", population: "95K" },
    { name: "Fushimi", slug: "fushimi", population: "283K" }
  ],
  
  "nagasaki": [
    { name: "Dejima", slug: "dejima", population: "75K" },
    { name: "Chinatown", slug: "chinatown", population: "45K" },
    { name: "Sakamoto", slug: "sakamoto", population: "38K" },
    { name: "Inasa", slug: "inasa", population: "42K" }
  ]
};

export default function StatePage({ params }: Props) {
  const state = params.state
  const cities = citiesByState[state] || []
  const stateNameFormatted = state.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-[40px] font-bold text-center mb-4">
          Headshot Photo Studios in {stateNameFormatted}
        </h1>
        <p className="text-center mb-12">
          Welcome to {stateNameFormatted}'s premier network of professional headshot photographers. 
          Select a city to find the best photographers near you.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cities.map((city) => (
            <Link 
              key={city.slug}
              href={`/near-me/${params.country}/${state}/${city.slug}`}
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-200">
                  <img
                    src={`/cities/${state}/${city.slug}.jpg`}
                    alt={`${city.name} Headshot Studios`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{city.name}</h2>
                  <p className="text-gray-600">
                    {city.name}, a city with {city.population} habitants. 
                    See the top headshot studios by customers reviews.
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Banner />
      <Footer />
    </>
  )
}

export function generateMetadata({ params }: Props): Metadata {
  const stateFormatted = params.state.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  
  return {
    title: `Professional Headshot Studios in ${stateFormatted} | GoStudio`,
    description: `Find the best professional headshot photographers in ${stateFormatted}. Book your session today!`,
    openGraph: {
      title: `Professional Headshot Studios in ${stateFormatted}`,
      description: `Find the best professional headshot photographers in ${stateFormatted}`,
      type: 'website',
    }
  }
}