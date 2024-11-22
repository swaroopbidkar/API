// controllers/chartController.js
const Transaction = require('../models/Transaction');

// Function to get bar chart data based on price ranges
exports.getBarChart = async (req, res) => {
  // Logic for fetching data for bar chart (price ranges)
  res.json({
    '0-100': 5,
    '101-200': 10,
    '201-300': 15,
  });
};

// Function to get pie chart data based on product category counts
exports.getPieChartData = async (req, res) => {
  // Logic for fetching data for pie chart (category counts)
  res.json({
    'Electronics': 20,
    'Clothing': 15,
    'Furniture': 10,
  });
};
