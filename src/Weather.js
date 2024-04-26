import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';

function Weather() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
  
    const apiKey = 'f0256276009d9809bd8189e577cefd4c';
  
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        setWeather(response.data);
        setError(null);
      } catch (err) {
        setError('City not found or API error');
        setWeather(null);
      }
    };
  
    const getWeatherClass = () => {
      if (weather) {
        const condition = weather.weather[0].main.toLowerCase();
        if (condition.includes('rain')) {
          return 'rainy';
        } else if (condition.includes('cloud')) {
          return 'cloudy';
        } else if (condition.includes('clear')) {
          return 'sunny';
        }
        else if (condition.includes('haze')) {
            return 'haze';
          }
      }
      return '';
    };
  
    return (
      <div className={`weather-wrapper ${getWeatherClass()}`}>
        <div className="weather-background">
          <div className="overlay"></div>
          <div className="weather-content">
            <h1>Weather App</h1>
            <div className="container">
              <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <button onClick={fetchWeather}>Get Weather</button>
            </div>
  
            {weather && (
              <div>
                <h2>
                  {weather.name}, {weather.sys.country}
                </h2>
                <p>Temperature: {weather.main.temp}°C</p>
                <p>Condition: {weather.weather[0].description}</p>
              </div>
            )}
  
            {error && <p>{error}</p>}
          </div>
        </div>
      </div>
    );
}

export default Weather;