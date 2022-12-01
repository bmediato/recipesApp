import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const dataTestSearchInput = 'search-input';
const dataTestButtonSearch = 'exec-search-btn';
const dataTestFistLetterRadio = 'first-letter-search-radio';
const dataTestIngredientsRadio = 'ingredient-search-radio';
const dataTestNameRadio = 'name-search-radio';

const renderizaSearchBar = (rota) => {
  const { history } = renderWithRouterAndRedux(<App />);
  act(() => {
    history.push(rota);
  });
  userEvent.click(screen.getByTestId('search-top-btn'));
};

const fazProcuraNoSearchBar = (radio) => {
  const searchInput = screen.getByTestId(dataTestSearchInput);
  userEvent.clear(searchInput);
  userEvent.type((searchInput), 'abacate');
  userEvent.click(screen.getByTestId(radio));
  userEvent.click(screen.getByTestId(dataTestButtonSearch));
};

describe('Testes relacionados ao SearchBar', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ mock: 'eu sou um mock' }),
    });
  });

  test('Verifica se a SearchBar só é renderizada no momento certo', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    expect(screen.queryByTestId(dataTestSearchInput)).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('search-top-btn'));
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
});
