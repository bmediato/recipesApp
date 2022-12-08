import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Card extends Component {
  linkNames = (id) => {
    const { page } = this.props;
    if (page === 'meals') {
      return `meals/${id}`;
    }
    return `drinks/${id}`;
  };

  render() {
    return (
      <li>
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
          <p data-testid={ `${index}-horizontal-name` }>
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
    );
  }
}

Card.propTypes = {
  page: PropTypes.string.isRequired,
};

export default Card;
