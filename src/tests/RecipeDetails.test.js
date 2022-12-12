import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { BUREK_MOCK, AQUAMARINE_MOCK } from './helpers/MockData';

describe('Testes da aplicação Recipe Details', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Testa a página Recipe Details renderiza os componentes esperados', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(AQUAMARINE_MOCK)
        .mockResolvedValueOnce(BUREK_MOCK),
    });

    const { history } = renderWithRouterAndRedux(<App />);
    act(() => { history.push('/meals/53060'); });

    const title = await screen.findByTestId('recipe-title');
    expect(title).toHaveTextContent('Burek');

    expect(screen.getByTestId('recipe-photo'))
      .toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg');

    const defaultIngredients = ['1 Packet: Filo Pastry',
      '150g: Minced Beef',
      '150g: Onion',
      '40g: Oil',
      'Dash: Salt',
      'Dash: Pepper'];
    defaultIngredients.forEach((ingredients, index) => {
      expect(screen.getByTestId(`${index}-ingredient-name-and-measure`))
        .toHaveTextContent(ingredients);
    });
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
  });
});
