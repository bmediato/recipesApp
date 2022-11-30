import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from './Header';

class Profile extends Component {
  render() {
    const { history } = this.props;

    return (<Header
      history={ history }
      title="Profile"
      imgProfile
      imgSearch={ false }
    />);
  }
}

Profile.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default Profile;
