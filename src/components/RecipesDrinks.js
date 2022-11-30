import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { savePage } from '../redux/actions';
import Header from './Header';
import Footer from './Footer';

class RecipesDrinks extends Component {
  componentDidMount() {
    const { dispatch, history } = this.props;
    const url = history.location.pathname;
    const page = url.slice(1);
    console.log(page);
    dispatch(savePage(page));
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <Header
          history={ history }
          title="Drinks"
          imgProfile
          imgSearch
        />
        <Footer />
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
