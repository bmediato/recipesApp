import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
// import shareIcon from '../../images/shareIcon.svg';
import '../css/RecipeDetails.css';
import share1 from '../../images/share1.png';

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
        className="btnShare"
      >
        <img
          src={ share1 }
          alt="ShareIcon"
          className="imgBtnShare"
        />
      </button>
      {isLinkCopied && (<p>Link copied!</p>)}
    </>
  );
}
