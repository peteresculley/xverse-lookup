import { usePlainText } from '../../../../hooks';
import './InscriptionContent.css';

export const InscriptionContent = ({ inscription }) => {
  const isPlainText = inscription.mime_type.startsWith('text/plain');
  const { text, ready } = usePlainText({
    enabled: isPlainText,
    url: `https://ord.xverse.app/content/${inscription.id}`
  });

  let content = null;

  if (isPlainText) {
    content = ready ? (
      <pre data-testid='content-text'>{text}</pre>
    ) : null;
  } else {
    content = (
      <object type={inscription.mime_type} data={`https://ord.xverse.app/content/${inscription.id}`} data-testid='content-object'>
        Failed to load inscription
      </object>
    );
  }

  return (
    <div className='inscription-content' data-testid='inscription-content'>
      {content}
    </div>
  );
};
