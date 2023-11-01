import './App.css';
import { MainPage, InscriptionPage } from '..';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/:address/:inscriptionId' element={<InscriptionPage />} />
      </Routes>
    </BrowserRouter>
  );
}
