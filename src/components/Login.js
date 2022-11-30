import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  isButtonEnable = () => {
    const { email, senha } = this.state;
    const numero6 = 6;
    const pattern = /[\w-.]+@[\w]+.com/;
    const isEmailValid = pattern.test(email);
    const isSenhaValid = senha.length > numero6;
    return isEmailValid && isSenhaValid;
  };

  btnClick = () => {
    const { history } = this.props;
    const { email } = this.state;
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  render() {
    const { email, senha } = this.state;
    return (
      <>
        <input
          data-testid="email-input"
          type="text"
          name="email"
          value={ email }
          onChange={ this.onInputChange }
        />

        <input
          data-testid="password-input"
          type="password"
          name="senha"
          value={ senha }
          onChange={ this.onInputChange }
        />

        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ !this.isButtonEnable() }
          onClick={ this.btnClick }
        >
          Enter
        </button>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
