import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from './APIconfig.json';
import './Weather.css';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const API_KEY = config.API_KEY;
    const baseURL = 'http://api.openweathermap.org/data/2.5/weather';

    useEffect(() => {
        if (city) {
        axios
            .get(`${baseURL}?q=${city}&appid=${API_KEY}&units=metric`)
            .then((response) => {
                setWeatherData(response.data);
            })
            .catch((error) => console.error('Error fetching weather data: ', error));
        axios
            .get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
            .then((response) => {
                setForecastData(response.data);
            })
            .catch((error) => console.error('Error fetching forecast data: ', error));
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
        {forecastData && (
            <div>
                <h2 style={{ fontSize: '30px' }}>5-Day Forecast</h2>
                <div style={{ display: 'flex', overflowX: 'scroll' }}>
                    {forecastData.list
                        .filter((forecast) => 
                            new Date(forecast.dt * 1000).getHours() === 12
                        )
                        .map((forecast, index) => (
                            <div key={index} style={{ marginRight: '20px', minWidth: '150px' }}>
                                <p style={{ fontSize: '20px' }}>{new Date(forecast.dt * 1000).toLocaleDateString()}</p>
                                <img 
                                    src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} 
                                    alt={forecast.weather[0].description} 
                                    style={{ width: '50px', height: '50px' }}
                                />
                                <p style={{ fontSize: '20px' }}>{forecast.weather[0].description}</p>
                                <p style={{ fontSize: '20px' }}>Temperature: {forecast.main.temp}°C</p>
                                <p style={{ fontSize: '20px' }}>Humidity: {forecast.main.humidity}%</p>
                                <p style={{ fontSize: '20px' }}>Wind Speed: {forecast.wind.speed} m/s</p>
                            </div>
                        ))}
                </div>
            </div>
        )}
    </div>
);
};

export default Weather;
