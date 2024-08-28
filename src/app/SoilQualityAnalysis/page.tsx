'use client';

import React, { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';

export default function SoilQualityAnalysis() {
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [analysisType, setAnalysisType] = useState<'image' | 'parameters'>('image');
    const [npkValues, setNpkValues] = useState({ nitrogen: '', phosphorus: '', potassium: '' });

    const handleUpload = async (file: File) => {
        setLoading(true);
        setError(null);
        setResult(null);

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch("/api/soil-analysis/image", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to analyze soil quality");
            }

            const data = await response.json();
            setResult(data.result);
        } catch (err) {
            console.error("Error:", err);
            setError("Failed to analyze soil quality. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleParameterAnalysis = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch("/api/soil-analysis/parameters", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(npkValues),
            });

            if (!response.ok) {
                throw new Error("Failed to analyze soil quality");
            }

            const data = await response.json();
            setResult(data.result);
        } catch (err) {
            console.error("Error:", err);
            setError("Failed to analyze soil quality. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Soil Quality Analysis</h1>
            
            <div className="mb-6">
                <label className="mr-4">
                    <input
                        type="radio"
                        value="image"
                        checked={analysisType === 'image'}
                        onChange={() => setAnalysisType('image')}
                        className="mr-2"
                    />
                    Image-based Analysis
                </label>
                <label>
                    <input
                        type="radio"
                        value="parameters"
                        checked={analysisType === 'parameters'}
                        onChange={() => setAnalysisType('parameters')}
                        className="mr-2"
                    />
                    Parameter-based Analysis
                </label>
            </div>

            {analysisType === 'image' ? (
                <ImageUpload onUpload={handleUpload} />
            ) : (
                <form onSubmit={handleParameterAnalysis} className="space-y-4">
                    <div>
                        <label htmlFor="nitrogen" className="block mb-1">Nitrogen (ppm):</label>
                        <input
                            type="number"
                            id="nitrogen"
                            value={npkValues.nitrogen}
                            onChange={(e) => setNpkValues({...npkValues, nitrogen: e.target.value})}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phosphorus" className="block mb-1">Phosphorus (ppm):</label>
                        <input
                            type="number"
                            id="phosphorus"
                            value={npkValues.phosphorus}
                            onChange={(e) => setNpkValues({...npkValues, phosphorus: e.target.value})}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="potassium" className="block mb-1">Potassium (ppm):</label>
                        <input
                            type="number"
                            id="potassium"
                            value={npkValues.potassium}
                            onChange={(e) => setNpkValues({...npkValues, potassium: e.target.value})}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Analyze
                    </button>
                </form>
            )}
            
            {loading && (
                <div className="mt-4 text-center">
                    <p className="text-lg font-semibold">Analyzing soil quality...</p>
                </div>
            )}

            {error && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    <p>{error}</p>
                </div>
            )}

            {result && (
                <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Soil Analysis Result:</h2>
                    <p className="whitespace-pre-wrap">{result.replace(/[*#]/g, ' ').trim()}</p>
                </div>
            )}
        </div>
    );
}