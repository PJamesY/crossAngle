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
        }
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
    return () => {
      isMounted = false;
    };
  }, [callBack, url]);

  return { loading, error };
}

export default useFetch;
