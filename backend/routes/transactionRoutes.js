// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Define your routes here
router.get('/', transactionController.getTransactions); // Ensure this route is defined

module.exports = router;
