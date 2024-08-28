import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Droplets, Wind, Sun } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import clsx from 'clsx';

interface WeatherData {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        avgtemp_c: number;
        maxwind_kph: number;
        totalprecip_mm: number;
        avghumidity: number;
        condition: {
          text: string;
          icon: string;
        };
        uv: number;
      };
      astro: {
        sunrise: string;
        sunset: string;
        moon_phase: string;
      };
    }>;
  };
}

interface WeatherCardProps {
  className?: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ className }) => {
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
      const response = await fetch(`/api/future?city=${encodeURIComponent(city)}&date=${format(date, 'yyyy-MM-dd')}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch weather data');
      }
      const data: WeatherData = await response.json();
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
    const dayData = weather.forecast.forecastday[0].day;
    const astroData = weather.forecast.forecastday[0].astro;

    return (
      <div className="mt-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">{weather.location.name}, {weather.location.country}</h3>
          <p className="text-sm text-gray-500">{format(new Date(weather.location.localtime), 'PPpp')}</p>
        </div>
        <div className="flex items-center space-x-4">
          <img src={dayData.condition.icon} alt={dayData.condition.text} className="w-16 h-16" />
          <div>
            <p className="text-3xl font-bold">{dayData.avgtemp_c}°C</p>
            <p className="text-sm text-gray-500">{dayData.condition.text}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Droplets className="w-5 h-5 mr-2" />
            <span>Humidity: {dayData.avghumidity}%</span>
          </div>
          <div className="flex items-center">
            <Wind className="w-5 h-5 mr-2" />
            <span>Wind: {dayData.maxwind_kph} km/h</span>
          </div>
          <div className="flex items-center">
            <Sun className="w-5 h-5 mr-2" />
            <span>UV Index: {dayData.uv}</span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="w-5 h-5 mr-2" />
            <span>Moon: {astroData.moon_phase}</span>
          </div>
        </div>
        <div className="space-y-2">
          <p>Temperature Range: {dayData.mintemp_c}°C - {dayData.maxtemp_c}°C</p>
          <p>Precipitation: {dayData.totalprecip_mm} mm</p>
          <p>Sunrise: {astroData.sunrise} | Sunset: {astroData.sunset}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">UV Index</p>
          <Progress value={dayData.uv * 10} className="h-2" />
        </div>
      </div>
    );
  };

  return (
    <Card className={clsx("w-full max-w-md mx-auto", className)}>
      <CardHeader>
        <CardTitle>Weather Forecast</CardTitle>
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
            {loading ? 'Loading...' : 'Get Weather'}
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

export default WeatherCard;
