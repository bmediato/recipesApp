import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import Profile from '../components/Profile';

const email = 'teste@teste.com';

describe('Testes relacionados a pagina de perfil', () => {
  test('Verifica se o email salvo no localStorage aparece na tela', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, email);
    userEvent.type(inputPassword, '123456');
    userEvent.click(button);

    const saveLocalStorage = JSON.parse(localStorage.getItem('user'));
    expect(saveLocalStorage.email).toBe(email);
    renderWithRouterAndRedux(<Profile />);
    expect(email).toBeInTheDocument();
  });

  test('Verifica a rota ao clicar nos botões ', () => {
    const { history } = renderWithRouterAndRedux(<Profile />);

    const buttonDoneRecipes = screen.getByTestId('profile-done-btn');
    const buttonFavoriteRecipes = screen.getByTestId('profile-favorite-btn');
    const buttonLogout = screen.getByTestId('profile-logout-btn');

    userEvent.click(buttonDoneRecipes);
    expect(history.location.pathname).toBe('/done-recipes');

    userEvent.click(buttonFavoriteRecipes);
    expect(history.location.pathname).toBe('/favorite-recipes');

    userEvent.click(buttonLogout);
    expect(history.location.pathname).toBe('/');
  });
});
