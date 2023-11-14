import { useCallback, useState } from 'react';
import './MainPage.css';
import { Inscriptions } from './components';

export const MainPage = () => {
  const [lookUp, setLookUp] = useState('');
  const [address, setAddress] = useState('');

  const onLookUpChange = useCallback((event) => {
    setLookUp(event.target.value);
  }, []);

  const handleClick = useCallback(() => {
    setAddress(lookUp);
  }, [lookUp]);

  return (
    <div className='main-page'>
      <div className='container'>
        <div className='header'>
          Ordinal Inscription Lookup
        </div>
        <div className='look-up-label'>Owner Bitcoin Address:</div>
        <input className='look-up-input' type='text' value={lookUp} onChange={onLookUpChange} data-testid='lookup-address-input' />
        <button className='look-up-button' onClick={handleClick} data-testid='lookup-button'>Look up</button>
        <Inscriptions address={address} />
      </div>
    </div>
  );
};
