import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from './Header';
import Filter from './Filter';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

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

  onClickShareButton = () => {
    const timerToDeletePhrase = 5000;
    copy(`http://localhost:3000${element.type}s/${element.id}`);
    this.setState({ isLinkCopied: true });
    setTimeout(() => this.setState({ isLinkCopied: false }), timerToDeletePhrase);
  };

  saveRecipe = () => {
    const { receitas } = this.props;
    console.log(receitas);
    const oldLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const obj = {
      id: receitas.idDrink || receitas.idMeal,
      type: receitas.idDrink ? 'drink' : 'meal',
      nationality: receitas.strArea || '',
      category: receitas.strCategory || '',
      alcoholicOrNot: receitas.strAlcoholic || '',
      name: receitas.strDrink || receitas.strMeal,
      image: receitas.strDrinkThumb || receitas.strMealThumb,
    };
    const newLocalStorage = [...oldLocalStorage, obj];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newLocalStorage));
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
        <ul>
          {
            favoriteRecipes.map((element, index) => (
              <li key={ index }>
                <Link to={ `${element.type}s/${element.id}` }>
                  <img
                    src={ element.image }
                    alt={ `Recipes ${page}` }
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>

                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`${element.nationality} - 
                  ${element.category} - 
                  ${element.alcoholicOrNot}`}
                </p>

                <Link to={ `${element.type}s/${element.id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>
                    {element.name}
                  </p>
                </Link>

                <button
                  data-testid={ `${index}-horizontal-share-btn` }
                  type="button"
                  onClick={ this.onClickShareButton }
                  src={ shareIcon }
                >
                  <img
                    src={ shareIcon }
                    alt="ShareIcon"
                  />
                </button>
                { isLinkCopied && (<p>Link copied!</p>) }

                <button
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  type="button"
                  onClick={ this.saveRecipe }
                  src={ whiteHeartIcon }
                >
                  <img
                    src={ whiteHeartIcon }
                    alt="FavoriteIcon"
                  />
                </button>
              </li>
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
