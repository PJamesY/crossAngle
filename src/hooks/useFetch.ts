import { useEffect, useState } from "react";
import { BASE_URL } from "../define/api";

function useFetch<T>(url: string, callBack: (data: T) => void) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    fetch(`${BASE_URL}/${url}`)
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          callBack(data.data);
          setLoading(false);
        }
      })
      .catch((e) => setError(e));

    return () => {
      isMounted = false;
    };
  }, [url, callBack]);

  return { loading, error };
}

export default useFetch;
