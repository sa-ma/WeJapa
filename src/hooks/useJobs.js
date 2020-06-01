import { useState, useEffect } from 'react';
import axios from 'axios';

const useJobs = (token) => {
  const [isLoading, setIsLoading] = useState();
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);

    const fetchJobs = async () => {
      try {
        const { status, data: results } = await axios.get(
          'https://wejapabackend.herokuapp.com/api/job/all',
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setIsLoading(false);
        if (status === 200) {
          setData(results.data);
        } else {
          setError('Unable to fetch jobs. Try again later');
        }
      } catch (error) {
        setIsLoading(false);
        setError('Unable to fetch jobs. Try again later');
      }
    };
    fetchJobs();
  }, [token]);
  return { isLoading, data, error };
};

export default useJobs;
