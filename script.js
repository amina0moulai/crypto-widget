async function fetchCryptoData() {
    const url = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1';
    try {
        const response = await fetch(url);
        const data = await response.json();

        // On récupère les données des prix de la crypto
        const prices = data.prices.map(item => item[1]);
        const times = data.prices.map(item => new Date(item[0]));

        // Tracer la courbe avec Plotly
        const trace = {
            x: times,
            y: prices,
            type: 'scatter', // Scatter plot pour une courbe
            mode: 'lines',
            line: { color: 'rgba(26, 188, 156, 1)', width: 2 },
        };

        const layout = {
            title: 'Prix du Bitcoin',
            xaxis: {
                title: 'Heure',
                tickformat: '%H:%M',
            },
            yaxis: {
                title: 'Prix en USD',
            },
        };

        // Générer le graphique dans le div
        Plotly.newPlot('crypto-chart', [trace], layout);

    } catch (error) {
        console.error('Erreur lors de la récupération des données crypto:', error);
    }
}

// Appel immédiat de la fonction
fetchCryptoData();
