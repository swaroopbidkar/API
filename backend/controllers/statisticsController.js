// controllers/statisticsController.js
const Transaction = require('../models/Transaction');

const monthMap = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
};

exports.getStatistics = async (req, res) => {
  const { month } = req.query;

  // Check if month is provided and is valid
  if (!month || !monthMap[month.toLowerCase()]) {
    return res.status(400).send('Invalid month provided');
  }

  // Convert the month string to a numeric month (1-12)
  const monthNumber = monthMap[month.toLowerCase()];

  // Create a date range for the selected month
  const startOfMonth = new Date(`2024-${monthNumber}-01`);
  const endOfMonth = new Date(startOfMonth);
  endOfMonth.setMonth(startOfMonth.getMonth() + 1);

  try {
    const transactions = await Transaction.find({
      dateOfSale: { $gte: startOfMonth, $lt: endOfMonth },
    });

    let totalSales = 0;
    let totalSoldItems = 0;
    let totalUnsoldItems = 0;

    transactions.forEach((transaction) => {
      totalSales += transaction.productPrice * transaction.quantitySold;
      totalSoldItems += transaction.quantitySold;
      totalUnsoldItems += transaction.quantitySold === 0 ? 1 : 0;
    });

    res.status(200).json({
      totalSales,
      totalSoldItems,
      totalUnsoldItems,
    });
  } catch (error) {
    console.error('Error calculating statistics:', error);
    res.status(500).send('Error calculating statistics.');
  }
};
