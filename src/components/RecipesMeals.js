import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { savePage } from '../redux/actions';
import Header from './Header';
import Footer from './Footer';
import { getMeal } from '../services/foodAPI';

class RecipesMeals extends Component {
  constructor() {
    super();
    this.state = {
      meals: [],
    };
  }

  componentDidMount() {
    const { dispatch, history } = this.props;
    const url = history.location.pathname;
    const page = url.slice(1);
    // console.log(page);
    dispatch(savePage(page));
    this.getFood();
  }

  getFood() {
    getMeal()
      .then((result) => this.setState({
        meals: result,
      }));
  }

  render() {
    const { history } = this.props;
    const { meals } = this.state;
    console.log(meals);
    const max = 12;
    return (
      <div>
        <Header
          history={ history }
          title="Meals"
          imgProfile
          imgSearch
        />
        <ul>
          {
            meals.slice(0, max).map((element, id) => (
              <li data-testid={ `${id}-recipe-card` } key={ id }>
                <img
                  alt="meal"
                  src={ element.strMealThumb }
                  data-testid={ `${id}-card-img` }
                />
                <p
                  data-testid={ `${id}-card-name` }
                >
                  { element.strMeal }

                </p>
              </li>
            ))
          }
        </ul>
        <Footer />
      </div>
    );
  }
}

RecipesMeals.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default connect()(RecipesMeals);
