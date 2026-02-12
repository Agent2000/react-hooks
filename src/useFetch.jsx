import { useCallback, useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (options = {}) => {
      const urlObj = new URL(url, window.location.origin);

      if (options.params instanceof Object) {
        Object.entries(options.params).forEach((key) => {
          urlObj.searchParams.append(String(key[0]), String(key[1]));
        });
      }

      try {
        setIsLoading(true);

        const res = await fetch(urlObj.toString());
        if (!res.ok) {
          throw new Error("Запрос не выполнился!");
        }
        const json = await res.json();
        setData(json);
        setError(null);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    [url]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}
