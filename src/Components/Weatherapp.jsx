import React, { useState } from "react";
import axios from "axios";

import cloud from "/src/assets/images/Clouds.png";
import rain from "/src/assets/i mages/Rain.png";
import clear from "/src/assets/images/clearjan.webp";
import mist from "/src/assets/images/mist.png";
import err from "/src/assets/images/8902954.webp";
import world from "/src/assets/images/world.png";

import { CiSearch } from "react-icons/ci";

const WeatherApp = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "6d83156e4e40ca97d0c6924b832fe00c";

  const handleInput = (event) => {
    setSearch(event.target.value);
  };

  const myFun = async () => {
    if (search.trim() === "") {
      setError("Please enter a valid city name!");
      setData(null);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`
      );
      console.log("API Response:", response);
      console.log("Response Data:", response.data);

      setData(response.data);
      setError("");
    } catch {
      setError("Please enter a valid city name!");
      setData(null);
    }

    setSearch("");
  };

  const getLocalTime = (timezoneOffset) => {
    if (!timezoneOffset) return { time: "N/A", day: "N/A" };

    const utcNow = new Date();
    const localTime = new Date(utcNow.getTime() + timezoneOffset * 1000);
    const dayName = localTime.toLocaleDateString("en-US", { weekday: "long" });

    return {
      time: localTime.toLocaleString(),
      day: dayName,
    };
  };

  const getWeatherImage = (weather) => {
    switch (weather) {
      case "Clouds":
        return cloud;
      case "Rain":
        return rain;
      case "Clear":
        return clear;
      case "Mist":
        return mist;
      case "Haze":
        return cloud;
      default:
        return "";
    }
  };

  return (
    <div className="main">
      <div className="container">
        <div className="left">
          <div className="end">
            <div className="endleft">
              {data && (
                <>
                  <h1>
                    Local Time :
                    <br /> {getLocalTime(data?.timezone).time}
                  </h1>
                  <p>Day : {getLocalTime(data?.timezone).day}</p>
                </>
              )}
            </div>
            <div className="endright">
              {data && data.main && <h2>{Math.trunc(data.main.temp)}°C</h2>}
            </div>
          </div>
        </div>
        <div className="right">
          <div className="inputs">
            <input
              type="text"
              placeholder="Enter city name"
              value={search}
              onChange={handleInput}
            />
            <button onClick={myFun}>
              <CiSearch className="icon" size={20} />
            </button>
          </div>

          {error && (
            <div className="errorPage">
              <p>{error}</p>
              <img
                src={err}
                onError={() => console.log("Error image failed to load")}
              />
            </div>
          )}

          {data && data.weather && (
            <div className="weathers">
              {/* <h2 className="cityName">{data.name}</h2> */}
              <div className="imagesss">
                <img
                  className="weather-icon"
                  src={getWeatherImage(data.weather[0].main)}
                  alt={data.weather[0].main}
                />
              </div>
              <p className="climate">climate : {data.weather[0].description}</p>

              <div className="countrynameandcity">
                <h2 className="cityName">
                  {data.name} {data.sys.country}
                </h2>
                <div className="contryflags">
                  <img src={world} alt="" />
                </div>
              </div>
            </div>
          )}
          <div className="weatherinformation">
            {data && data.main && data.weather && (
              <>
                <h2>
                  Temperature: {Math.trunc(data.main.temp)}°C{" "}
                  {data.weather[0].description}
                </h2>
                <h2>Visibility: {data.visibility}m</h2>
                <h2>Wind Speed: {data.wind.speed} m/s</h2>
                <h2>Humidity: {data.main.humidity}%</h2>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
