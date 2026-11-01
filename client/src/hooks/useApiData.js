import { useEffect, useState } from 'react';

export function useApiData(load, fallback) {
  const [data, setData] = useState(fallback);

  useEffect(() => {
    let active = true;

    load()
      .then((result) => {
        if (active) setData(result);
      })
      .catch((error) => {
        console.error('Unable to load portfolio data; using local fallback.', error);
        if (active) setData(fallback);
      });

    return () => {
      active = false;
    };
  }, [load, fallback]);

  return data;
}
