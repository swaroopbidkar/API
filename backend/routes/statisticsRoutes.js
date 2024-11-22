// routes/statisticsRoutes.js
const express = require('express');
const { getStatistics } = require('../controllers/statisticsController');

const router = express.Router();

// GET API to fetch statistics for a selected month
router.get('/', getStatistics);

module.exports = router;
