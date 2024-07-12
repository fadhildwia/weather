import { useMutation } from 'react-query';
import api from '../services/api';
import { WeatherData } from '../types/WeatherData';
import { WEATHER_API_KEY } from '@env';

const fetchWeatherDataByCity = async ({ city }: { city: string }) => {
  const { data } = await api.get<WeatherData>(
    `/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`,
  );
  return data;
};

const useWeatherDataByCity = () => {
  return useMutation<WeatherData, unknown, { city: string }>(({ city }) =>
    fetchWeatherDataByCity({ city }),
  );
};

export default useWeatherDataByCity;
