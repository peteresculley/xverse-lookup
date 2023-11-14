import { render, screen, fireEvent } from '@testing-library/react';
import { MainPage } from './MainPage';

const mockInscriptions = jest.fn();
jest.mock('./components/Inscriptions', () => ({
  Inscriptions: (props) => {
    mockInscriptions(props);
    return <mock-Inscriptions />;
  }
}));

test('renders successfully with title', () => {
  render(<MainPage />);
  expect(screen.getByText(/Ordinal Inscription Lookup/i)).toBeInTheDocument();
});

test('can set address for lookup', () => {
  render(<MainPage />);
  expect(mockInscriptions).toHaveBeenCalledWith(expect.objectContaining({
    address: ''
  }));

  const mockAddress = 'testaddress';
  fireEvent.change(screen.getByTestId('lookup-address-input'), {target: {value: mockAddress}});
  fireEvent.click(screen.getByTestId('lookup-button'));
  expect(mockInscriptions).toHaveBeenCalledWith(expect.objectContaining({
    address: mockAddress
  }));
});
