import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from './Header';
import Filter from './FilterFavorite';
import shareIcon from '../images/shareIcon.svg';
import ButtonFavorite from './Buttons/ButtonFavorite';
import './css/Favorite.css';
import share1 from '../images/share1.png';

const copy = require('clipboard-copy');

class FavoriteRecipes extends Component {
  constructor() {
    super();
    this.state = {
      favoriteRecipes: [],
      isLinkCopied: false,
    };
  }

  componentDidMount() {
    this.getFavoriteRecipes();
  }

  getFavoriteRecipes = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    this.setState({ favoriteRecipes });
  };

  onClickShareButton = (element) => {
    const timerToDeletePhrase = 5000;
    copy(`http://localhost:3000/${element.type}s/${element.id}`);
    this.setState({ isLinkCopied: true });
    setTimeout(() => this.setState({ isLinkCopied: false }), timerToDeletePhrase);
  };

  render() {
    const { history, page } = this.props;
    const { favoriteRecipes, isLinkCopied } = this.state;
    console.log(favoriteRecipes);

    return (
      <div>
        <Header
          history={ history }
          title="Favorite Recipes"
          imgProfile
          imgSearch={ false }
        />
        <Filter />
        <ul className="bdiv">
          {
            favoriteRecipes.map((element, index) => (
              <div key={ index } className="ul-fav">
                <Link to={ `${element.type}s/${element.id}` }>
                  <img
                    src={ element.image }
                    className="img-f"
                    alt={ `Recipes ${page}` }
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>
                <div className="divau">
                  <div className="ptitle">
                    <Link to={ `${element.type}s/${element.id}` }>
                      <p data-testid={ `${index}-horizontal-name` } className="p3">
                        {element.name}
                      </p>
                    </Link>
                    <p data-testid={ `${index}-horizontal-top-text` } className="pp">
                      {`${element.nationality} - 
                  ${element.category} - 
                  ${element.alcoholicOrNot}`}
                    </p>

                  </div>
                  <button
                    data-testid={ `${index}-horizontal-share-btn` }
                    type="button"
                    onClick={ () => this.onClickShareButton(element) }
                    src={ shareIcon }
                    className="btnSh"
                  >
                    <img
                      src={ share1 }
                      className="imgBtnShare"
                      alt="ShareIcon"
                    />
                  </button>
                  { isLinkCopied && (<p>Link copied!</p>) }
                  <ButtonFavorite
                    receitas={ element }
                    testId={ `${index}-horizontal-favorite-btn` }
                  />

                  {/* <button
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  type="button"
                  onClick={ this.saveRecipe }
                  src={ whiteHeartIcon }
                >
                  <img
                    src={ whiteHeartIcon }
                    alt="FavoriteIcon"
                  />
                </button> */}
                </div>
              </div>
            ))
          }
        </ul>
      </div>
    );
  }
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape({}).isRequired,
  page: PropTypes.string.isRequired,
  receitas: PropTypes.shape({
    idDrink: PropTypes.string,
    idMeal: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
};

export default FavoriteRecipes;
