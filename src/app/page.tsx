"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircleIcon, CloudSun, Sprout, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {  Input} from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { BackgroundBeams } from '@/components/ui/background-beams'; // Assuming these are custom components
import {  TextGenerateEffect } from '@/components/ui/text-generate-effect'; // Assuming these are custom components
import { SparklesCore } from '@/components/ui/sparkles'; // Assuming these are custom components

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 relative overflow-hidden">
      <BackgroundBeams />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold text-green-800 mb-4">
            <TextGenerateEffect words="Agricultural AI Revolution" />
          </h1>
          <p className="text-xl text-green-600 mb-8">Cultivating the future with intelligent farming solutions</p>
          <Button size="lg" className="bg-green-600 hover:bg-green-700">Get Started</Button>
        </motion.div>
        
        <div className="w-[40rem] h-40 relative">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#22c55e"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <PlayCircleIcon className="h-10 w-10 text-green-500" />, title: "Crop Analysis" },
            { icon: <CloudSun className="h-10 w-10 text-green-500" />, title: "Weather Prediction" },
            { icon: <Sprout className="h-10 w-10 text-green-500" />, title: "Yield Optimization" },
            { icon: <BarChart className="h-10 w-10 text-green-500" />, title: "Market Insights" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="flex flex-col items-center text-center p-6">
                  {feature.icon}
                  <h3 className="mt-4 font-semibold text-lg">{feature.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">Leverage AI to maximize your agricultural potential.</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-green-600 relative">
        <div className="max-w-4xl mx-auto text-center text-white relative z-10">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your farm?</h2>
          <p className="mb-8">Join thousands of farmers already benefiting from our AI solutions.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Input placeholder="Enter your email" className="max-w-xs" />
            <Button variant="secondary">Get Demo</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">AgriAI</h3>
            <p className="mt-2 text-sm">Empowering farmers with intelligent solutions</p>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-green-300">About</a>
            <a href="#" className="hover:text-green-300">Services</a>
            <a href="#" className="hover:text-green-300">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;