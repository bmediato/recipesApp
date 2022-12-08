import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function ButtonShare() {
  const match = useRouteMatch();
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const onClickShareButton = () => {
    const timerToDeletePhrase = 5000;
    copy(`http://localhost:3000${match.url}`);
    setIsLinkCopied(true);
    setTimeout(() => setIsLinkCopied(false), timerToDeletePhrase);
  };

  return (
    <>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ onClickShareButton }
      >
        <img
          src={ shareIcon }
          alt="ShareIcon"
        />
      </button>
      {isLinkCopied && (<p>Link copied!</p>)}
    </>
  );
}
