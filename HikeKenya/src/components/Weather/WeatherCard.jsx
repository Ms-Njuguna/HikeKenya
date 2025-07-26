import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@ark-ui/react/hover-card";
import { Sun, ThermometerSun,  Wind,  Cloud,  CloudSun,  CloudRain,  Info } from "lucide-react";

export default function WeatherCard({ temperature, condition, windSpeed, tips }) {
  const getConditionIcon = (condition) => {
    switch (condition) {
      case "Sunny":
        return <Sun size={20} className="text-yellow-500" />;
      case "Cloudy":
        return <Cloud size={20} className="text-gray-400" />;
      case "Partly Cloudy":
        return <CloudSun size={20} className="text-yellow-400" />;
      case "Windy":
        return <Wind size={20} className="text-blue-400" />;
      case "Rainy":
        return <CloudRain size={20} className="text-blue-600" />;
      default:
        return <Sun size={20} className="text-yellow-500" />;
    }
  };

  return (
    <div className="relative z-10 p-4 bg-white/70 backdrop-blur-md rounded-[8px] shadow-md flex items-center justify-between space-x-6 border border-gray-100">
      <div className="flex items-center gap-2 text-gray-800">
        {getConditionIcon(condition)}
        <span className="font-medium">{condition}</span>
      </div>

      <div className="flex flex-col text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <ThermometerSun size={16} className="text-orange-500" />
          <span>{temperature} °C</span>
        </div>
        <div className="flex items-center gap-1">
          <Wind size={16} className="text-sky-500" />
          <span>{windSpeed} km/h</span>
        </div>
      </div>

      {/* Make this relatively positioned so HoverCardContent can be absolute */}
      <HoverCard.Root openDelay={0}>
        <HoverCardTrigger className="text-green-700 hover:text-green-900 transition-colors">
          <Info size={18} className="cursor-pointer faq-icon" />
        </HoverCardTrigger>

        <HoverCardContent
        className="absolute bottom-full right-0 mb-2 z-[9999] text-sm p-3 bg-white rounded-[8px] shadow-xl border border-gray-200 w-64"
        >
          <p className="font-semibold text-gray-800 mb-1">Weather Tips:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </HoverCardContent>
      </HoverCard.Root>
    </div>
  );
}
