import { render, screen } from '@testing-library/react';
import { Inscription } from './Inscription';
import { MemoryRouter } from 'react-router-dom';

test('renders successfully', () => {
  const address = 'testaddress';
  const inscription = {
    id: 'testinscriptionid'
  };
  render(<Inscription address={address} inscription={inscription} />, { wrapper: MemoryRouter });

  expect(screen.getByText(/Inscription testinsc/i)).toBeInTheDocument();
  expect(screen.getByTestId('inscription-link').href).toMatch(/\/testaddress\/testinscriptionid$/);
});
