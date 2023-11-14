import { Link } from 'react-router-dom';
import './Inscription.css';
import { ReactComponent as ArrowSvg } from './arrow.svg';

export const Inscription = ({ address, inscription }) => {
  return (
    <Link to={`/${address}/${inscription.id}`} className='inscription' data-testid='inscription-link'>
      <div className='inscription-label'>
        Inscription {inscription.id.substr(0, 8)}
      </div>
      <div className='inscription-arrow'>
        <ArrowSvg />
      </div>
    </Link>
  );
};
