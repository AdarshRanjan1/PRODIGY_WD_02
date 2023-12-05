//https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=97c614986ba269b9de3fa25350b322be

import React, {useEffect, useState} from 'react'
import './style.css'
import Weathercard from './weathercard';

const Temp = () => {
  const [searchValue, setSearchValue] = useState('mumbai');
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async() =>{
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=97c614986ba269b9de3fa25350b322be`;
      
      let res = await fetch(url);
      let data = await res.json();
      // console.table(data);

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      // console.log(sunset);

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset
      };  

      // console.log(myNewWeatherInfo.temp);

      setTempInfo(myNewWeatherInfo);

      
    }
    catch (error){
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className='wrap'> 
        <div className='search'>
          <input type='search'
            placeholder='Search...'
            autoFocus
            id='search'
            className='searchTerm'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button className='searchButton' type='button' onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>

    <Weathercard tempInfo={tempInfo}  />
    </>
  )
}

export default Temp
