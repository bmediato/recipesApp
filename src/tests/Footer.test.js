import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testes relacionados ao Footer', () => {
  test('Verifica se as imagens estão sendo exibidas e encaminham no click', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('./meals');
    });
    const imgMeal = screen.getByTestId('meals-bottom-btn');
    expect(imgMeal).toBeInTheDocument();
    const imgDrink = screen.getByTestId('drinks-bottom-btn');
    expect(imgDrink).toBeInTheDocument();
    userEvent.click(imgDrink);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
