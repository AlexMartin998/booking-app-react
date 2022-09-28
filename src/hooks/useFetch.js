import { useEffect, useState } from 'react';
import { bookingApi } from '../api';

export const useFetch = url => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const { data } = await bookingApi.get(url);
        setData(data);
      } catch (error) {
        setError(error);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const reFetch = async () => {
    setLoading(true);

    try {
      const { data } = await bookingApi.get(url);
      setData(data);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  return { data, loading, error, reFetch };
};
