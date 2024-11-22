// models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  productTitle: { type: String, required: true },
  productDescription: { type: String },
  productPrice: { type: Number, required: true },
  quantitySold: { type: Number, default: 0 },
  dateOfSale: { type: Date, required: true },
  category: { type: String },
});

// Pre-save hook to sanitize productPrice
transactionSchema.pre('save', function (next) {
  // Ensure that productPrice is a valid number
  if (isNaN(this.productPrice) || this.productPrice === undefined || this.productPrice === null) {
    console.log(`Invalid productPrice for product: ${this.productTitle}. Setting productPrice to 0.`);
    this.productPrice = 0;  // Set a default value or handle the error accordingly
  } else {
    this.productPrice = parseFloat(this.productPrice);  // Convert to number if it's a valid string
  }
  next();
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
