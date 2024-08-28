'use client';

import React, { useState } from 'react';
import ImageUpload from '@/components/ImageUpload'; // Assuming you have a drag-and-drop ImageUpload component

export default function CropRoadmapBuilder() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showImageUpload, setShowImageUpload] = useState(false); // Toggle between form and image upload
  const [formData, setFormData] = useState({
    cropType: '',
    region: '',
    soilType: '',
    season: '',
    sowingDate: '',
    expectedHarvestDate: '',

  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log("Submitting form data:", formData);
      
      const response = await fetch("/api/crop-road-map/generate-form", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("API Response:", data);
      setResult(data.result);
    } catch (err) {
      console.error("Error details:", err);
      setError(`Failed to generate crop roadmap: ${(err as Error).message}. Please check the console for more details.`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpload = async (file: File) => {
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/crop-road-map/process-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze image data");
      }

      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to analyze image data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Crop Roadmap Builder</h1>
      <div className="mb-6">
        <button
          onClick={() => setShowImageUpload(!showImageUpload)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {showImageUpload ? 'Switch to Form Input' : 'Switch to Image Upload'}
        </button>
      </div>

      {showImageUpload ? (
        <ImageUpload onUpload={handleUpload} />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="cropType" className="block mb-1">Crop Type:</label>
            <input
              type="text"
              id="cropType"
              name="cropType"
              value={formData.cropType}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="region" className="block mb-1">Region/Location:</label>
            <input
              type="text"
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="soilType" className="block mb-1">Soil Type:</label>
            <input
              type="text"
              id="soilType"
              name="soilType"
              value={formData.soilType}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="season" className="block mb-1">Season:</label>
            <input
              type="text"
              id="season"
              name="season"
              value={formData.season}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label htmlFor="sowingDate" className="block mb-1">Sowing Date:</label>
            <input
              type="date"
              id="sowingDate"
              name="sowingDate"
              value={formData.sowingDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
         
         
          <div>
            <label htmlFor="expectedHarvestDate" className="block mb-1">Expected Harvest Date:</label>
            <input
              type="date"
              id="expectedHarvestDate"
              name="expectedHarvestDate"
              value={formData.expectedHarvestDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Generate Roadmap
          </button>
        </form>
      )}

      {loading && (
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold">Processing...</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Result:</h2>
          <p className="whitespace-pre-wrap">{result.replace(/[*#]/g, ' ').trim()}</p>
        </div>
      )}
    </div>
  );
}
