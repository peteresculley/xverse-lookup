import { render, screen } from '@testing-library/react';
import { Inscriptions } from './Inscriptions';
import { useWalletInscriptions } from '../../../../hooks/useWalletInscriptions';

jest.mock('../../../../hooks/useWalletInscriptions');
const mockInscription = jest.fn();
jest.mock('../Inscription', () => ({
  Inscription: (props) => {
    mockInscription(props);
    return <mock-Inscription />;
  }
}));

test('renders nothing with no address', () => {
  useWalletInscriptions.mockReturnValue({ ready: false });
  const { container } = render(<Inscriptions address='' />);

  expect(container).toBeEmptyDOMElement();
});

test('renders nothing with address but not ready', () => {
  useWalletInscriptions.mockReturnValue({ ready: false });
  const { container } = render(<Inscriptions address='testaddress' />);

  expect(container).toBeEmptyDOMElement();
});

test('renders with no inscriptions', () => {
  useWalletInscriptions.mockReturnValue({ ready: true, inscriptions: [] });
  render(<Inscriptions address='testaddress' />);

  expect(screen.getByText(/Results/i)).toBeInTheDocument();
  expect(screen.getByText(/None/i)).toBeInTheDocument();
});

test('renders with inscriptions', () => {
  const address = 'testaddress';
  const inscriptions = [
    { id: 1 },
    { id: 2 },
    { id: 3 }
  ];
  useWalletInscriptions.mockReturnValue({ ready: true, inscriptions });
  render(<Inscriptions address={address} />);

  expect(screen.getByText(/Results/i)).toBeInTheDocument();
  inscriptions.forEach((inscription) => {
    expect(mockInscription).toBeCalledWith(expect.objectContaining({
      address,
      inscription
    }));
  });
});
