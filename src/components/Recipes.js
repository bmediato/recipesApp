import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDrinksCategories, getMealsCategories } from '../services/foodAPI';
import { savePage } from '../redux/actions';
import Header from './Header';
import Footer from './Footer';

class Recipes extends Component {
  state = {
    categories: [],
  };

  async componentDidMount() {
    const { history, dispatch } = this.props;
    const url = history.location.pathname;
    const link = url.slice(1);
    dispatch(savePage(link));
    const NUMBER_MAX_ARRAY = 5;
    let categories = [];
    if (url === '/meals') {
      categories = await getMealsCategories();
    }
    if (url === '/drinks') {
      categories = await getDrinksCategories();
    }
    categories.splice(NUMBER_MAX_ARRAY, categories.length - 1);
    this.setState({ categories });
  }

  render() {
    const { history, page } = this.props;
    const { categories } = this.state;
    return (
      <div>
        <Header
          history={ history }
          title={ page === 'meals' ? 'Meals' : 'Drinks' }
          imgProfile
          imgSearch
        />
        <form>
          { categories.map((category) => (
            <label htmlFor="categories" key={ category.strCategory }>
              {category.strCategory}
              <input
                type="radio"
                data-testid={ `${category.strCategory}-category-filter` }
                id="categories"
                name="radioInput"
                value={ category.strCategory }
              />
            </label>))}
        </form>
        <Footer />
      </div>
    );
  }
}

Recipes.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
  page: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  page: state.searchRecipes.page,
});

export default connect(mapStateToProps)(Recipes);
