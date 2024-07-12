import { useQuery, UseQueryOptions } from 'react-query';
import api from '../services/api';
import { WeatherData } from '../types/WeatherData';
import { WEATHER_API_KEY } from '@env';

const fetchWeatherData = async ({
  latitude,
  longitude,
}: {
  latitude: number | string;
  longitude: number | string;
}) => {
  const { data } = await api.get<WeatherData>(
    `/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`,
  );
  return data;
};

const useWeatherData = ({
  latitude,
  longitude,
  options,
}: {
  latitude: number | string;
  longitude: number | string;
  options?: UseQueryOptions<WeatherData>;
}) => {
  return useQuery({
    queryKey: ['weatherData', latitude, longitude],
    queryFn: () => fetchWeatherData({ latitude, longitude }),
    ...options,
  });
};

export default useWeatherData;
