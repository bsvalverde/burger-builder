import { useState, useEffect } from 'react';

export default httpClient => {
  const [error, setError] = useState(null);

  const requestInterceptor = httpClient.interceptors.request.use(request => {
    setError(null);
  });
  const responseInterceptor = httpClient.interceptors.response.use(response => response, err => {
    setError(err)
  });

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(requestInterceptor);
      httpClient.interceptors.request.eject(responseInterceptor);
    }
  }, []);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
}
