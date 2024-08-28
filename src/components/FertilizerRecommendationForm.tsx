import React, { useState } from 'react';
import { Thermometer, Droplet, Sprout, TestTube } from 'lucide-react';

interface FormData {
  temperature: string;
  humidity: string;
  moisture: string;
  soilType: string;
  cropType: string;
  nitrogen: string;
  phosphorous: string;
}

interface Props {
  onSubmit: (data: FormData) => void;
}

const FertilizerRecommendationForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    temperature: '',
    humidity: '',
    moisture: '',
    soilType: '',
    cropType: '',
    nitrogen: '',
    phosphorous: '',
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
      <div className="flex items-center space-x-2">
        <Thermometer className="text-blue-500" />
        <input
          type="number"
          name="temperature"
          value={formData.temperature}
          onChange={handleChange}
          placeholder="Temperature (°C)"
          className="flex-grow p-2 border rounded"
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <Droplet className="text-blue-500" />
        <input
          type="number"
          name="humidity"
          value={formData.humidity}
          onChange={handleChange}
          placeholder="Humidity (%)"
          className="flex-grow p-2 border rounded"
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <Droplet className="text-blue-500" />
        <input
          type="number"
          name="moisture"
          value={formData.moisture}
          onChange={handleChange}
          placeholder="Moisture (%)"
          className="flex-grow p-2 border rounded"
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <Sprout className="text-green-500" />
        <select
          name="soilType"
          value={formData.soilType}
          onChange={handleChange}
          className="flex-grow p-2 border rounded"
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
      <div className="flex items-center space-x-2">
        <Sprout className="text-green-500" />
        <input
          type="text"
          name="cropType"
          value={formData.cropType}
          onChange={handleChange}
          placeholder="Crop Type"
          className="flex-grow p-2 border rounded"
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <TestTube className="text-purple-500" />
        <input
          type="number"
          name="nitrogen"
          value={formData.nitrogen}
          onChange={handleChange}
          placeholder="Nitrogen (kg/ha)"
          className="flex-grow p-2 border rounded"
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <TestTube className="text-purple-500" />
        <input
          type="number"
          name="phosphorous"
          value={formData.phosphorous}
          onChange={handleChange}
          placeholder="Phosphorous (kg/ha)"
          className="flex-grow p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Get Fertilizer Recommendations
      </button>
    </form>
  );
};

export default FertilizerRecommendationForm;
