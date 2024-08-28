"use client"
import { useState } from 'react';
import CropRecommendationForm from '@/components/CropRecommendationForm';

export default function Home() {
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: any) => {
    setLoading(true);
    setError(null);
    setRecommendation(null);

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to get crop recommendations');
      }

      const data = await response.json();
      setRecommendation(data.recommendation);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to get crop recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Crop Recommendation System</h1>
      <CropRecommendationForm onSubmit={handleSubmit} />
      
      {loading && (
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold">Generating recommendations...</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <p>{error}</p>
        </div>
      )}

      {recommendation && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Crop Recommendations:</h2>
          <p className="whitespace-pre-wrap">{recommendation.replace(/[*#]/g, ' ').trim()}</p>
        </div>
      )}
    </div>
  );
}