// Sieve of Eratosthenes algorithm to find prime numbers
function sieveOfEratosthenes(n) {
  const primes = new Array(n + 1).fill(true);
  primes[0] = primes[1] = false;

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (primes[i]) {
      for (let j = i * i; j <= n; j += i) {
        primes[j] = false;
      }
    }
  }

  const result = [];
  
  for (let i = 2; i < n; i++) {
    if (primes[i]) {
      result.push(i);
    }
  }

  return result;
}

// Calculate median prime numbers
function medianPrimes(n) {
  let medianPrimesArr = [];
  
  // Find prime numbers using Sieve of Eratosthenes
  const primes = sieveOfEratosthenes(n);

  // Calculate the median numbers
  const median = Math.floor(primes.length / 2);

  // Return 2 median numbers if number of elements is even

  if (primes.length > 0) {
    if (primes.length % 2 === 0) {
      medianPrimesArr = [primes[median - 1], primes[median]];
    } else {
      medianPrimesArr = [primes[median]];
    }
  }
  else {
    medianPrimesArr = [`No median primes less than ${n}.`];
  }

  return medianPrimesArr;
}

module.exports = { sieveOfEratosthenes, medianPrimes };