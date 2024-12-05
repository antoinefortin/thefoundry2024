import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Address Book header', () => {
  render(<App />);
  const headerElement = screen.getByText(/The Foundry Adress Book/i);
  expect(headerElement).toBeInTheDocument();
});
