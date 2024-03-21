import Image from "next/image";
import Article from "@/app/ui/default/article";
import GenerateMockDate from "@/app/lib/default/mock_article";

export default function Home() {
    const mockArticleData = GenerateMockDate()
    // generate random level from 500~1000
    const level = Math.floor(Math.random() * 500) + 500
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-5">
            <div className="flex flex-col items-center justify-start min-h-screen py-2">
                <h1 className="text-3xl font-bold mb-4">Latest Article</h1>
                <Article list={mockArticleData} filterLevel={level}/>
            </div>
        </main>
    );
}


