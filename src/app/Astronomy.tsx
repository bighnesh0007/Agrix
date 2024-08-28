import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Droplets, Moon, Sunrise, Sunset } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import clsx from 'clsx';

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  astronomy: {
    astro: {
      sunrise: string;
      sunset: string;
      moonrise: string;
      moonset: string;
      moon_phase: string;
      moon_illumination: number;
      is_moon_up: number;
      is_sun_up: number;
    };
  };
}

interface WeatherCardProps {
  className?: string;
}

const WeatherCardAstronomy: React.FC<WeatherCardProps> = ({ className }) => {
  const [city, setCity] = useState<string>('');
  const [date, setDate] = useState<Date | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city || !date) return;

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const response = await fetch(`/api/astronomy?city=${encodeURIComponent(city)}&date=${format(date, 'yyyy-MM-dd')}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch weather data');
      }
      const data: WeatherData = await response.json();

      // Validate data structure
      if (!data.astronomy || !data.location) {
        throw new Error('Invalid weather data structure');
      }

      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const renderWeatherInfo = () => {
    if (!weather) return null;
    const { sunrise, sunset, moonrise, moonset, moon_phase, moon_illumination } = weather.astronomy.astro;

    return (
      <div className="mt-4 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">{weather.location.name}, {weather.location.country}</h3>
          <p className="text-sm text-gray-500">{format(new Date(weather.location.localtime), 'PPpp')}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Sunrise className="w-5 h-5 text-orange-500" />
            <span className="text-sm">Sunrise: <strong>{sunrise}</strong></span>
          </div>
          <div className="flex items-center space-x-2">
            <Sunset className="w-5 h-5 text-red-500" />
            <span className="text-sm">Sunset: <strong>{sunset}</strong></span>
          </div>
          <div className="flex items-center space-x-2">
            <Moon className="w-5 h-5 text-yellow-500" />
            <span className="text-sm">Moonrise: <strong>{moonrise}</strong></span>
          </div>
          <div className="flex items-center space-x-2">
            <Moon className="w-5 h-5 text-gray-500" />
            <span className="text-sm">Moonset: <strong>{moonset}</strong></span>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <CalendarIcon className="w-5 h-5 text-blue-500" />
          <span className="text-sm">Moon Phase: <strong>{moon_phase}</strong></span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <Droplets className="w-5 h-5 mr-2 text-blue-600" />
            <span>Moon Illumination: {moon_illumination}%</span>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Moon Illumination</p>
            <Progress value={moon_illumination} className="h-2" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className={clsx("w-full max-w-md mx-auto", className)}>
      <CardHeader>
        <CardTitle>Astronomy Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="city" className="text-sm font-medium">City</label>
            <Input
              id="city"
              value={city}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
              placeholder="Enter city name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date || undefined}
                  onSelect={(value: Date | undefined) => setDate(value || null)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Loading...' : 'Get Astronomy Data'}
          </Button>
        </form>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {renderWeatherInfo()}
      </CardContent>
    </Card>
  );
};

export default WeatherCardAstronomy;
