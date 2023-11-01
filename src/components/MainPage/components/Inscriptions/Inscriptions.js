import './Inscriptions.css';
import { useWalletInscriptions } from '../../../../hooks';
import { Inscription } from '..';

export const Inscriptions = ({ address }) => {
  const { inscriptions, fetching, ready, isError, moreToLoad, loadMore } = useWalletInscriptions(address);

  if (!address || !ready) {
    return null;
  }

  let content = null;

  if (isError) {
    content = (
      <div className='error'>Error while fetching inscriptions</div>
    );
  } else if (inscriptions.length > 0) {
    content = inscriptions.map((inscription) => (
      <Inscription key={inscription.id} inscription={inscription} address={address} />
    ));
  } else if (!fetching) {
    content = 'None';
  }

  return (
    <>
      <div className='results-label'>Results</div>
      <div className='inscriptions'>
        {content}
      </div>
      {moreToLoad && (
        <button className='load-more' onClick={loadMore}>Load More</button>
      )}
    </>
  );
};
