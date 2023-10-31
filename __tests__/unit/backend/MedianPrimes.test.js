const { sieveOfEratosthenes, medianPrimes } = require('../../../median-primes');

// Sieve of Eratosthenes function unit tests
describe('sieveOfEratosthenes', () => {
  test('returns an empty array for n = 1', () => {
    expect(sieveOfEratosthenes(1)).toEqual([]);
  });

  test('returns an array of prime numbers up to n', () => {
    expect(sieveOfEratosthenes(2)).toEqual([]);
    expect(sieveOfEratosthenes(3)).toEqual([2]);
    expect(sieveOfEratosthenes(10)).toEqual([2, 3, 5, 7]);
    expect(sieveOfEratosthenes(20)).toEqual([2, 3, 5, 7, 11, 13, 17, 19]);
  });
});

// medianPrimes function unit tests
describe('medianPrimes', () => {
  test('returns an error response for an input value smaller than 2', () => {
    expect(medianPrimes(1)).toEqual(["No median primes less than 1."]);
    expect(medianPrimes(0)).toEqual(["No median primes less than 0."]);
    expect(medianPrimes(-1)).toEqual(["No median primes less than -1."]);
  });

  test('returns the median primes for a given input value', () => {
    expect(medianPrimes(10)).toEqual([3, 5]);
    expect(medianPrimes(12)).toEqual([5]);
    expect(medianPrimes(18)).toEqual([7]);
    expect(medianPrimes(20)).toEqual([7, 11]);
  });

  test('handles large input values', () => {
    expect(medianPrimes(10000)).toEqual([4523]);
    expect(medianPrimes(12000)).toEqual([5441, 5443]);
    expect(medianPrimes(1000000)).toEqual([470299, 470303]);
  });

  test('returns one median prime for odd number of elements', () => {
    expect(medianPrimes(3)).toEqual([2]);
  });

  test('returns two median primes for even number of elements', () => {
    expect(medianPrimes(5)).toEqual([2, 3]);
  });
});
