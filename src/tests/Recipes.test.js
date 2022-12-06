import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testes relacionados a página Recipe', () => {
  test('Verifica se os botoes de categoria estão sendo exibidos ', async () => {
    renderWithRouterAndRedux(<App />);

    const beef = await findByTestId('Beef-category-filter');
    expect(beef).toBeInTheDocument();

    const breakfast = await findByTestId('Breakfast-category-filter');
    expect(breakfast).toBeInTheDocument();
  });
});
