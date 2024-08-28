"use client";

import { useState } from "react";
import ImageUpload from "@/components/ImageUpload";
import { Clover } from "lucide-react";

export default function Home() {
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async (file: File) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch("/api/identify", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to identify plant");
            }

            const data = await response.json();
            setResult(data.result);
        } catch (error) {
            console.error("Error:", error);
            setResult("Failed to identify plant. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex">
                <h1 className="text-4xl font-bold mb-8 flex items-center">
                    <Clover className="mr-2" /> Plant Identifier
                </h1>
            </div>

            <div className="w-full max-w-2xl">
                <ImageUpload onUpload={handleUpload} />
                {loading && <p className="mt-4 text-center">Identifying plant...</p>}
                {result && (
                    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Identification Result:</h2>
                        <p className="whitespace-pre-wrap">{result.replace(/[*#]/g, ' ').trim()}</p>
                    </div>
                )}
            </div>
        </main>
    );
}
