window.onload = function() {
    const chartContainer = document.getElementById('chart-container');

    // Fonction pour récupérer les données du Bitcoin
    function fetchBitcoinData() {
        fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1')
            .then(response => response.json())
            .then(data => {
                const prices = data.prices;
                const timestamps = [];
                const priceValues = [];

                // Traitement des données pour Plotly
                prices.forEach(price => {
                    timestamps.push(new Date(price[0])); // Convertir le timestamp en date
                    priceValues.push(price[1]);  // Valeur du Bitcoin
                });

                // Créer le graphique avec Plotly
                const trace = {
                    x: timestamps,
                    y: priceValues,
                    type: 'scatter',  // Type de graphique : courbe
                    mode: 'lines',
                    line: { color: 'rgb(255, 99, 132)' }
                };

                const layout = {
                    title: 'Cours du Bitcoin en Direct',
                    xaxis: { title: 'Temps' },
                    yaxis: { title: 'Prix (USD)' }
                };

                Plotly.newPlot(chartContainer, [trace], layout);
            })
            .catch(error => console.error('Erreur de récupération des données :', error));
    }

    // Récupérer les données toutes les 60 secondes
    setInterval(fetchBitcoinData, 60000);  // Récupérer les données chaque minute

    // Appel initial
    fetchBitcoinData();
};
