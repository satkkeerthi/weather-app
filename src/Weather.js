import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from './APIconfig.json';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const API_KEY = config.API_KEY;
    const baseURL = 'http://api.openweathermap.org/data/2.5/weather';

    useEffect(() => {
        if (city) {
        axios
            .get(`${baseURL}?q=${city}&appid=${API_KEY}&units=metric`)
            .then((response) => {
            setWeatherData(response.data);
            })
            .catch((error) => console.error('Error fetching data: ', error));
        }
    }, [city]);

    const handleSearch = (e) => {
        if (e.key === 'Enter' && city.trim()) {
        setCity(city.trim());
        }
    };

return (
    <div>
        <input
            type="text"
            placeholder="Enter city"
            list="city-list"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleSearch}
        />
        {weatherData && (
            <div>
                <h2>{weatherData.name}</h2>
                <p>{weatherData.weather[0].description}</p>
                <p>Temperature: {weatherData.main.temp}°C</p>
                <p>Humidity: {weatherData.main.humidity}%</p>
                <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            </div>
        )}
    </div>
);
};

export default Weather;
