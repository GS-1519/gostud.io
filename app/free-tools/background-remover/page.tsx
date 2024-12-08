import BackgroundHero from "@/components/BackgroundHero"
import BackgroundRemove from "@/components/BackgroundRemove"



export const metadata = {
    title: "Remove Background from Images Locally",   
    description: "Remove background from images and photos quickly and easily without uploading them to any server.",
    keywords: "background remover, image editing, photo editor, AI background removal, free background remover",
    openGraph: {
        title: "Remove Background from Images Locally",
        description: "Remove background from images and photos quickly and easily without uploading them to any server.",
        type: "website",
        url: "https://your-domain.com/free-tools/background-remover",
        images: [
            {
                url: "/og-image.jpg", // Add your actual OG image path
                width: 1200,
                height: 630,
                alt: "Background Remover Tool",
            },
        ],
    },
}

export default function Home() {
    return (
        <main className="flex justify-center align-middle items-center min-h-screen max-w-[90%] mx-auto my-10">
            <div>
                <BackgroundHero/>
                <BackgroundRemove/>
            </div>
        </main>
    )
}