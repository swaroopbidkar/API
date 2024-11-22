// routes/pieChartRoutes.js

const express = require('express');
const router = express.Router();
const { getPieChartData } = require('../controllers/chartController');  // Ensure the correct controller path

// Pie chart API endpoint
router.get('/', getPieChartData);

module.exports = router;
