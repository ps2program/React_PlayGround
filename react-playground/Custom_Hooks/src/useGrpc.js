// useGrpc.js
import { useState, useEffect } from 'react';
import { sayHello } from '../../gRPC_Server/grpcClient';

function useGrpc(name) {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    debugger;
    sayHello(name)
      .then((response) => {
        setMessage(response);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [name]);

  return { message, loading, error };
}

export default useGrpc;
