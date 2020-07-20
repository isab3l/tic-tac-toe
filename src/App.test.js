import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders scoreboard', () => {
  const { getByText } = render(<App />);
  const scores = getByText(/X wins/i);
  expect(scores).toBeInTheDocument();
});
