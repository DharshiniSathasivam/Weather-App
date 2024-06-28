import './App.css'

//image icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchengin } from '@fortawesome/free-brands-svg-icons'


import windIcon from './assets/wind.png'
import sun from './assets/sun.png'
import storm from './assets/storm.png'
import snow from './assets/snow.png'
import humidityIcon from './assets/humidity.png'
import clouds from './assets/clouds.png'
import drizzleIcon from './assets/drizzle.png'
import { useEffect, useState } from 'react';

const WeatherDetails=({icon , temp ,city ,contry,lat ,log,humidity,wind})=>{
  return(
    <>
    <div className='image'>
      <img src={icon} alt='sun'/>
      </div>
      <div className='temp'>{temp}°C</div>
      <div className='city'>{city}</div>
      <div className='contry'>{contry}</div>
      <div className='cord'>
        <div>
          <span className="lat">latitude  :</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="log">longitude  :</span>
          <span>{log}</span>
        </div>
      </div>
      <div className='data-container'>
        <div className='element'>
          <img src={humidityIcon} alt='humidity'
          className='icon'/>
          <div className='data'>
            <div className='humidity-percent'>{humidity}%</div>
            <div className='text'>Humidity  </div>
          </div>
        </div> 
        <div className='element'>
          <img src={windIcon} alt='wind'
          className='icon'/>
          <div className='data'>
            <div className='wind-percent'>{wind}km/h </div>
            <div className='text'>Wind Speed </div>
          </div>
        </div>
      </div>
      </>
  )
}
 
function App()    {
  let api_key="1c7ccec9a4f5a18ecb651a18337b58e4";
  const [text,setText]=useState("")
  const [icon,setIcon]=useState(sun)
  const [temp, setTemp]=useState(0)
  const [city,setCity]=useState("London")
  const [country,setCountry]=useState("GB")
  const [lat, setLat]=useState(0)
  const [log, setLog]=useState(0)
  const [humidity,setHumidity]=useState(0)
  const [wind,setWind]=useState(0)
  const[cityNotFound,setCityNotFound]=useState(false)
  const[loading,setLoading]=useState(false)
const[error,setError]=useState(null)
  const weatherIconMap={
    "01d":sun,
    "01n":clouds,
    "02d":clouds,
    "02n":clouds,
    "03d":drizzleIcon,
    "03n":drizzleIcon,
    "04d":drizzleIcon,
    "04n":drizzleIcon,
    "09d":storm,
    "09n":storm,
    "10d":storm,
    "10n":storm,
    "13d":snow,
    "13n":snow,
   };

  const serach =async ( )=>{
    setLoading(true)
 let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric `
 try {
   let res= await fetch(url)
   let data=await res.json()
   if(data.cod==="404"){
     console.log("city not found")
     setCityNotFound(true)
     setLoading(false)
     return;
   }
   setHumidity(data.main.humidity)
   setWind(data.wind.speed)
   setTemp(Math.floor(data.main.temp))
   setCity(data.name)
   setCountry(data.sys.country)
   setLat(data.coord.lat)
   setLog(data.coord.lon)
   const weatherIconCode=data.weather[0].icon;
   setIcon(weatherIconMap[weatherIconCode] || sun )
   setCityNotFound(false)
 } catch (error) {
    console.error("An error occurred:")
  
 }finally{
   setLoading(false) 
 }
  }
  const handleCity=(e)=>{
     setText(e.target.value)
  };
  const handleKeyDown=(e)=>{
    if(e.key==='Enter'){
      serach();
     
    }
  }

  useEffect(function(){
    serach();
  },[])
  return (
    <>
     <div className='container'>
      <div className='input-container'>
        <input type='text' className='cityInput' 
        placeholder='Serach city' onChange={handleCity } 
        value={text} onKeyDown={handleKeyDown}/>
        <div className='serach-Icon' onClick={()=>serach()}>
        <FontAwesomeIcon icon={faSearchengin} bounce style={{color: "#1f1e25"}} />
        </div>
      </div>
      {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} 
      contry={country} lat={lat} log={log} humidity={humidity}
      wind={wind}/>}
      {loading && <div className='Loading-message'>Loading...</div>}
      {error && <div className='error-message'>{error}</div>}
      {cityNotFound&&<div className='city-not-found'>city not found</div>}
     </div>
    </>
  )
}

export default App
