// controllers/combinedController.js
const { getStatistics } = require('./statisticsController');
const { getBarChart } = require('./chartController');
const { getPieChart } = require('./chartController');

exports.getCombinedData = async (req, res) => {
  try {
    // Get statistics
    const statistics = await new Promise((resolve, reject) => {
      getStatistics({ query: req.query }, { status: (code) => ({ json: resolve }) });
    });

    // Get bar chart data
    const barChartData = await new Promise((resolve, reject) => {
      getBarChart({ query: req.query }, { status: (code) => ({ json: resolve }) });
    });

    // Get pie chart data
    const pieChartData = await new Promise((resolve, reject) => {
      getPieChart({ query: req.query }, { status: (code) => ({ json: resolve }) });
    });

    // Combine all data into one response
    res.status(200).json({
      statistics,
      barChartData,
      pieChartData,
    });
  } catch (error) {
    console.error('Error fetching combined data:', error);
    res.status(500).send('Error fetching combined data.');
  }
};
