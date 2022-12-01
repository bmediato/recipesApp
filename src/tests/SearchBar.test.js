import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { MOCKED_DRINKS,
  MOCKED_MEALS,
  MOCKED_ONE_MEAL,
  MOCKED_ONE_DRINK } from './helpers/MockData';

const dataTestSearchInput = 'search-input';
const dataTestButtonSearch = 'exec-search-btn';
const dataTestFistLetterRadio = 'first-letter-search-radio';
const dataTestIngredientsRadio = 'ingredient-search-radio';
const dataTestNameRadio = 'name-search-radio';
const dataTestSearchIcon = 'search-top-btn';

const renderizaSearchBar = (rota) => {
  const { history } = renderWithRouterAndRedux(<App />);
  act(() => {
    history.push(rota);
  });
  userEvent.click(screen.getByTestId(dataTestSearchIcon));
};

const fazProcuraNoSearchBar = (radio) => {
  const searchInput = screen.getByTestId(dataTestSearchInput);
  userEvent.clear(searchInput);
  userEvent.type((searchInput), 'abacate');
  userEvent.click(screen.getByTestId(radio));
  userEvent.click(screen.getByTestId(dataTestButtonSearch));
};

describe('Testes relacionados ao SearchBar', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Verifica se a SearchBar só é renderizada no momento certo', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    expect(screen.queryByTestId(dataTestSearchInput)).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId(dataTestSearchIcon));
    expect(screen.queryByTestId(dataTestSearchInput)).toBeInTheDocument();
  });

  test('Verifica se renderiza todos os inputs', () => {
    renderizaSearchBar('/meals');
    expect(screen.queryByTestId(dataTestIngredientsRadio)).toBeInTheDocument();
    expect(screen.queryByTestId(dataTestNameRadio)).toBeInTheDocument();
    expect(screen.queryByTestId(dataTestFistLetterRadio)).toBeInTheDocument();
    expect(screen.queryByTestId(dataTestButtonSearch)).toBeInTheDocument();
  });

  test('Verifica se é possível digitar nos inputs', () => {
    renderizaSearchBar('/meals');
    const searchInput = screen.getByTestId(dataTestSearchInput);
    userEvent.type(searchInput, 'avocado');
    expect(searchInput).toHaveValue('avocado');
  });

  test(
    'Verifica se a chamada da API é feita no endpoint correto em cada ocasião na página "/meals"',
    () => {
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(MOCKED_MEALS),
      });
      renderizaSearchBar('/meals');
      fazProcuraNoSearchBar(dataTestNameRadio);
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=abacate');

      fazProcuraNoSearchBar(dataTestIngredientsRadio);
      expect(fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=abacate');

      const searchInput = screen.getByTestId(dataTestSearchInput);
      userEvent.clear(searchInput);
      userEvent.type(searchInput, 'a');
      userEvent.click(screen.getByTestId(dataTestFistLetterRadio));
      userEvent.click(screen.getByTestId(dataTestButtonSearch));
      expect(fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
    },
  );

  test(
    'Verifica se é lançado um alert caso selecionar firstLetter e pesquisar com mais de uma letra',
    () => {
      window.alert = jest.fn();
      renderizaSearchBar('/meals');
      fazProcuraNoSearchBar(dataTestFistLetterRadio);
      expect(window.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    },
  );

  test(
    'Verifica se o botão não esta habilitado caso não preencha um dos campos',
    () => {
      renderizaSearchBar('/meals');
      const botao = screen.getByTestId(dataTestButtonSearch);
      expect(botao).toBeDisabled();
      userEvent.click(screen.getByTestId(dataTestFistLetterRadio));
      expect(botao).toBeDisabled();
      userEvent.type(screen.getByTestId(dataTestSearchInput), 'a');
      expect(botao).toBeEnabled();
    },
  );

  test(
    'Verifica se a chamada da API é feita no endpoint correto em cada ocasião na página "/drinks"',
    () => {
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(MOCKED_DRINKS),
      });
      renderizaSearchBar('/drinks');
      fazProcuraNoSearchBar(dataTestNameRadio);
      expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=abacate');

      fazProcuraNoSearchBar(dataTestIngredientsRadio);
      expect(fetch).toHaveBeenLastCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=abacate');

      const searchInput = screen.getByTestId(dataTestSearchInput);
      userEvent.clear(searchInput);
      userEvent.type(searchInput, 'a');
      userEvent.click(screen.getByTestId(dataTestFistLetterRadio));
      userEvent.click(screen.getByTestId(dataTestButtonSearch));
      expect(fetch).toHaveBeenLastCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
    },
  );

  test(
    'Verifica se quando a API retorna com apenas uma receita a página é redirecionada para o link correto',
    async () => {
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(MOCKED_ONE_MEAL),
      });
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => {
        history.push('/meals');
      });
      userEvent.click(screen.getByTestId(dataTestSearchIcon));
      fazProcuraNoSearchBar(dataTestIngredientsRadio);
      await waitFor(() => {
        expect(history.location.pathname).toBe('/meals/52958');
      });

      jest.clearAllMocks();
      act(() => {
        history.push('/drinks');
      });
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(MOCKED_ONE_DRINK),
      });
      userEvent.click(screen.getByTestId(dataTestSearchIcon));
      fazProcuraNoSearchBar(dataTestIngredientsRadio);
      await waitFor(() => {
        expect(history.location.pathname).toBe('/drinks/11524');
      });
    },
  );

  test(
    'Verifica se o componente esta renderizando as receitas corretamente na página meals',
    async () => {
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(MOCKED_MEALS),
      });
      renderizaSearchBar('/meals');
      fazProcuraNoSearchBar(dataTestIngredientsRadio);
      expect(await screen.findByTestId('0-recipe-card')).toBeInTheDocument();
      expect(screen.getByTestId('0-card-name')).toHaveTextContent('Beef Lo Mein');
      expect(screen.getByTestId('0-card-img')).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/1529444830.jpg');
    },
  );

  test(
    'Verifica se o componente esta renderizando as receitas corretamente na página drinks',
    async () => {
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(MOCKED_DRINKS),
      });
      renderizaSearchBar('/drinks');
      fazProcuraNoSearchBar(dataTestIngredientsRadio);
      expect(await screen.findByTestId('0-recipe-card')).toBeInTheDocument();
      expect(screen.getByTestId('0-card-name')).toHaveTextContent('A True Amaretto Sour');
      expect(screen.getByTestId('0-card-img')).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/rptuxy1472669372.jpg');
    },
  );

  test(
    'Verifica se quando a API retornar mais do que 12 receitas, o componente renderiza apenas 12',
    async () => {
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(MOCKED_MEALS),
      });
      renderizaSearchBar('/meals');
      fazProcuraNoSearchBar(dataTestIngredientsRadio);
      const allRecipes = await screen.findAllByAltText('Imagem ilustrativa da receita');
      expect(allRecipes).toHaveLength(12);
    },
  );
});
