import BackgroundRemoverNode from "@/components/BackgroundRemoverNode"

export const metadata = {
    title: "Remove Background from Images - Node.js Version",
    description: "Remove background from images using Node.js processing"
}

export default function Home() {
    return (
        <main className="flex justify-center align-middle items-center min-h-screen max-w-[90%] mx-auto my-10">
            <BackgroundRemoverNode />
        </main>
    )
}