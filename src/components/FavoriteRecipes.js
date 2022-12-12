import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from './Header';
// import Filter from './FilterFavorite';
import shareIcon from '../images/shareIcon.svg';
import ButtonFavorite from './Buttons/ButtonFavorite';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

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
        <section>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            // onClick={ this.btnAll }
          >
            All
            <img
              src={ drinkIcon }
              alt="ShareIcon"
            />
          </button>

          <button
            type="button"
            data-testid="filter-by-meal-btn"
            // onClick={ this.btnMeals }
          >
            Meals
            <img
              src={ mealIcon }
              alt="ShareIcon"
            />
          </button>

          <button
            type="button"
            data-testid="filter-by-drink-btn"
            // onClick={ this.btnDrinks }
          >
            Drinks
            <img
              src={ drinkIcon }
              alt="ShareIcon"
            />
          </button>
        </section>
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
                  onClick={ () => this.onClickShareButton(element) }
                  src={ shareIcon }
                >
                  <img
                    src={ shareIcon }
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
