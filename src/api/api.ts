import axios from 'axios';
interface WeatherData {
  station_sk: string;
  time: string;
  humidity: number;
  pressure: number;
  temperature: number;
  altitude: number;
}
const apiUrl = 'http://192.168.105.81:8080/Data';
const apiUrl2 = 'http://192.168.105.81:8080/LastRecords';

export async function getWeatherData(): Promise<WeatherData | null> {
  try {
    const response = await axios.get<WeatherData>(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error featching weather data:', error);
    return null;
  }
}

export async function getWeatherLastRecords(): Promise<WeatherData | null> {
  try {
    const response = await axios.get<WeatherData[]>(apiUrl2);
    return response.data.length > 0
      ? response.data[response.data.length - 1]
      : null;
  } catch (error) {
    console.error('Error featching weather data:', error);
    return null;
  }
}
