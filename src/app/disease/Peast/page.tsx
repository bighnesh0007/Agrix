'use client';

import React, { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';


export default function PotatoDiseaseDetection() {
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleUpload = async (file: File) => {
        setLoading(true);
        setError(null);
        setResult(null);

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch("/api/disease/peast", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to detect peast");
            }

            const data = await response.json();
            setResult(data.result);
        } catch (err) {
            console.error("Error:", err);
            setError("Failed to detect peast. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Peast Detection</h1>
            <ImageUpload onUpload={handleUpload} />
            
            {loading && (
                <div className="mt-4 text-center">
                    <p className="text-lg font-semibold">Analyzing image...</p>
                </div>
            )}

            {error && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    <p>{error}</p>
                </div>
            )}

            {result && (
                <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Detection Result:</h2>
                    <p className="whitespace-pre-wrap">{result.replace(/[*#]/g, ' ').trim()}</p>
                </div>
            )}
        </div>
    );
}