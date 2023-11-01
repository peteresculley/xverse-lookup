import { useCallback, useEffect, useRef, useState } from 'react';

export const useWalletInscriptions = (address) => {
  const addr = useRef(address);
  addr.current = address;
  const [inscriptions, setInscriptions] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [readyForAddress, setReadyForAddress] = useState();
  const [isError, setIsError] = useState(false);
  const [blockCount, setBlockCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setFetchingMore(false);
    setIsError(false);
    if (address) {
      setFetching(true);
      fetch(`https://api-3.xverse.app/v1/address/${address}/ordinal-utxo`).then((res) => {
        return res.json();
      }).then((t) => {
        if (addr.current === address) {
          setReadyForAddress(address);
          setIsError(false);
          setFetching(false);
          setInscriptions(t.results.map((r) => r.inscriptions).flat());
          setBlockCount(t.results.length);
          setTotalCount(t.total);
        }
      }).catch(() => {
        if (addr.current === address) {
          setIsError(true);
          setReadyForAddress();
          setFetching(false);
        }
      });
    } else {
      setReadyForAddress();
      setFetching(false);
      setInscriptions([]);
      setBlockCount(0);
      setTotalCount(0);
    }
  }, [address]);

  const [fetchingMore, setFetchingMore] = useState(false);

  const moreToLoad = blockCount < totalCount && !fetchingMore;
  const loadMore = useCallback(() => {
    if (moreToLoad) {
      setFetchingMore(true);
      fetch(`https://api-3.xverse.app/v1/address/${address}/ordinal-utxo?offset=${inscriptions.length}`).then((res) => {
        return res.json();
      }).then((t) => {
        if (addr.current === address) {
          const newInscriptions = t.results.map((r) => r.inscriptions).flat();
          setInscriptions((oldInscriptions) => [...oldInscriptions, ...newInscriptions]);
          setBlockCount((oldCount) => oldCount + t.results.length);
          setTotalCount(t.total);
          setFetchingMore(false);
        }
      }).catch(() => {
        if (addr.current === address) {
          setFetchingMore(false);
        }
      });
    } else {
      setFetchingMore(false);
    }
  }, [moreToLoad, address, inscriptions.length]);

  return {
    inscriptions,
    fetching,
    ready: readyForAddress === address,
    isError,
    moreToLoad,
    loadMore
  };
};
