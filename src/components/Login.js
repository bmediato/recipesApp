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

  render() {
    return (
      <>
        <input
          data-testid="email-input"
          type="text"
          name="email"
          onChange={ this.onInputChange }
        />

        <input
          data-testid="password-input"
          type="password"
          name="senha"
          onChange={ this.onInputChange }
        />

        <button
          data-testid="login-submit-btn"
          type="button"
          disable={ this.isButtonEnable }
          onClick={ () => {
          } }
        >
          Enter
        </button>
      </>
    );
  }
}
