import axios from "axios";

export default async function getWeather() {
    if (global.weatherTimestamp === undefined || Date.now() > global.weatherTimestamp + 60000 * 30) {
        const response = await axios.get('https://weatherapi-com.p.rapidapi.com/current.json', {
            params: {q: '59.934,30.335'},
            headers: {
                'X-RapidAPI-Key': process.env.WEATHER_KEY,
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        });

        global.weatherValue = {
            temperature: response.data.current.temp_c,
            humidity: response.data.current.humidity,
            wind: response.data.current.wind_kph,
            region: response.data.location.name
        };

        global.weatherTimestamp = Date.now();
    }

    return global.weatherValue;
}