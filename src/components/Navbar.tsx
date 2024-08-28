"use client";
import React, { useState } from 'react';
import { Globe, ChevronDown, Phone } from 'lucide-react';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  const handleCall = () => {
    
    console.log('Initiating call...');
  };

  return (
    <nav className="bg-white shadow-lg dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">PlantAI</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleCall}
              className="flex items-center text-gray-700 hover:text-green-500 dark:text-gray-300 mr-4"
            >
              <Phone className="w-5 h-5" /> 
            </button>
            <div className="relative">
              <button
                className="flex items-center text-gray-700 hover:text-green-500 dark:text-gray-300"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Globe className="w-5 h-5 mr-1" />
                <span>{languages.find(lang => lang.code === currentLang)?.name}</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLang(lang.code);
                        setIsOpen(false);
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <SignedOut>
              <div className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                <SignInButton />
              </div>
            </SignedOut>
            <SignedIn>
              <div className="rounded-full overflow-hidden blur-30">
                <UserButton />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;