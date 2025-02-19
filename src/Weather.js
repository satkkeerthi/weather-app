import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from './APIconfig.json';
import './Weather.css';

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
            style={{ fontSize: '20px', padding: '10px' }}
        />
        {weatherData && (
            <div>
                <h2 style={{ fontSize: '30px' }}>{weatherData.name}</h2>
                <img 
                    src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                    alt={weatherData.weather[0].description} 
                    style={{ width: '100px', height: '100px' }}
                />
                <p style={{ fontSize: '20px' }}>{weatherData.weather[0].description}</p>
                <p style={{ fontSize: '20px' }}>Temperature: {weatherData.main.temp}°C</p>
                <p style={{ fontSize: '20px' }}>Humidity: {weatherData.main.humidity}%</p>
                <p style={{ fontSize: '20px' }}>Wind Speed: {weatherData.wind.speed} m/s</p>
            </div>
        )}
    </div>
);
};

export default Weather;
