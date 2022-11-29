import React, { Component } from 'react';

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
      [name]: [value],
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
          disable={ !this.isButtonEnable }
          onClick={ () => {
          } }
        >
          Enter
        </button>
      </>
    );
  }
}
