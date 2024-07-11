import {useQuery} from 'react-query';
import api from '../services/api';

const fetchWeatherData = async (
  latitude: number | string,
  longitude: number | string,
) => {
  const {data} = await api.get(
    `/onecall?lat=${latitude}&lon=${longitude}&appid=303878e88abafd1d04524718c302fb09&units=metric`,
  );
  return data;
};

const useWeatherData = (
  latitude: number | string,
  longitude: number | string,
) => {
  return useQuery(
    ['weatherData', latitude, longitude],
    () => fetchWeatherData(latitude, longitude),
    {
      enabled: !!latitude && !!longitude,
    },
  );
};

export default useWeatherData;
