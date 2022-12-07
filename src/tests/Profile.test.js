import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
// import Profile from '../components/Profile';

const email = 'teste@teste.com';

describe('Testes relacionados a pagina de perfil', () => {
  test('Verifica se o email salvo no localStorage aparece na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, email);
    userEvent.type(inputPassword, '1234567');
    userEvent.click(button);

    const saveLocalStorage = JSON.parse(localStorage.getItem('user'));
    console.log(saveLocalStorage);
    expect(saveLocalStorage.email).toBe(email);
    act(() => history.push('/profile'));
    expect(screen.getByText(email)).toBeInTheDocument();
  });

  test('Verifica a rota ao clicar nos botões ', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => history.push('/profile'));

    const buttonDoneRecipes = screen.getByTestId('profile-done-btn');

    userEvent.click(buttonDoneRecipes);
    expect(history.location.pathname).toBe('/done-recipes');
    act(() => history.push('/profile'));

    const buttonFavoriteRecipes = screen.getByTestId('profile-favorite-btn');
    userEvent.click(buttonFavoriteRecipes);
    expect(history.location.pathname).toBe('/favorite-recipes');
    act(() => history.push('/profile'));

    const buttonLogout = screen.getByTestId('profile-logout-btn');
    userEvent.click(buttonLogout);
    expect(history.location.pathname).toBe('/');
  });
  test('Verifica se o localStorage esta sendo limpo após o logout', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, email);
    userEvent.type(inputPassword, '1234567');
    userEvent.click(button);

    const saveLocalStorage = JSON.parse(localStorage.getItem('user'));
    expect(saveLocalStorage.email).toBe(email);

    act(() => history.push('profile'));

    const buttonLogout = screen.getByTestId('profile-logout-btn');
    userEvent.click(buttonLogout);
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('user'))).toBeNull();
  });
});
