require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { medianPrimes } = require('./median-primes');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

// Define route for incoming GET requests to medianPrimes endpoint
app.get('/api/medianPrimes/:n', (req, res) => {
  if (req == null || req.params == null || res == null) {
    res.json({ error: 'Request object cannot be null.' });
  }

  if ((req.params.n).trim() == "") {
    res.json({ error: 'Input value cannot be empty.' });
  }

  try {
    const n = parseInt(req.params.n);

    if (n < 2 || !(Number.isInteger(n)) || isNaN(n)) {
      res.json({ error: 'Invalid input. Please enter a number greater than 1.' });
    }
    else {
      const medians = medianPrimes(n);
      res.json({ medians });
    }
  }
  catch (ex) {
    res.json({ error: 'Could not parse input value to integer.' + ex.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
