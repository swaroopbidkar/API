// routes/combinedRoutes.js
const express = require('express');
const { getCombinedData } = require('../controllers/combinedController');

const router = express.Router();

// GET API to fetch combined data (statistics, bar chart, and pie chart)
router.get('/', getCombinedData);

module.exports = router;
