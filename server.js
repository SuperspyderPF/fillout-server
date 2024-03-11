const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/:formId/filteredResponses', async (req, res) => {
  try {
    const { formId } = req.params;

    const filters = req.query.filters;

    if (!filters) {
      return res.status(400).json({ error: 'Filters parameter is missing' });
    }

    const parsedFilters = JSON.parse(filters);

    const apiKey = 'sk_prod_TfMbARhdgues5AuIosvvdAC9WsA5kXiZlW8HZPaRDlIbCpSpLsXBeZO7dCVZQwHAY3P4VSBPiiC33poZ1tdUj2ljOzdTCCOSpUZ_3912';
    const apiUrl = `https://api.fillout.com/v1/api/forms/${formId}/submissions`;
    const headers = {
      Authorization: `Bearer ${apiKey}`,
    };
    const params = {
      filters: JSON.stringify(parsedFilters),
    };

    const response = await axios.get(apiUrl, { headers, params });

    res.json(response.data);
  } catch (error) {
    console.error('Sorry!! There was an error fetching filtered responses:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
