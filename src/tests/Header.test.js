import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testes relacionados ao componente Header', () => {
  test('Verifica se o Header renderiza', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => history.push('/meals'));

    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Meals');

    const profile = screen.getByTestId('profile-top-btn');
    expect(profile).toBeInTheDocument();

    const searchBtn = screen.getByTestId('search-top-btn');
    expect(searchBtn).toBeInTheDocument();
  });
  test('Testa se renderiza a pagina profile', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => history.push('/meals'));
    userEvent.click(screen.getByTestId('profile-top-btn'));
    act(() => history.push('/profile'));
    expect(history.location.pathname).toBe('/profile');
  });
  test('Testa se renderiza o input de pesquisa', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => history.push('/meals'));

    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);
    const inputSearch = screen.getByTestId('search-input');
    expect(inputSearch).toBeInTheDocument();
  });
});
