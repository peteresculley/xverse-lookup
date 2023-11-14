import './App.css';
import { MainPage, InscriptionPage } from '..';
import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/:address/:inscriptionId' element={<InscriptionPage />} />
    </Routes>
  );
};
