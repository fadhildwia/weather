import { useQuery, UseQueryOptions } from 'react-query';
import { apiV3 } from '../services/api';

interface WeatherAllInterface {
  current: {
    temp: string | number;
    humidity: string | number;
    wind_speed: string | number;
    weather: Array<any>;
    pressure: string | number;
    dt: string | number;
  };
  daily: Array<any>;
}

const fetchGetWeatherAll = async ({
  latitude,
  longitude,
}: {
  latitude: number | string;
  longitude: number | string;
}) => {
  if (process.env.WEATHER_API_KEY) {
    const { data } = await apiV3.get<WeatherAllInterface>(
      `/onecall?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}&units=metric`,
    );
    return data;
  }
};

const useGetWeatherAll = ({
  latitude,
  longitude,
  options,
}: {
  latitude: number | string;
  longitude: number | string;
  options?: UseQueryOptions<WeatherAllInterface>;
}) => {
  return useQuery({
    queryKey: ['weatherAll', latitude, longitude],
    queryFn: () => fetchGetWeatherAll({ latitude, longitude }),
    ...options,
  });
};

export default useGetWeatherAll;
