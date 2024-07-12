import { useMutation } from 'react-query';
import api from '../services/api';
import { WeatherData } from '../types/WeatherData';

const fetchWeatherDataByCity = async ({ city }: { city: string }) => {
  const { data } = await api.get<WeatherData>(
    `/weather?q=${city}&appid=303878e88abafd1d04524718c302fb09&units=metric`,
  );
  return data;
};

const useWeatherDataByCity = () => {
  return useMutation<WeatherData, unknown, { city: string }>(({ city }) =>
    fetchWeatherDataByCity({ city }),
  );
};

export default useWeatherDataByCity;
