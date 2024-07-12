import { useMutation } from 'react-query';
import { apiV2 } from '../services/api';
import { WeatherData } from '../types/WeatherData';

const fetchWeatherDataByCity = async ({ city }: { city: string }) => {
  if (process.env.WEATHER_API_KEY) {
    const { data } = await apiV2.get<WeatherData>(
      `/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`,
    );
    return data;
  }
};

const useWeatherDataByCity = () => {
  return useMutation<WeatherData, unknown, { city: string }>(({ city }) =>
    fetchWeatherDataByCity({ city }),
  );
};

export default useWeatherDataByCity;
