import { useCallback, useState } from "react";

export default function useApi(apiFunction) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const request = useCallback(async (...args) => {
    setLoading(true);
    setData(null);
    setError('')
    try {
      const result = await apiFunction(...args);
      setData(result.data);
    } catch (err) {
      setData(null);
      setError(err.message || "Unexpected Error!");
    } finally {
      setLoading(false);
    }
  }, [apiFunction])

  return {
    data,
    error,
    loading,
    request,
  };
};
