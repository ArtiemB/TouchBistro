import React, { useState } from 'react';

function MedianPrimeComponent() {
  const [inputValue, setInputValue] = useState('');
  const [medians, setMedians] = useState([]);
  const [error, setError] = useState(null);

  const baseUrl = process.env.REACT_APP_API_URL;
  const enterKey = 'ENTER';

  const handleInput = (e) => {
    setInputValue(e.target.value);
    setError(null);
  };

  const handleEnter = (e) => {
    if (e.key.toUpperCase() === enterKey) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      if (inputValue == null) {
        throw new Error("Input value cannot be blank.");
      }

      const input = parseInt(inputValue);

      if (!(Number.isInteger(input)) || isNaN(input)) {
        throw new Error("Input value must be integer.");
      }

      // Construct full URL with user input value to hit medianPrimes endpoint
      const medianPrimesUrl = `${baseUrl}${input}`;

      // Make a GET request to fetch data from the server
      const response = await fetch(medianPrimesUrl);
      
      if (!response.ok) {
        throw new Error(`Response Error: Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(`Data Error: ${data.error}`);
      }

      setMedians(data.medians);
    }
    catch (error) {
      setMedians([]);
      setError(`${error.message}`);
    }
  };

  return (
    <div>
      <h1>TouchBistro</h1>
      <h2>Median Prime Calculator</h2>

      <input
        type="number"
        placeholder="Enter a number"
        value={inputValue}
        onChange={handleInput}
        onKeyPress={handleEnter}
      />
      <button onClick={handleSubmit}>Go</button>

      {medians.length > 0 && (
        <div>
        <p>
          {medians.length === 1 ? 'Median Prime: ' : 'Median Primes: '}
          {medians.join(', ')}
        </p>
      </div>
      )}
      {error && <p style={{ color: '#ab0a0a' }}>{error}</p>}
    </div>
  );
}

export default MedianPrimeComponent;
