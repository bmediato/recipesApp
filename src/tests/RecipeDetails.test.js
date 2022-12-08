import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testes da aplicação Recipe Details', () => {
  test('Testa a página Recipe Details', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => { history.push('/meals/53060'); });
    const title = screen.findByRole('heading', { name: /burek/i });
    const img = screen.findByRole('img', { name: /burek/i });
    expect(title).toBeInTheDocument();
    expect(img).toBeInTheDocument();
  });
});
