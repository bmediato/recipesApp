import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from './Header';
import shareIcon from '../images/shareIcon.svg';
import Filter from './Filter';

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

  linkNames = (id) => {
    const { page } = this.props;
    if (page === 'meals') {
      return `meals/${id}`;
    }
    return `drinks/${id}`;
  };

  render() {
    const { history } = this.props;
    const { doneRecipes } = this.state;

    return (
      <div>
        <div>
          <Header
            history={ history }
            title="Done Recipes"
            imgProfile
            imgSearch={ false }
          />
        </div>

        <Filter />
        <ul>
          {
            doneRecipes.map((element, index) => (
              <li key={ id }>
                <Link to={ this.linkNames(element.idMeal || element.idDrink) }>
                  <img
                    src=""
                    alt=""
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>

                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`${element.nationality} - ${element.category}`}
                </p>

                <Link to={ this.linkNames(element.idMeal || element.idDrink) }>
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {element.name}
                  </p>
                </Link>

                <p data-testid={ `${index}-horizontal-done-date` }>
                  {element.doneDate}
                </p>

                <div data-testid={ `${index}-${tagName}-horizontal-tag` }>
                  {element.tags}
                </div>

              </li>
            ))
          }
          <img
            src={ shareIcon }
            alt="shareIcon"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </ul>
      </div>
    );
  }
}

DoneRecipes.propTypes = {
  history: PropTypes.shape({}).isRequired,
  page: PropTypes.string.isRequired,
};

export default DoneRecipes;
