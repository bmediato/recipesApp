import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/Login.css';
import tomate from '../images/tomate.png';
import Ellipse from '../images/Ellipse.png';
import Rectangle2 from '../images/Rectangle2.png';
import Vector from '../images/Vector.png';
import bandejaCom from '../images/bandejaCom.png';

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
      <div className="container">
        <div className="title">
          <img src={ Ellipse } alt="elipse" className="elipse" />
          <img src={ Rectangle2 } alt="retangulo" className="retangulo" />
          <img src={ Vector } alt="coração" className="coracao" />
          <img src={ bandejaCom } alt="bandeja" className="band" />
          <h1 className="recipes">RECIPES</h1>
          <h4 className="app">App</h4>
        </div>
        <div className="tomate">
          <img src={ tomate } alt="tomate" className="tomate-img" />
        </div>
        <h3 className="login">Login</h3>
        <div className="input">
          <input
            data-testid="email-input"
            placeholder="Email"
            className="inputEm"
            type="text"
            name="email"
            value={ email }
            onChange={ this.onInputChange }
          />

          <input
            placeholder="Password"
            data-testid="password-input"
            className="inputPw"
            type="password"
            name="senha"
            value={ senha }
            onChange={ this.onInputChange }
          />

        </div>
        <button
          data-testid="login-submit-btn"
          type="button"
          className="btn"
          disabled={ !this.isButtonEnable() }
          onClick={ this.btnClick }
        >
          Enter
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
