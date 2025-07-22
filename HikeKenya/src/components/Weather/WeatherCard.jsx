import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@ark-ui/react/hover-card';
import { Sun, ThermometerSun, Wind, Cloud, CloudSun, CloudRain } from 'lucide-react';

export default function WeatherCard({ temperature, condition, windSpeed, tips }) {
    const getConditionIcon = (condition) => {
        switch (condition) {
            case "Sunny":
              return <Sun />;
            case "Cloudy":
              return <Cloud />;
            case "Partly Cloudy":
              return <CloudSun />;
            case "Windy":
              return <Wind />;
            case "Rainy":
                return <CloudRain />;
            default:
                return <Sun />;
        }
    };

    return(
        <div>
            <div>
                {getConditionIcon(condition)}
                <span>{condition}</span>
            </div>
            <div>
                <div>
                    <ThermometerSun size={10}/>
                    <span>{temperature} °C</span>
                </div>
                <div>
                    <Wind size={10}/>
                    <span>{windSpeed} km/h</span>
                </div>
                <HoverCard.Root>
                    <HoverCardTrigger>Weather Tips </HoverCardTrigger>
                    <HoverCardContent>
                        <ul>
                            {tips.map((tip,index) => (
                                <li key={index}> {tip}</li>
                            ))}
                        </ul>
                    </HoverCardContent>
                </HoverCard.Root>
            </div>
        </div>
    );
};