import BackgroundHero from "@/components/BackgroundHero"
import BackgroundRemove from "@/components/BackgroundRemove"
import BackgroundRemoverNode from "@/components/BackgroundRemoverNode"



export const metadata = {
    title: "Remove Background from Images Locally",   
    description: "Remove background from images and photos quickly and easily without uploading them to any server."
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