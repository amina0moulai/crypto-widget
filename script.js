// Initializing trace and layout for Plotly chart
var trace = {
    x: [new Date()], // Start with the current time
    y: [0], // Start with 0
    mode: 'lines',
    line: {
        color: '#8e44ad', // Purple neon color
        width: 2
    },
    name: 'Bitcoin'
};

var layout = {
    title: 'Bitcoin Price',
    titlefont: {
        family: 'Arial, sans-serif',
        size: 24,
        color: '#8e44ad',
    },
    plot_bgcolor: 'rgba(0, 0, 0, 0.7)', 
    paper_bgcolor: 'rgba(0, 0, 0, 0.7)', 
    xaxis: {
        showgrid: false,
        showline: true,
        linecolor: '#1abc9c', 
        zeroline: false
    },
    yaxis: {
        showgrid: true,
        gridcolor: '#444444', 
        showline: true,
        linecolor: '#1abc9c' 
    },
    margin: {
        l: 40,
        r: 40,
        t: 40,
        b: 40
    },
    font: {
        family: 'Arial, sans-serif',
        color: 'white'
    }
};

// Initialize the chart immediately with an empty dataset
Plotly.newPlot('crypto-chart', [trace], layout);

// Function to fetch crypto data and update the chart
async function fetchCryptoData() {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';
    try {
        const response = await fetch(url);
        const data = await response.json();
        const price = data.bitcoin.usd;

        // Update price in the widget
        document.getElementById('loading').style.display = 'none';
        document.getElementById('crypto-price').style.display = 'block';
        document.getElementById('crypto-price').innerText = `$${price}`;

        // Update chart with new data
        updateChart(price);
    } catch (error) {
        console.error('Error fetching crypto data:', error);
    }
}

// Update chart data with the new price
function updateChart(price) {
    var newTime = new Date();
    trace.x.push(newTime);  // Add new time point
    trace.y.push(price);    // Add new price point

    if (trace.x.length > 50) { // Limit number of data points to 50
        trace.x.shift();
        trace.y.shift();
    }

    Plotly.update('crypto-chart', { x: [trace.x], y: [trace.y] }, layout);
}

// Initial data fetch
fetchCryptoData();

// Update data every 30 seconds
setInterval(fetchCryptoData, 30000);
