import { NextPage } from "next";
import { ListForecast, typeSelected } from "./interface";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export const ModelForecast:NextPage<{weatherForecast:ListForecast, selected:typeSelected, setSelected:Dispatch<SetStateAction<typeSelected>>}> = ({weatherForecast, selected, setSelected}) =>{
  const handleChange = (e:any):void =>{
    setSelected({
      ...selected,
      [e.target.name]: e.target.value
    });
  };  
  
  return(
    <div className="relative justify-center overflow-hidden py-6 sm:py-12">
        <div className="relative bg-white pt-10 pb-8 shadow-xl sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
        <div className="mx-auto max-w-md">
        <div>
        <p>Date: {String(weatherForecast["dt_txt"])} <br />
            <Link href="/" legacyBehavior>
                <a className="text-blue-600 visited:text-purple-600">Go Home</a>
            </Link>
        </p>
          <div className="space-y-6 py-8 leading-7 columns-2 border-y-2 border-lime-700">
            <ul className="space-y-4 container mx-auto">
            <li className="flex items-center">
                <p>Description of weather:</p>
                <p className="ml-4">
                   <strong>{weatherForecast.weather[0].description}</strong>
                </p>
              </li>
              <li className="flex items-center">
                <p>Group:</p>
                <p className="ml-4">
                    <strong>{weatherForecast.weather[0].main}</strong>
                </p>
              </li>
              <li className="flex items-center">
                <p>Temperature:</p>
                <p className="ml-4">
                    <strong>{weatherForecast.main.temp}</strong>
                </p>
              </li>
              <li className="flex items-center">
              <p>Temperature_Min:</p>
                <p className="ml-4">
                    <strong>{weatherForecast.main["temp_min"]}</strong>
                </p>
              </li>
              <li className="flex items-center">
              <p>Temperature_Max:</p>
                <p className="ml-4">
                    <strong>{weatherForecast.main["temp_max"]}</strong>
                </p>
              </li>
              <li className="flex items-center">
              <p>Temp. Can feels as:</p>
                <p className="ml-4">
                    <strong>{weatherForecast.main["feels_like"]}</strong>
                </p>
              </li>
              <li className="flex items-center">
                <p>Humidity:</p>
                <p className="ml-4">
                    <strong>{weatherForecast.main.humidity} %</strong>
                </p>
              </li>
              <li className="flex items-center">
                <p>Pressure:</p>
                <p className="ml-4">
                    <strong>{weatherForecast.main.pressure} hPa</strong>
                </p>
              </li>
              <li className="flex items-center">
                <p>Direction_Wind:</p>
                <p className="ml-4">
                    <strong>{weatherForecast.wind.deg} degrees</strong>
                </p>
              </li>
              <li className="flex items-center">
                <p>Speed_Wind:</p>
                <p className="ml-4">
                    <strong>{weatherForecast.wind.speed} meter/sec</strong>
                </p>
              </li>
              <li className="flex items-center">
                <p>Gust_Wind:</p>
                <p className="ml-4">
                    <strong>{weatherForecast.wind.gust} meter/sec</strong>
                </p>
              </li>
            </ul>
          </div>
          <p className="italic">If you want to change the Lenguage or change Temperature&lsquo;s degree, below: </p>
          <select name="lenguage" className="border-dashed border-2 border-indigo-600" value={selected.lenguage} onChange={handleChange}>
              <option value="af">Afrikaans</option>
              <option value="al">Albanian</option>
              <option value="ar">Arabic</option>
              <option value="az">Azerbaijani</option>
              <option value="bg">Bulgarian</option>
              <option value="ca">Catalan</option>
              <option value="cz">Czech</option>
              <option value="da">Danish</option>
              <option value="de">German</option>
              <option value="el">Greek</option>
              <option value="en">English</option>
              <option value="eu">Basque</option>
              <option value="fa">Persian-Farsi</option>
              <option value="fi">Finnish</option>
              <option value="fr">French</option>
              <option value="gl">Galician</option>
              <option value="he">Hebrew</option>
              <option value="hi">Hindi</option>
              <option value="hr">Croatian</option>
              <option value="hu">Hungarian</option>
              <option value="id">Indonesian</option>
              <option value="it">Italian</option>
              <option value="ja">Japanese</option>
              <option value="kr">Korean</option>
              <option value="la">Latvian</option>
              <option value="lt">Lithuanian</option>
              <option value="mk">Macedonian</option>
              <option value="no">Norwegian</option>
              <option value="nl">Dutch</option>
              <option value="pl">Polish</option>
              <option value="pt">Portuguese</option>
              <option value="pt_br">Português Brasil</option>
              <option value="ro">Romanian</option>
              <option value="ru">Russian</option>
              <option value="sv">Swedish</option>
              <option value="sk">Slovak</option>
              <option value="sl">Slovenian</option>
              <option value="es">Spanish</option>
              <option value="sr">Serbian</option>
              <option value="th">Thai</option>
              <option value="tr">Turkish</option>
              <option value="ua">Ukrainian</option>
              <option value="vi">Vietnamese</option>
              <option value="zh_cn">Chinese Simplified</option>
              <option value="zh_tw">Chinese Traditional</option>
              <option value="zu">Zulu</option>
          </select>
          <select name="degrees" className="border-dashed border-2 border-indigo-600" value={selected.degrees} onChange={handleChange}>
            <option value="metric">Celsius</option>
            <option value="imperial">Fahrenheit</option>
            <option value="">Kelvin</option>
          </select>
        </div>
        </div>
        </div>
    </div>
    );
};