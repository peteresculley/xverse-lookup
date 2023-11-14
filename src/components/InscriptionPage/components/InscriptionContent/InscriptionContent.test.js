import { render, screen } from '@testing-library/react';
import { InscriptionContent } from './InscriptionContent';
import { usePlainText } from '../../../../hooks';

jest.mock('../../../../hooks/usePlainText');

test('renders successfully', () => {
  usePlainText.mockReturnValue({ text: '', ready: false });
  const inscription = {
    id: 'testinscriptionid',
    mime_type: 'application/json'
  };
  render(<InscriptionContent inscription={inscription} />);

  expect(usePlainText).toHaveBeenCalledWith(expect.objectContaining({
    enabled: false
  }));
  expect(screen.getByTestId('content-object').data).toBe('https://ord.xverse.app/content/testinscriptionid');
});

test('renders successfully with plain text not ready', () => {
  usePlainText.mockReturnValue({ text: 'testtext', ready: false });
  const inscription = {
    id: 'testinscriptionid',
    mime_type: 'text/plain'
  };
  render(<InscriptionContent inscription={inscription} />);

  expect(screen.getByTestId('inscription-content')).toBeEmptyDOMElement();
});

test('renders successfully with plain text that is ready', () => {
  usePlainText.mockReturnValue({ text: 'testtext', ready: true });
  const inscription = {
    id: 'testinscriptionid',
    mime_type: 'text/plain'
  };
  render(<InscriptionContent inscription={inscription} />);

  expect(screen.getByTestId('content-text')).toHaveTextContent('testtext');
});
