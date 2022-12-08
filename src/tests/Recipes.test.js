import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

import App from '../App';
import { MOCK_MEALS, MOCK_DRINKS, DRINKS_CATEGORY, MEALS_CATEGORY, MEALS_DETAILS, DRINKS_DETAILS } from './helpers/MockRecipes';

describe('Testes relacionados a página Recipe', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Testa a páginas meals', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(MOCK_MEALS)
        .mockResolvedValueOnce(MEALS_CATEGORY),
    });

    act(() => {
      history.push('/meals');
    });

    await screen.findByText('Breakfast');
    const burek = screen.getByTestId('1-card-img');
    expect(burek).toBeInTheDocument();
    userEvent.click(burek);
    expect(history.location.pathname).toBe('/meals/53060');
  });
  test('Testa a página drinks', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(MOCK_DRINKS)
        .mockResolvedValueOnce(DRINKS_CATEGORY),
    });

    act(() => {
      history.push('/drinks');
    });
    await screen.findByText('Shake');

    const A1 = screen.getByTestId('1-card-img');
    expect(A1).toBeInTheDocument();
    userEvent.click(A1);
    expect(history.location.pathname).toBe('/drinks/17222');
  });
  test('Testa os botões da página meals de categoria', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(MEALS_DETAILS)
        .mockResolvedValueOnce(MEALS_CATEGORY)
        .mockResolvedValueOnce(MOCK_MEALS),
    });

    act(() => {
      history.push('/meals');
    });

    await screen.findByText('Goat');
    const goat = screen.getByTestId('Goat-category-filter');
    userEvent.click(goat);
    const all = screen.getByTestId('All-category-filter');
    userEvent.click(all);

    const corba = screen.getByText('Corba');
    expect(corba).toBeInTheDocument();
  });
  test('Testa os botões da página drinks de categoria', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(DRINKS_DETAILS)
        .mockResolvedValueOnce(DRINKS_CATEGORY)
        .mockResolvedValueOnce(MOCK_DRINKS),
    });

    act(() => {
      history.push('/drinks');
    });

    await screen.findByText('Other/Unknow');
    const other = screen.getByTestId('Other/Unknow-category-filter');
    userEvent.click(other);
    const all = screen.getByTestId('All-category-filter');
    userEvent.click(all);

    const A1 = screen.getByText('A1');
    expect(A1).toBeInTheDocument();
  });
});
