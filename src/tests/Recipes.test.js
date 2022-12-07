import React from 'react';
import { findByTestId, findByText, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testes relacionados a página Recipe', () => {
  test('Testa as páginas meals e drinks', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/meals');
    });

    const breakfast = findByTestId('Breakfast-category-filter');
    userEvent.click(breakfast);
    const primeira = screen.findByTestId('0-card-name');
    const ultima = screen.findByTestId('6-card-name');
    const breakfastPotatoes = screen.findByText('BreakfastPotatoes');

    expect(primeira).toBeInTheDocument();
    expect(ultima).toBeInTheDocument();
    expect(breakfastPotatoes).toBeInTheDocument();

    const buttonAll = screen.findByTestId('All-category-filter');
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
    const first = screen.findByTestId('0-card-name');
    const last = screen.findByTestId('11-card-name');
    const kafteji = findByText('Kafteji');

    expect(first).toBeInTheDocument();
    expect(last).toBeInTheDocument();
    expect(kafteji).toBeInTheDocument();

    const drinksBtn = getByTestId('drinks-bottom-btn');
    userEvent.click(drinksBtn);

    const shake = screen.findByTestId('Shake-category-filter');
    expect(shake).toBeInTheDocument();
    userEvent.click(shake);
    const firstDrink = screen.findByTestId('0-recipe-card');
    expect(firstDrink).toBeInTheDocument();
    const avalanche = screen.findByText('Avalanche');
    expect(avalanche).toBeInTheDocument();
    userEvent.click(shake);
    const a1 = screen.findByText('A1');
    expect(a1).toBeInTheDocument();
    userEvent.click(shake);
    expect(avalanche).toBeInTheDocument();
  });
});
