"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  // FaSeedling,
  FaInfoCircle,
  FaSun,
  FaMoon,
  FaExclamationTriangle,
  FaChevronDown,
  FaChevronUp,
  FaCarrot,
  FaAppleAlt,
  FaLeaf,
  FaBreadSlice,
  FaCandyCane,
  FaClock,
  FaBeer,
  FaSpa,
  FaCottonBureau,
  FaPepperHot,
  // FaSeedling,
  FaSeedling,
} from "react-icons/fa";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [diseaseMenuOpen, setDiseaseMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/", icon: FaHome },
    { name: "Identify", href: "/identify", icon: FaSeedling },
    { name: "Crop Recommendation", href: "/CropRecommendation", icon: FaSeedling },
    { name: "Soil Quality Analysis", href: "/SoilQualityAnalysis", icon: FaSeedling },
    { name: "Fertilizer Recommendation", href: "/fertilizerRecommendation", icon: FaSeedling },
    { name: "Crop Road Map", href: "/CropRoadMapBuilder", icon: FaSeedling },
    { name: "demo", href: "/demo", icon: FaSeedling },
    { name: "Weather Dashboard", href: "/WeatherDashboard", icon: FaInfoCircle },
    { name: "Voice To Search", href: "/voice", icon: FaInfoCircle },
  ];

  const diseaseCategories = [
    {
      category: "Vegetables",
      items: [
        { name: "Potato", href: "/disease/potato", icon: FaCarrot },
        { name: "Tomato", href: "/disease/tomato", icon: FaPepperHot },
      ],
    },
    {
      category: "Fruits",
      items: [
        { name: "Apple", href: "/disease/apple", icon: FaAppleAlt },
        { name: "Lemon", href: "/disease/lemon", icon: FaLeaf },
      ],
    },
    {
      category: "Crops",
      items: [
        { name: "Rice", href: "/disease/rice", icon: FaSeedling },
        { name: "Wheat", href: "/disease/wheat", icon: FaBreadSlice },
        { name: "Sugarcane", href: "/disease/sugarcane", icon: FaCandyCane },
        { name: "Pulses", href: "/disease/pulses", icon: FaSeedling },
        { name: "Maize", href: "/disease/maize", icon: FaClock },
        { name: "Barley", href: "/disease/barley", icon: FaBeer },
        { name: "Soybean", href: "/disease/soybean", icon: FaSpa },
        { name: "Groundnut", href: "/disease/groundnut", icon: FaLeaf },
        { name: "Cotton Leaf", href: "/disease/cotton-leaf", icon: FaCottonBureau },
      ],
    },
    {
      category: "Others",
      items: [
        { name: "Pest Detection", href: "/disease/pest", icon: FaExclamationTriangle },
      ],
    },
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex overflow-y-scroll scrollbar-none flex-col h-screen p-4 m-3 bg-white shadow-lg w-64 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg no-scrollbar">
      <div className="space-y-5">
        <div className="flex items-center justify-center">
          <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
            Plant Identifier
          </h2>
        </div>
        <div className="flex-1">
          <ul className="space-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.name} className="rounded-lg">
                <Link
                  href={item.href}
                  className={`flex items-center p-3 space-x-4 rounded-lg transition-all duration-200 ${
                    pathname === item.href
                      ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-white"
                      : "hover:bg-green-50 dark:hover:bg-green-800 dark:text-gray-300"
                  }`}
                >
                  <item.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
            <li className="rounded-lg">
              <button
                onClick={() => setDiseaseMenuOpen(!diseaseMenuOpen)}
                className="flex items-center w-full p-3 space-x-4 rounded-lg hover:bg-green-50 dark:hover:bg-green-800 transition-all duration-200 dark:text-gray-300"
              >
                <FaExclamationTriangle className="w-6 h-6 text-green-600 dark:text-green-400" />
                <span>Disease Detection</span>
                {diseaseMenuOpen ? (
                  <FaChevronUp className="w-4 h-4 ml-auto" />
                ) : (
                  <FaChevronDown className="w-4 h-4 ml-auto" />
                )}
              </button>
              {diseaseMenuOpen && (
                <div className="pl-4">
                  {diseaseCategories.map((category) => (
                    <div key={category.category}>
                      <h3 className="text-gray-600 dark:text-gray-400 mt-4 mb-2 font-semibold">
                        {category.category}
                      </h3>
                      <ul className="pl-4 space-y-2">
                        {category.items.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className={`flex items-center p-2 space-x-4 rounded-lg transition-all duration-200 ${
                                pathname === item.href
                                  ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-white"
                                  : "hover:bg-green-50 dark:hover:bg-green-800 dark:text-gray-300"
                              }`}
                            >
                              <item.icon className="w-5 h-5 text-green-600 dark:text-green-400" />
                              <span>{item.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-center p-4 mt-12">
        <button
          onClick={toggleDarkMode}
          className="p-3 rounded-lg hover:bg-green-50 dark:hover:bg-green-800 transition-all duration-200"
        >
          {isDarkMode ? (
            <FaSun className="w-6 h-6 text-green-600 dark:text-green-400" />
          ) : (
            <FaMoon className="w-6 h-6 text-green-600 dark:text-green-400" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
