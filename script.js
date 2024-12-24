// Example of data for the crypto chart
var trace = {
    x: [new Date()],
    y: [0], // Initialize the value at 0
    mode: 'lines',
    line: {
        color: '#8e44ad', // Purple neon color for the line
        width: 2
    },
    name: 'Bitcoin'
};

var layout = {
    title: 'Bitcoin Price',
    titlefont: {
        family: 'Arial, sans-serif',
        size: 24,
        color: '#8e44ad', // Title color (purple)
    },
    plot_bgcolor: 'rgba(0, 0, 0, 0.7)', // Background color of the plot area
    paper_bgcolor: 'rgba(0, 0, 0, 0.7)', // Background color of the whole chart
    xaxis: {
        showgrid: false,
        showline: true,
        linecolor: '#1abc9c', // Line color (green)
        zeroline: false
    },
    yaxis: {
        showgrid: true,
        gridcolor: '#444444', // Grid lines color
        showline: true,
        linecolor: '#1abc9c' // Axis line color (green)
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

// Fetch data and update chart
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

        // Update chart
        updateChart(price);
    } catch (error) {
        console.error('Error fetching crypto data:', error);
    }
}

// Update chart with new price
function updateChart(price) {
    var newTime = new Date();
    trace.x.push(newTime);
    trace.y.push(price);
    
    if (trace.x.length > 50) { // Limit number of points on the chart
        trace.x.shift();
        trace.y.shift();
    }

    Plotly.update('crypto-chart', { x: [trace.x], y: [trace.y] }, layout);
}

// Initial fetch and update
fetchCryptoData();

// Update data every 30 seconds
setInterval(fetchCryptoData, 30000);
