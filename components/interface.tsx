//INTERFACE USED IN INDEX.TXS
export interface dataGeo{
    latitudeFromAPI: number,
    longitudeFromAPI: number
};

export interface dataGeoErr{
    codeFromAPI: number,
    messageFromAPI: string
};

export interface optionsFetch{
    enableHighAccuracy: boolean,
    timeout: number,
    maximumAge: number
};

export interface typeErrorCallback{
    code: number,
    message: string
};

export interface typeSuccessCallback{
    coords: GeolocationCoordinates,
    timestamp: number
};

interface GeolocationCoordinates{
    accuracy: number,
    altitude: number | null,
    altitudeAccuracy: number | null,
    heading: number | null,
    latitude: number,
    longitude: number,
    speed: number | null
};

//INTERFACE USED IN WEATHERAPP.TSX
export interface typeSelected{
    mode: string,
    lenguage: string,
    degrees: string
};

export interface errPollution{
    code: number,
    message: string
};

export interface dataPollution{
    coord: Coord,
    list: List[]
};

interface Main{
    aqi: number;
};

interface List {
    main:       Main;
    components: { [key: string]: number };
    dt:         number;
};

export interface allDataGeo {
    coord:      Coord;
    weather:    Weather[];
    base:       string;
    main:       Main;
    visibility: number;
    wind:       Wind;
    clouds:     Clouds;
    dt:         number;
    sys:        Sys;
    timezone:   number;
    id:         number;
    name:       string;
    cod:        number;
};

interface Coord {
    lon: number;
    lat: number;
};

interface Clouds {
    all: number;
};

interface Main {
    temp:       number;
    feels_like: number;
    temp_min:   number;
    temp_max:   number;
    pressure:   number;
    humidity:   number;
    sea_level:  number;
    grnd_level: number;
};

interface Sys {
    country: string;
    sunrise: number;
    sunset:  number;
};

interface Weather {
    id:          number;
    main:        string;
    description: string;
    icon:        string;
};

interface Wind {
    speed: number;
    deg:   number;
    gust:  number;
};