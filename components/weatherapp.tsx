import { NextPage } from "next";
import { allDataGeo, dataGeo, dataGeoErr, dataPollution, errPollution, typeSelected } from "./interface";
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Loading } from "./load";
import Link from "next/link";

type Option = {
  value: string;
  label: string;
};

export const options:Option[] = [
  { value: 'af', label: 'Afrikaans' },
  { value: 'al', label: 'Albanian' },
  { value: 'ar', label: 'Arabic' },
  { value: 'az', label: 'Azerbaijani' },
  { value: 'bg', label: 'Bulgarian' },
  { value: 'ca', label: 'Catalan' },
  { value: 'cz', label: 'Czech' },
  { value: 'da', label: 'Danish' },
  { value: 'de', label: 'German' },
  { value: 'el', label: 'Greek' },
  { value: 'en', label: 'English' },
  { value: 'eu', label: 'Basque' },
  { value: 'fa', label: 'Persian-Farsi' },
  { value: 'fi', label: 'Finnish' },
  { value: 'fr', label: 'French' },
  { value: 'gl', label: 'Galician' },
  { value: 'he', label: 'Hebrew' },
  { value: 'hi', label: 'Hindi' },
  { value: 'hr', label: 'Croatian' },
  { value: 'hu', label: 'Hungarian' },
  { value: 'id', label: 'Indonesian' },
  { value: 'it', label: 'Italian' },
  { value: 'ja', label: 'Japanese' },
  { value: 'kr', label: 'Korean' },
  { value: 'la', label: 'Latvian' },
  { value: 'lt', label: 'Lithuanian' },
  { value: 'mk', label: 'Macedonian' },
  { value: 'no', label: 'Norwegian' },
  { value: 'nl', label: 'Dutch' },
  { value: 'pl', label: 'Polish' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'pt_br', label: 'Português Brasil' },
  { value: 'ro', label: 'Romanian' },
  { value: 'ru', label: 'Russian' },
  { value: 'sv', label: 'Swedish' },
  { value: 'sk', label: 'Slovak' },
  { value: 'sl', label: 'Slovenian' },
  { value: 'es', label: 'Spanish' },
  { value: 'sr', label: 'Serbian' },
  { value: 'th', label: 'Thai' },
  { value: 'tr', label: 'Turkish' },
  { value: 'ua', label: 'Ukrainian' },
  { value: 'vi', label: 'Vietnamese' },
  { value: 'zh_cn', label: 'Chinese Simplified' },
  { value: 'zh_tw', label: 'Chinese Traditional' },
  { value: 'zu', label: 'Zulu' }
];

export const WeatherApp:NextPage<{geolocation:dataGeo, setGeolocationErr:Dispatch<SetStateAction<dataGeoErr>>}> = ({geolocation, setGeolocationErr}) => {
  const [dataWeather, setDataWeather] = useState<allDataGeo>();
  const [dataWeatherPollution, setDataWeatherPollution] = useState<dataPollution>();
  const [catchdata, setCatchdata] = useState<boolean>(false);
  const [err, setErr] = useState<errPollution>({
    code: 0,
    message: ""
  });
  const [selected, setSelected] = useState<typeSelected>({
    mode: "normal",
    lenguage: "en",
    degrees: "metric"
  });

  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>):void =>{
    setSelected({
      ...selected,
      [e.target.name]: e.target.value
    });
  };

  async function GetDataWeather(abortController:AbortController):Promise<void>{
    try{
      setCatchdata(false);
      let url:RequestInfo = `https://api.openweathermap.org/data/2.5/weather?lat=${geolocation.latitudeFromAPI}&lon=${geolocation.longitudeFromAPI}&appid=f407aaedf1c4eafa4138ef2dd93cb636&lang=${selected.lenguage}&units=${selected.degrees}`;
      const response:Response = await fetch(url, {
        signal: abortController.signal,
      });

      if(!response.ok){
        setGeolocationErr({codeFromAPI: response.status, messageFromAPI: response.statusText});
        const message = `An error has occured: ${response.status} -- ${response.statusText}`;
        throw new Error(message);
      };

      const data:allDataGeo = await response.json();
      setDataWeather(data);
    }catch(err){
      setGeolocationErr({codeFromAPI: 500, messageFromAPI: "Failed to fetch::ERR_NOT_RESOLVED."});
      console.error(err);
    }finally{
      setCatchdata(true);
    };
  };

  async function GetDataWeatherPollution(abortController:AbortController):Promise<void> {
    if(selected.mode !== "scientists") return;
    try{
      let urlPollution:RequestInfo = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${geolocation.latitudeFromAPI}&lon=${geolocation.longitudeFromAPI}&appid=f407aaedf1c4eafa4138ef2dd93cb636`;
      const responsePollution:Response = await fetch(urlPollution, {
        signal: abortController.signal,
      });

      if(!responsePollution.ok){
        setErr({code: responsePollution.status, message: responsePollution.statusText});
        const message = `An error has occured: ${responsePollution.status} -- ${responsePollution.statusText}`;
        throw new Error(message);
      };

      const dataPollution:dataPollution = await responsePollution.json()
      setDataWeatherPollution(dataPollution);
    }catch(err){
      setErr({code: 500, message: "Failed to fetch::ERR_NOT_RESOLVED."});
      console.error(err);
    };
  };

  useEffect(()=>{
    if(geolocation.latitudeFromAPI === 0) return;
    if(geolocation.longitudeFromAPI === 0) return;

    const abortController:AbortController = new AbortController();
    setTimeout(() => abortController.abort(), 8000);

    GetDataWeather(abortController);
    GetDataWeatherPollution(abortController);
  }, [geolocation, selected]);

  return(
    <div className="relative flex flex-col justify-center overflow-hidden bg-gray-50 sm:p-4 rounded-lg">
    <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10 drop-shadow-2xl">
      <div className="mx-auto max-w-md">
        <div className="divide-y divide-gray-300/50">
          {!catchdata &&
            <Loading message="Catching data.." width={40} height={20}/>
          }
          {catchdata &&
            <div className="space-y-6 text-base leading-7 text-cyan-800">
              <Link href="forecast" legacyBehavior>
                <a className="text-blue-600 visited:text-purple-600">Go to Forecast</a>
              </Link>
              <p>This are your weather&lsquo;s charactericts:</p>
              <p>Temperature is in {selected.degrees === "metric" && "Celsius"} {selected.degrees === "imperial" && "Fahrenheit"} {selected.degrees === "" && "Kelvin"} </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="11" />
                    <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                  </svg>
                  <p className="ml-4">
                    Name of your city: <strong>{dataWeather?.name}</strong> <br />
                    Coordinates: <strong>{dataWeather?.coord.lat} and {dataWeather?.coord.lon}</strong>
                  </p>
                </li>
                <li className="flex items-center">
                  <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="11" />
                    <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                  </svg>
                  <p className="ml-4">
                    Weather&lsquo;s group: <strong>{dataWeather?.weather[0].main}</strong> <br />
                    Mainly: <strong>{dataWeather?.weather[0].description}</strong>
                  </p>
                </li>
                <li className="flex items-center">
                  <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="11" />
                    <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                  </svg>
                  <p className="ml-4">
                    Your weather presence: <br />
                    Pressure: <strong>{dataWeather?.main.pressure} hPa</strong> <br />
                    Humidity: <strong>{dataWeather?.main.humidity} %</strong> <br />
                    Temperature: <strong>{dataWeather?.main.temp} </strong><br />
                    Temperature_min: <strong>{dataWeather?.main.temp_min}</strong> and Temperature_max: <strong>{dataWeather?.main.temp_max}</strong> <br />
                    But, It can be feels like: <strong>{dataWeather?.main.feels_like} </strong><br />
                    Speed_Wind: <strong>{dataWeather?.wind.speed} meter/sec</strong> <br />
                    Direction_Wind: <strong>{dataWeather?.wind.deg} degrees</strong> <br />
                    Gust_Wind: <strong>{dataWeather?.wind.gust} meter/sec</strong> <br />
                  </p>
                </li>
                <li className="flex items-center">
                  <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="11" />
                    <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                  </svg>
                  <p className="ml-4">
                    In your Country: <strong>{dataWeather?.sys.country}</strong> <br />
                    Sunset: <strong>{new Date(dataWeather!.sys.sunset).toISOString().slice(11, 19)}</strong> <br />
                    Sunrise: <strong>{new Date(dataWeather!.sys.sunrise).toISOString().slice(11, 19)}</strong>
                  </p>
                </li>
              </ul>
              <p>You are in the mode normal, you are able to change a mode scientists.</p>
              <p>You are able to change the lenguage, only change info about Mainly and Weather&lsquo;s group</p>
              <p>Here, below: </p>
              <select name="mode" className="border-dashed border-2 border-indigo-600" value={selected.mode} onChange={handleChange}>
                <option value="normal">Normal</option>
                <option value="scientists">Scientists</option>
              </select>
              <select name="lenguage" className="border-dashed border-2 border-indigo-600" value={selected.lenguage} onChange={handleChange}>
              {options.map((option) => (
                <option value={option.value} key={option.value} >{option.label}</option>
              ))}
              </select>
              {selected.mode === "scientists" &&
                <select name="degrees" className="border-dashed border-2 border-indigo-600" value={selected.degrees} onChange={handleChange}>
                  <option value="metric">Celsius</option>
                  <option value="imperial">Fahrenheit</option>
                  <option value="">Kelvin</option>
                </select>
              }
            </div>
          }
          {selected.mode === "scientists" && dataWeatherPollution === undefined && err.message === "" &&
            <Loading message="Catching data.." width={40} height={20}/>
          }
          {selected.mode === "scientists" && dataWeatherPollution !== undefined && err.message === "" &&
            <div className="pt-8 text-base leading-7">
            <p className="space-y-6 py-4 font-semibold">Scientists Mode</p>
            <p className="py-2">This data indicate particle&lsquo;s concentration in air of your weather</p>
            <ul className="space-y-4">
              <li className="flex items-center">
                <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="11" />
                  <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                </svg>
                <p className="ml-4">
                  concentration of CO-Carbon monoxide: <strong>{dataWeatherPollution?.list[0].components.co} μg/m3</strong> <br />
                  concentration of NO-Nitrogen monoxide: <strong>{dataWeatherPollution?.list[0].components.no} μg/m3</strong> <br />
                  concentration of NO2-Nitrogen dioxide: <strong>{dataWeatherPollution?.list[0].components.no2} μg/m3</strong> <br />
                  concentration of O3-Ozone: <strong>{dataWeatherPollution?.list[0].components.o3} μg/m3</strong> <br />
                  concentration of SO2-Sulphur dioxide: <strong>{dataWeatherPollution?.list[0].components.so2} μg/m3</strong> <br />
                  concentration of NH3-Ammonia: <strong>{dataWeatherPollution?.list[0].components.nh3} μg/m3</strong> <br />
                  concentration of PM2.5-Fine particles matter: <strong>{dataWeatherPollution?.list[0].components["pm2_5"]} μg/m3</strong> <br />
                  concentration of PM10-Coarse particulate matter: <strong>{dataWeatherPollution?.list[0].components.pm10} μg/m3</strong> <br />
                </p>
              </li>
              <li className="flex items-center">
                <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="11" />
                  <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                </svg>
                <p className="ml-4">
                  <strong>Your Air Quality Index is {dataWeatherPollution?.list[0].main.aqi}.</strong> <br />
                  Where 1 = Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor.
                </p>
              </li>
            </ul>
            </div>
          }
          {err.message !== "" && selected.mode === "scientists" &&
          <>
            <p>{err.code}</p>
            <p>{err.message}</p>
            <p>Try refresh the page</p>
          </>
          }
        </div>
      </div>
    </div>
    </div>
  )
};