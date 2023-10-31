import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MedianPrimeComponent from '../../../touchbistro/src/components/MedianPrimeComponent';

describe('MedianPrimeComponent', () => {
  it('renders the component', () => {
    render(<MedianPrimeComponent />);
    expect(screen.getByText('TouchBistro')).toBeInTheDocument();
    expect(screen.getByText('Median Prime Calculator')).toBeInTheDocument();
  });

  it('displays median prime numbers for valid input', async () => {
    render(<MedianPrimeComponent />);
    const input = screen.getByPlaceholderText('Enter a number');
    const button = screen.getByText('Go');

    // Test input 10
    fireEvent.change(input, { target: { value: '10' } });
    fireEvent.click(button);
    await screen.findByText('Median Primes: 3, 5');

    // Test input 12
    fireEvent.change(input, { target: { value: '12' } });
    fireEvent.click(button);
    await screen.findByText('Median Prime: 5');

    // Test input 10000
    fireEvent.change(input, { target: { value: '10000' } });
    fireEvent.click(button);
    await screen.findByText('Median Prime: 4523');

    // Test input 12000
    fireEvent.change(input, { target: { value: '10000' } });
    fireEvent.click(button);
    await screen.findByText('Median Primes: 5441, 5443');
  });

  it('displays an error message for invalid input', () => {
    render(<MedianPrimeComponent />);
    const input = screen.getByPlaceholderText('Enter a number');
    const button = screen.getByText('Go');

    fireEvent.change(input, { target: { value: 'e' } });
    fireEvent.click(button);
    expect(screen.findByText('Invalid input. Please enter a number greater than 1.')).toBeInTheDocument();
    expect(screen.queryByText('Median Primes:')).toBeNull();

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(button);
    expect(screen.findByText('Invalid input. Please enter a number greater than 1.')).toBeInTheDocument();
    expect(screen.queryByText('Median Primes:')).toBeNull();

    fireEvent.change(input, { target: { value: '0' } });
    fireEvent.click(button);
    expect(screen.findByText('Invalid input. Please enter a number greater than 1.')).toBeInTheDocument();
    expect(screen.queryByText('Median Primes:')).toBeNull();

    fireEvent.change(input, { target: { value: '-1' } });
    fireEvent.click(button);
    expect(screen.findByText('Invalid input. Please enter a number greater than 1.')).toBeInTheDocument();
    expect(screen.queryByText('Median Primes:')).toBeNull();

    fireEvent.change(input, { target: { value: '-10000' } });
    fireEvent.click(button);
    expect(screen.findByText('Invalid input. Please enter a number greater than 1.')).toBeInTheDocument();
    expect(screen.queryByText('Median Primes:')).toBeNull();
  });

  it('displays median prime numbers in less than 300ms', async () => {
    const startTime = performance.now();
    
    render(<MedianPrimeComponent />);
    const input = screen.getByPlaceholderText('Enter a number');
    const button = screen.getByText('Go');
    
    // Set up a delay (simulating an async operation)
    const mockFetch = jest.fn(() => new Promise(resolve => setTimeout(resolve, 100)));
    global.fetch = mockFetch;

    fireEvent.change(input, { target: { value: '10' } });
    fireEvent.click(button);
    await screen.findByText('Median Primes: 3, 5');

    const endTime = performance.now();
    const timeTaken = endTime - startTime;

    expect(timeTaken).toBeLessThan(300);
  });

  it('displays median prime numbers from large input in less than 1 second', async () => {
    const startTime = performance.now();
    
    render(<MedianPrimeComponent />);
    const input = screen.getByPlaceholderText('Enter a number');
    const button = screen.getByText('Go');
    
    // Set up a delay (simulating an async operation)
    const mockFetch = jest.fn(() => new Promise(resolve => setTimeout(resolve, 100)));
    global.fetch = mockFetch;

    fireEvent.change(input, { target: { value: '12000000' } });
    fireEvent.click(button);
    await screen.findByText('Median Primes: 5706583, 5706619');

    const endTime = performance.now();
    const timeTaken = endTime - startTime;

    expect(timeTaken).toBeLessThan(1000);
  });

});
