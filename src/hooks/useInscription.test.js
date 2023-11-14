import { renderHook, waitFor } from '@testing-library/react';

import { useInscription } from '.';

beforeEach(() => {
  fetch.resetMocks();
});

test('runs successfully when blank', () => {
  const { result } = renderHook(() => useInscription({
    address: '',
    inscriptionId: ''
  }));
  expect(result.current.fetching).toBe(false);
  expect(result.current.ready).toBe(false);
});

test('starts fetching with inscription', () => {
  fetch.once(JSON.stringify({
    id: 'testinscriptionid'
  }));

  const { result } = renderHook(() => useInscription({
    address: 'testaddress',
    inscriptionId: 'testinscriptionid'
  }));
  expect(fetch).toBeCalled();
  expect(result.current.fetching).toBe(true);
  expect(result.current.ready).toBe(false);
});

test('finishes fetching with inscription', async () => {
  fetch.once(JSON.stringify({
    id: 'testinscriptionid'
  }));

  const { result } = renderHook(() => useInscription({
    address: 'testaddress',
    inscriptionId: 'testinscriptionid'
  }));

  await waitFor(() => {
    expect(result.current.ready).toBe(true);
  });
  expect(fetch).toBeCalled();
  expect(result.current.fetching).toBe(false);
  expect(result.current.inscription.id).toBe('testinscriptionid');
});
