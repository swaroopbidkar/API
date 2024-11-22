document.addEventListener('DOMContentLoaded', () => {
    const monthSelect = document.getElementById('monthSelect');
    const searchInput = document.getElementById('searchInput');
    const transactionTable = document.getElementById('transactionTable').getElementsByTagName('tbody')[0];
    const totalSales = document.getElementById('totalSales');
    const totalSoldItems = document.getElementById('totalSoldItems');
    const totalUnsoldItems = document.getElementById('totalUnsoldItems');
    
    // Fetch transactions based on selected month
    function fetchTransactions(month) {
        fetch(`http://localhost:3001/api/transactions?month=${month}`)
            .then(response => response.json())
            .then(data => {
                renderTransactionTable(data);
                updateStatistics(data);
            });
    }

    // Render transactions table
    function renderTransactionTable(transactions) {
        transactionTable.innerHTML = '';
        transactions.forEach(transaction => {
            const row = transactionTable.insertRow();
            row.insertCell(0).textContent = transaction.title;
            row.insertCell(1).textContent = transaction.description;
            row.insertCell(2).textContent = transaction.productPrice;
            row.insertCell(3).textContent = transaction.quantitySold;
        });
    }

    // Update statistics (total sales, sold items, unsold items)
    function updateStatistics(transactions) {
        let sales = 0;
        let soldItems = 0;
        let unsoldItems = 0;

        transactions.forEach(transaction => {
            sales += transaction.productPrice * transaction.quantitySold;
            soldItems += transaction.quantitySold;
            if (transaction.quantitySold === 0) unsoldItems++;
        });

        totalSales.textContent = `$${sales.toFixed(2)}`;
        totalSoldItems.textContent = soldItems;
        totalUnsoldItems.textContent = unsoldItems;
    }

    // Fetch Bar Chart Data
    function fetchBarChartData() {
        fetch('http://localhost:3001/api/bar-chart')
            .then(response => response.json())
            .then(data => {
                const barChartData = {
                    labels: Object.keys(data),
                    datasets: [{
                        label: 'Items Sold in Price Range',
                        data: Object.values(data),
                        backgroundColor: '#36A2EB',
                    }]
                };
                const ctx = document.getElementById('barChart').getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: barChartData,
                    options: { scales: { y: { beginAtZero: true } } }
                });
            });
    }

    // Fetch Pie Chart Data
    function fetchPieChartData() {
        fetch('http://localhost:3001/api/pie-chart')
            .then(response => response.json())
            .then(data => {
                const pieChartData = {
                    labels: Object.keys(data),
                    datasets: [{
                        label: 'Category Distribution',
                        data: Object.values(data),
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                        hoverOffset: 4
                    }]
                };
                const ctx = document.getElementById('pieChart').getContext('2d');
                new Chart(ctx, { type: 'pie', data: pieChartData });
            });
    }

    // Event listener for month selection
    monthSelect.addEventListener('change', function () {
        fetchTransactions(monthSelect.value);
        fetchBarChartData();
        fetchPieChartData();
    });

    // Event listener for search input
    searchInput.addEventListener('input', function () {
        const searchQuery = this.value.toLowerCase();
        fetch(`http://localhost:3001/api/transactions?month=${monthSelect.value}`)
            .then(response => response.json())
            .then(data => {
                const filteredTransactions = data.filter(transaction => 
                    transaction.title.toLowerCase().includes(searchQuery) ||
                    transaction.description.toLowerCase().includes(searchQuery) ||
                    transaction.productPrice.toString().includes(searchQuery)
                );
                renderTransactionTable(filteredTransactions);
            });
    });

    // Initial data load
    fetchTransactions(monthSelect.value);
    fetchBarChartData();
    fetchPieChartData();
});
