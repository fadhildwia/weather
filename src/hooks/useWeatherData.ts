import { useQuery, UseQueryOptions } from 'react-query';
import api from '../services/api';
import { WeatherData } from '../types/WeatherData';

const fetchWeatherData = async ({
  latitude,
  longitude,
}: {
  latitude: number | string;
  longitude: number | string;
}) => {
  const { data } = await api.get<WeatherData>(
    `/weather?lat=${latitude}&lon=${longitude}&appid=303878e88abafd1d04524718c302fb09&units=metric`,
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
