import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

class Profile extends Component {
  render() {
    const { history } = this.props;

    return (
      <div>
        <Header
          history={ history }
          title="Profile"
          imgProfile
          imgSearch={ false }
        />
        <Footer />
      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default Profile;
