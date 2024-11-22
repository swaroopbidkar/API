const express = require('express');
const axios = require('axios');
const app = express();

// External API URL
const externalApiUrl = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';

// Fetch Transaction Data from external API
app.get('/api/transactions', async (req, res) => {
  try {
    const response = await axios.get(externalApiUrl);
    const transactions = response.data;
    const filteredTransactions = transactions.filter(transaction => {
      const selectedMonth = req.query.month || '3';  // Default is March
      const transactionMonth = new Date(transaction.dateOfSale).getMonth() + 1; // getMonth() is 0-based
      return transactionMonth == selectedMonth;
    });
    
    res.json(filteredTransactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).send('Error fetching transactions.');
  }
});

// Fetch Bar Chart Data from external API
app.get('/api/bar-chart', async (req, res) => {
  try {
    const response = await axios.get(externalApiUrl);
    const transactions = response.data;

    const barChartData = {
      '0-100': 0,
      '101-200': 0,
      '201-300': 0,
      '301-400': 0,
    };

    transactions.forEach(transaction => {
      const price = transaction.productPrice;
      if (price <= 100) barChartData['0-100']++;
      else if (price <= 200) barChartData['101-200']++;
      else if (price <= 300) barChartData['201-300']++;
      else if (price <= 400) barChartData['301-400']++;
    });

    res.json(barChartData);
  } catch (error) {
    console.error('Error fetching bar chart data:', error);
    res.status(500).send('Error fetching bar chart data');
  }
});

// Fetch Pie Chart Data from external API
app.get('/api/pie-chart', async (req, res) => {
  try {
    const response = await axios.get(externalApiUrl);
    const transactions = response.data;

    const pieChartData = {
      'Electronics': 0,
      'Clothing': 0,
      'Furniture': 0,
      'Toys': 0,
    };

    transactions.forEach(transaction => {
      const category = transaction.category; // Assuming there's a category field in the data
      if (pieChartData[category] !== undefined) {
        pieChartData[category]++;
      }
    });

    res.json(pieChartData);
  } catch (error) {
    console.error('Error fetching data for pie chart:', error);
    res.status(500).send('Error fetching pie chart data');
  }
});

// Serve static files
app.use(express.static('public'));

// Start the server
app.listen(3001, () => {
  console.log('Server running on port 3001');
});
