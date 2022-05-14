import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('render home title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Principal/i);
  expect(linkElement).toBeInTheDocument();
});
