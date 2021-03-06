import { useEffect, useState } from "react";
import { BASE_URL } from "../define/api";

function useFetch<T>(endPoint: string, callBack: (data: T) => void) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    fetch(`${BASE_URL}/${endPoint}`)
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
  }, [endPoint, callBack]);

  return { loading, error };
}

export default useFetch;
