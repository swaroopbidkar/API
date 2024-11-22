// routes/chartRoutes.js
const express = require('express');
const { getBarChart, getPieChartData } = require('../controllers/chartController'); // Ensure correct import

const router = express.Router();

// GET API to fetch bar chart data (price ranges)
router.get('/bar', getBarChart);

// GET API to fetch pie chart data (category counts)
router.get('/pie', getPieChartData);

module.exports = router;
