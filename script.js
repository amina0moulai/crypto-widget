// On attend que la page soit chargée
window.onload = function() {
    const ctx = document.getElementById('bitcoinChart').getContext('2d');
    
    // Créer un graphique avec Chart.js
    const bitcoinChart = new Chart(ctx, {
        type: 'line',  // Type de graphique : courbe
        data: {
            labels: [],  // Les dates ou heures (on ajoutera les labels dynamiquement)
            datasets: [{
                label: 'Prix du Bitcoin',
                data: [],  // Les prix du Bitcoin (on ajoutera les valeurs dynamiquement)
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',  // Le temps ou l'index sera sur l'axe X
                    position: 'bottom'
                }
            }
        }
    });

    // Fonction pour récupérer les données
    function fetchBitcoinData() {
        fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1')
            .then(response => response.json())
            .then(data => {
                // On ajoute les nouvelles données à la courbe
                const prices = data.prices;
                const labels = [];
                const chartData = [];

                prices.forEach((price, index) => {
                    labels.push(new Date(price[0]));  // Timestamp converti en date
                    chartData.push(price[1]);  // Prix du Bitcoin
                });

                bitcoinChart.data.labels = labels;
                bitcoinChart.data.datasets[0].data = chartData;
                bitcoinChart.update();
            })
            .catch(error => console.error('Erreur de récupération des données :', error));
    }

    // Récupérer les données toutes les 60 secondes
    setInterval(fetchBitcoinData, 60000); // Récupérer les données chaque minute

    // Appel initial
    fetchBitcoinData();
};
