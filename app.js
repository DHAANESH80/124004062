const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/numbers', async (req, res) => {
  const { url } = req.query;

  if (!url || !Array.isArray(url)) {
    return res.status(400).json({ error: 'Invalid query parameter: url' });
  }

  const validURLs = [];
  const invalidURLs = [];

  for (const urlString of url) {
    try {
      const response = await axios.get(urlString);
      const responseData = response.data;

      if (Array.isArray(responseData.numbers)) {
        validURLs.push(...responseData.numbers);
      } else {
        invalidURLs.push(urlString);
      }
    } catch (error) {
      invalidURLs.push(urlString);
    }
  }

  res.status(200).json({ numbers: validURLs });
});

app.listen(port, () => {
  console.log(`Number Management Service is running on port ${port}`);
});
