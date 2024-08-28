"use client"
import React, { useState } from 'react';

interface FormData {
  soilType: string;
  location: string;
  timeInHand: number;
  rainfall: number;
  temperature: number;
  humidity: number;
}

interface Props {
  onSubmit: (data: FormData) => void;
}

const CropRecommendationForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    soilType: '',
    location: '',
    timeInHand: 0,
    rainfall: 0,
    temperature: 0,
    humidity: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="soilType" className="block mb-1">Soil Type</label>
        <select
          id="soilType"
          name="soilType"
          value={formData.soilType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Soil Type</option>
          <option value="Clay">Clay</option>
          <option value="Sandy">Sandy</option>
          <option value="Loamy">Loamy</option>
          <option value="Silt">Silt</option>
          <option value="Peat">Peat</option>
        </select>
      </div>
      <div>
        <label htmlFor="location" className="block mb-1">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="timeInHand" className="block mb-1">Time Available (months)</label>
        <input
          type="number"
          id="timeInHand"
          name="timeInHand"
          value={formData.timeInHand}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
          min="1"
        />
      </div>
      <div>
        <label htmlFor="rainfall" className="block mb-1">Average Rainfall (mm)</label>
        <input
          type="number"
          id="rainfall"
          name="rainfall"
          value={formData.rainfall}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
          min="0"
        />
      </div>
      <div>
        <label htmlFor="temperature" className="block mb-1">Average Temperature (°C)</label>
        <input
          type="number"
          id="temperature"
          name="temperature"
          value={formData.temperature}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="humidity" className="block mb-1">Average Humidity (%)</label>
        <input
          type="number"
          id="humidity"
          name="humidity"
          value={formData.humidity}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
          min="0"
          max="100"
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Get Crop Recommendations
      </button>
    </form>
  );
};

export default CropRecommendationForm;