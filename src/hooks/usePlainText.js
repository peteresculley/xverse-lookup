import { useEffect, useState } from 'react';

export const usePlainText = ({ enabled, url }) => {
  const [text, setText] = useState('');
  const [fetching, setFetching] = useState(false);
  const [readyForUrl, setReadyForUrl] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (enabled && url) {
      setFetching(true);
      setText('');
      setIsError(false);
      setReadyForUrl('');
      fetch(url).then((result) => result.text()).then((text) => {
        setText(text);
        setFetching(false);
        setReadyForUrl(url);
        setIsError(false);
      }).catch(() => {
        setIsError(true);
        setFetching(false);
        setText('');
      });
    } else {
      setText('');
      setFetching(false);
      setReadyForUrl('');
      setIsError(false);
    }
  }, [enabled, url]);

  return {
    text,
    ready: enabled && !fetching && readyForUrl === url && !isError,
    fetching,
    isError
  };
};
