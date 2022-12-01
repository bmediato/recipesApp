import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testes relacionados a pagina de login', () => {
  test('Verifica se quando iniciado a aplicação a rota esta correta', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });
  test('Verifica se a validação do botão esta correta', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');
    expect(button).toBeDisabled();

    userEvent.type(inputEmail, 'emailnaovalido');
    expect(inputEmail.value).toBe('emailnaovalido');
    expect(button).toBeDisabled();
    userEvent.clear(inputEmail);

    userEvent.type(inputPassword, '123456');
    expect(inputPassword.value).toBe('123456');

    expect(button).toBeDisabled();
    userEvent.clear(inputPassword);

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '1234567');
    expect(button).toBeEnabled();

    userEvent.click(button);
    expect(history.location.pathname).toBe('/meals');

    const saveLocalStorage = JSON.parse(localStorage.getItem('user'));
    expect(saveLocalStorage.email).toBe('teste@teste.com');
  });
});
