import { useQuery, UseQueryOptions } from 'react-query';
import { WeatherData } from '../types/WeatherData';
import { apiV2 } from '../services/api';

const fetchWeatherData = async ({
  latitude,
  longitude,
}: {
  latitude: number | string;
  longitude: number | string;
}) => {
  const { data } = await apiV2.get<WeatherData>(
    `/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}&units=metric`,
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
