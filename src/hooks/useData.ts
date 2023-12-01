import { useEffect, useState } from 'react';

type Error = {
  errorStatus: boolean;
  errorInfo: unknown;
};

export default function useData<T>(
  service: () => Promise<T[]>
): [T[], Error, boolean] {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<Error>({
    errorStatus: false,
    errorInfo: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    service()
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        setError(() => ({ errorStatus: true, errorInfo: err }));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [service]);

  return [data, error, loading];
}
