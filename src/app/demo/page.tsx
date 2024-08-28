"use client";
import React, { useState } from "react";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ModifiedFarmerDashboard = () => {
  // State for storing location and error message
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  function getLocationAndPrint(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLocation({ latitude, longitude });
          setError(null); // Clear any previous errors
        },
        (error) => {
          setError("Error retrieving location: " + error.message);
          setLocation(null); // Clear previous location
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLocation(null);
    }
  }

  const weatherData = [
    { day: "Mon", temp: 28 },
    { day: "Tue", temp: 32 },
    { day: "Wed", temp: 31 },
    { day: "Thu", temp: 29 },
    { day: "Fri", temp: 30 },
  ];

  const yieldData = {
    labels: ["2019", "2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "Expected Yield (tons)",
        data: [300, 350, 370, 390, 420],
        borderColor: "#4ade80",
        fill: true,
        backgroundColor: "rgba(74, 222, 128, 0.2)",
      },
    ],
  };

  const soilQualityData = {
    labels: ["pH Level", "Nutrients", "Moisture"],
    datasets: [
      {
        data: [6.5, 7.0, 5.5],
        backgroundColor: ["#facc15", "#4ade80", "#38bdf8"],
        hoverBackgroundColor: ["#fde047", "#86efac", "#7dd3fc"],
      },
    ],
  };

  const irrigationData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Water Usage (liters)",
        data: [500, 700, 800, 600],
        backgroundColor: "#34d399",
        borderColor: "#10b981",
        borderWidth: 2,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: 15,
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const expensesData = [
    { category: "Fertilizer", cost: 1200 },
    { category: "Seeds", cost: 800 },
    { category: "Labor", cost: 1500 },
    { category: "Pesticides", cost: 700 },
  ];

  const bentoItems = [
    {
      title: "Weather Forecast",
      description: "Stay updated on the latest weather trends.",
      header: (
        <div className="p-4 bg-gradient-to-br from-green-300 to-green-100 rounded-xl ">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weatherData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <RechartsTooltip />
              <Area
                type="monotone"
                dataKey="temp"
                stroke="#f97316"
                fill="rgba(249, 115, 22, 0.2)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ),
      icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Soil Quality Analysis",
      description: "Monitor soil conditions for optimal crop health.",
      header: (
        <div className="p-4 bg-gradient-to-br from-red-300 to-red-100 rounded-xl">
          <div className="w-full h-64 relative">
            <Doughnut data={soilQualityData} options={doughnutOptions} />
          </div>
        </div>
      ),
      icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Yield Predictions",
      description: "Expected yield based on past trends.",
      header: (
        <div className="p-4 bg-gradient-to-br from-blue-300 to-blue-100 rounded-xl">
          <Line data={yieldData} />
        </div>
      ),
      icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Farm Expense Breakdown",
      description: "Track and manage your farm expenses.",
      header: (
        <div className="p-4 bg-gradient-to-br from-purple-300 to-purple-100 rounded-xl">
          <ul>
            {expensesData.map((expense, index) => (
              <li key={index} className="flex justify-between py-2 border-b">
                <span>{expense.category}</span>
                <span className="font-bold text-gray-700">${expense.cost}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
      icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Crop Health Monitoring",
      description: "Keep track of your crops' health status.",
      header: (
        <div className="p-4 bg-gradient-to-br from-yellow-300 to-yellow-100 rounded-xl">
          <p className="text-gray-700 font-semibold">
            No issues detected. All crops are healthy 🌱
          </p>
        </div>
      ),
      icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Irrigation Management",
      description: "Track water usage over the weeks.",
      header: (
        <div className="p-4 bg-gradient-to-br from-orange-300 to-orange-100 rounded-xl">
          <Bar data={irrigationData} />
        </div>
      ),
      icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Agricultural Innovation",
      description: "Explore cutting-edge technologies in agriculture.",
      header: (
        <div className="p-4 bg-gradient-to-br from-teal-300 to-teal-100 rounded-xl">
          <p className="text-gray-700">
            Stay tuned for the latest agricultural innovations!
          </p>
        </div>
      ),
      icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen rounded-lg overflow-y-scroll scrollbar-none">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Advanced Farmer Dashboard
          </h1>
          <p className="text-gray-500">
            Comprehensive farm management and insights
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="py-2 px-4 bg-green-500 text-white rounded-md"
            onClick={getLocationAndPrint}
          >
            Get Location
          </button>
          <button className="w-10 h-10 bg-gray-200 rounded-full"></button>
        </div>
      </header>

      {/* Location Display */}
      {location && (
        <div className="mb-8 p-4 bg-blue-100 rounded-md text-blue-700">
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}
      {error && (
        <div className="mb-8 p-4 bg-red-100 rounded-md text-red-700">
          <p>{error}</p>
        </div>
      )}

      {/* Bento Grid */}
      <BentoGrid className="max-w-6xl mx-auto">
        {bentoItems.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </div>
  );
};

export default ModifiedFarmerDashboard;
