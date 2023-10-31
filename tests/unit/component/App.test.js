import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../../touchbistro/src/App';

test('renders the component', () => {
  render(<App />);
  expect(screen.getByText('TouchBistro')).toBeInTheDocument();
  expect(screen.getByText('Median Prime Calculator')).toBeInTheDocument();
});