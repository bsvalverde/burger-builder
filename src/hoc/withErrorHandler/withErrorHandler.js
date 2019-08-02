import React, { useState, useEffect } from 'react';

import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, setError] = useState(null);

    const requestInterceptor = axios.interceptors.request.use(request => {
      setError(null);
    });
    const responseInterceptor = axios.interceptors.response.use(response => response, err => {
      setError(err)
    });

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.request.eject(responseInterceptor);
      }
    }, []);

    const errorConfirmedHandler = () => {
      setError(null);
    }

    return (
      <Aux>
        <Modal
          show={error}
          modalClosed={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  }
}

export default withErrorHandler;
