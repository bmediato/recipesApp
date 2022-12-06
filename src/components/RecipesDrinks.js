import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { savePage } from '../redux/actions';
import Header from './Header';
import Footer from './Footer';
import { getDrink } from '../services/drinkAPI';

class RecipesDrinks extends Component {
  constructor() {
    super();
    this.state = {
      drinks: [],
    };
  }

  componentDidMount() {
    const { dispatch, history } = this.props;
    const url = history.location.pathname;
    const page = url.slice(1);
    console.log(page);
    dispatch(savePage(page));
    this.getDrink();
  }

  getDrink() {
    getDrink()
      .then((result) => this.setState({
        drinks: result,
      }));
  }

  render() {
    const { history } = this.props;
    const { drinks } = this.state;
    const max = 12;
    return (
      <div>
        <Header
          history={ history }
          title="Drinks"
          imgProfile
          imgSearch
        />
        <Footer />
        <ul>
          {
            drinks.slice(0, max).map((element, id) => (
              <li data-testid={ `${id}-recipe-card` } key={ id }>
                <img
                  alt="drink"
                  src={ element.strDrinkThumb }
                  data-testid={ `${id}-card-img` }
                />
                <p
                  data-testid={ `${id}-card-name` }
                >
                  { element.strDrink }
                </p>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

RecipesDrinks.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default connect()(RecipesDrinks);
