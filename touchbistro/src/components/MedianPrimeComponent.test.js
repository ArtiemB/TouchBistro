import React from 'react';
import { render, screen } from '@testing-library/react';
import MedianPrimeComponent from './MedianPrimeComponent';

describe('MedianPrimeComponent', () => {
  it('renders the component', () => {
    render(<MedianPrimeComponent />);
    const titleElement = screen.getByText('TouchBistro');
    const subTitleElement = screen.getByText('Median Prime Calculator');
    const inputElement = screen.getByPlaceholderText('Enter a number');
    const buttonElement = screen.getByText('Go');

    expect(titleElement).toBeInTheDocument();
    expect(subTitleElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('displays median prime numbers for valid input', async () => {
    render(<MedianPrimeComponent />);
    const inputElement = screen.getByPlaceholderText('Enter a number');
    const buttonElement = screen.getByText('Go');

    fireEvent.change(inputElement, { target: { value: '10' } });
    fireEvent.click(buttonElement);

    // You might want to use waitFor instead of setTimeout to wait for the response
    await waitFor(() => {
      const resultElement = screen.getByText('Median Primes: 3, 5');
      expect(resultElement).toBeInTheDocument();
    });
  });

  it('displays an error message for invalid input', async () => {
    render(<MedianPrimeComponent />);
    const inputElement = screen.getByPlaceholderText('Enter a number');
    const buttonElement = screen.getByText('Go');

    fireEvent.change(inputElement, { target: { value: 'invalid' } });
    fireEvent.click(buttonElement);

    const errorMessageElement = await screen.findByText('Input value must be integer.');
    expect(errorMessageElement).toBeInTheDocument();
  });

  it('displays an error message for a blank input', async () => {
    render(<MedianPrimeComponent />);
    const inputElement = screen.getByPlaceholderText('Enter a number');
    const buttonElement = screen.getByText('Go');

    fireEvent.change(inputElement, { target: { value: '' } });
    fireEvent.click(buttonElement);

    const errorMessageElement = await screen.findByText('Input value cannot be blank.');
    expect(errorMessageElement).toBeInTheDocument();
  });
});
