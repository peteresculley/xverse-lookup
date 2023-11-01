import { Link, useParams } from 'react-router-dom';
import './InscriptionPage.css';
import { ReactComponent as BackArrow } from './BackArrow.svg';
import { InscriptionContent } from './components';
import { useInscription } from '../../hooks';

export const InscriptionPage = () => {
  const { address, inscriptionId } = useParams();
  const { inscription, fetching, ready, isError } = useInscription({ address, inscriptionId });

  if (isError || fetching || !ready) {
    return null;
  }

  return (
    <div className='inscription-page'>
      <div className='container'>
        <div className='header'>
          <Link to='/'><BackArrow /></Link>
          <div className='label'>Details</div>
        </div>
        <InscriptionContent inscription={inscription} />
        <div className='details'>
          <div className='number'>Inscription {inscription.number}</div>
          <hr />
          <label className='id'>Inscription ID</label>
          <div className='id'>{inscription.id}</div>
          <label className='address'>Owner Address</label>
          <div className='address'>{inscription.address}</div>
          <div className='attributes'>
            <div className='title'>Attributes</div>
            <label className='output-value'>Output Value</label>
            <div className='output-value'>{inscription.value}</div>
            <label className='content-type'>Content Type</label>
            <div className='content-type'>{inscription.content_type}</div>
            <label className='content-length'>Content Length</label>
            <div className='content-length'>{inscription.content_length} bytes</div>
            <label className='location'>Location</label>
            <div className='location'>{inscription.location}</div>
            <label className='genesis-transaction'>Genesis Transaction</label>
            <div className='genesis-transaction'>{inscription.genesis_tx_id}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
