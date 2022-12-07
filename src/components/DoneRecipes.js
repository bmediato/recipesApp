import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import shareIcon from '../images/shareIcon.svg';

class DoneRecipes extends Component {
  constructor() {
    super();
    this.state = {
      doneRecipes: [],
    };
  }

  componentDidMount() {
    this.getDoneRecipes();
  }

  getDoneRecipes = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    return doneRecipes;
  };

  render() {
    const { history } = this.props;
    const { doneRecipes } = this.state;

    return (
      <>
        <div>
          <Header
            history={ history }
            title="Done Recipes"
            imgProfile
            imgSearch={ false }
          />
        </div>
        <div>
          <button
            type="button"
            data-testid="filter-by-all-btn"
          >
            All
          </button>

          <button
            type="button"
            data-testid="filter-by-meal-btn"
          >
            Meals
          </button>

          <button
            type="button"
            data-testid="filter-by-drink-btn"
          >
            Drinks
          </button>

          <ul>
            {
              doneRecipes.map((element, index) => (
                <li key={ id }>
                  <img
                    src=""
                    alt=""
                    data-testid={ `${index}-horizontal-image` }
                  />
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {`${element.nationality} - ${element.category}`}
                  </p>
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {element.name}
                  </p>
                  <p data-testid={ `${index}-horizontal-done-date` }>
                    {element.doneDate}
                  </p>

                  <img
                    src={ shareIcon }
                    alt="shareIcon"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />

                  <div data-testid={ `${index}-${tagName}-horizontal-tag` }>
                    { element.tags }
                  </div>
                </li>

              ))
            }
          </ul>
        </div>
      </>

    );
  }
}

DoneRecipes.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default DoneRecipes;
