import { useEffect, useState } from 'react';

export const useInscription = ({ address, inscriptionId }) => {
  const [inscription, setInscription] = useState({});
  const [fetching, setFetching] = useState(false);
  const [readyForId, setReadyForId] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (address && inscriptionId) {
      setFetching(true);
      setIsError(false);
      fetch(`https://api-3.xverse.app/v1/address/${address}/ordinals/inscriptions/${inscriptionId}`).then((res) => {
        return res.json();
      }).then((json) => {
        setReadyForId(inscriptionId);
        setIsError(false);
        setFetching(false);
        setInscription(json);
      }).catch(() => {
        setIsError(true);
        setReadyForId();
        setFetching(false);
      });
    } else {
      setIsError(false);
      setReadyForId();
      setFetching(false);
      setInscription({});
    }
  }, [address, inscriptionId]);

  return {
    inscription,
    fetching,
    ready: readyForId === inscriptionId,
    isError
  };
};
