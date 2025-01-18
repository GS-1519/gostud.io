// app/near-me/[country]/page.tsx

import { Metadata } from 'next'
import Link from 'next/link'
import Footer from "@/components/Footer"
import Banner from "@/components/Banner"

interface Props {
  params: {
    country: string;
  }
}

const allStates = {
  "united-states": [
    { name: "New York", slug: "new-york", population: "8.8M" },
    { name: "Arizona", slug: "arizona", population: "7.3M" },
    { name: "Arkansas", slug: "arkansas", population: "3.0M" },
    { name: "California", slug: "california", population: "39.5M" },
    { name: "Colorado", slug: "colorado", population: "5.8M" },
    { name: "Connecticut", slug: "connecticut", population: "3.6M" },
    { name: "Delaware", slug: "delaware", population: "1.0M" },
    { name: "Florida", slug: "florida", population: "21.8M" },
    { name: "Georgia", slug: "georgia", population: "10.7M" },
    { name: "Hawaii", slug: "hawaii", population: "1.4M" },
    { name: "Idaho", slug: "idaho", population: "1.9M" },
    { name: "Illinois", slug: "illinois", population: "12.7M" },
    { name: "Indiana", slug: "indiana", population: "6.8M" },
    { name: "Iowa", slug: "iowa", population: "3.2M" },
    { name: "Kansas", slug: "kansas", population: "2.9M" },
    { name: "Kentucky", slug: "kentucky", population: "4.5M" },
    { name: "Louisiana", slug: "louisiana", population: "4.6M" },
    { name: "Maine", slug: "maine", population: "1.4M" },
    { name: "Maryland", slug: "maryland", population: "6.2M" },
    { name: "Massachusetts", slug: "massachusetts", population: "7.0M" },
    { name: "Michigan", slug: "michigan", population: "10.0M" },
    { name: "Minnesota", slug: "minnesota", population: "5.7M" },
    { name: "Mississippi", slug: "mississippi", population: "3.0M" },
    { name: "Missouri", slug: "missouri", population: "6.2M" },
    { name: "Montana", slug: "montana", population: "1.1M" },
    { name: "Nebraska", slug: "nebraska", population: "2.0M" },
    { name: "Nevada", slug: "nevada", population: "3.1M" },
    { name: "New Hampshire", slug: "new-hampshire", population: "1.4M" },
    { name: "New Jersey", slug: "new-jersey", population: "9.3M" },
    { name: "New Mexico", slug: "new-mexico", population: "2.1M" },
    { name: "Ohio", slug: "ohio", population: "11.8M" },
  ],
  "japan": [
    { name: "Tokyo", slug: "tokyo", population: "13.9M" },
    { name: "Osaka", slug: "osaka", population: "2.7M" },
    { name: "Kyoto", slug: "kyoto", population: "1.5M" },
    { name: "Nagasaki", slug: "nagasaki", population: "407K" }
  ]
};

export default function CountryPage({ params }: Props) {
  const states = allStates[params.country as keyof typeof allStates] || [];
  const countryFormatted = params.country.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-[40px] font-bold text-center mb-4">
          Headshot Photo Studios in {countryFormatted}
        </h1>
        <p className="text-center mb-12">
          Welcome to {countryFormatted}'s premier network of professional headshot photographers. 
          Select a city to find the best photographers near you.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {states.map((state) => (
            <Link 
              key={state.slug}
              href={`/near-me/${params.country}/${state.slug}`}
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-200">
                  <img
                    src={`/states/${state.slug}.jpg`}
                    alt={`${state.name} Headshot Studios`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{state.name}</h2>
                  <p className="text-gray-600">
                    {state.name}, a city with {state.population} habitants. 
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
  return {
    title: "Professional Headshot Studios in United States | GoStudio",
    description: "Find the best professional headshot photographers across all states in the United States. Book your session today!",
    openGraph: {
      title: "Professional Headshot Studios in United States",
      description: "Find the best professional headshot photographers across all states in the United States",
      type: 'website',
    }
  }
}
