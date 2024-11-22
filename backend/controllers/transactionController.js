// controllers/transactionController.js
const Transaction = require('../models/Transaction');

// Controller to create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const { productTitle, productDescription, productPrice, quantitySold, dateOfSale, category } = req.body;
    
    // Validation of data here (e.g., ensure price is a number, etc.)

    const newTransaction = new Transaction({
      productTitle,
      productDescription,
      productPrice,
      quantitySold,
      dateOfSale,
      category,
    });

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).send('Error creating transaction.');
  }
};

// Controller to get all transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).send('Error fetching transactions.');
  }
};
