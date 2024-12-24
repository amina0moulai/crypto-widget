// Variables globales pour les données du graphique
let timeLabels = []; // Pour l'axe des x (temps)
let priceData = [];  // Pour l'axe des y (prix)

async function fetchCryptoData() {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';
    try {
        const response = await fetch(url);
        const data = await response.json();
        const price = data.bitcoin.usd;

        // Afficher le prix de la crypto
        document.getElementById('loading').style.display = 'none';
        document.getElementById('crypto-price').style.display = 'block';
        document.getElementById('crypto-price').innerText = `$${price}`;

        // Mettre à jour les données pour le graphique
        updateChart(price);
    } catch (error) {
        console.error('Erreur lors de la récupération des données crypto:', error);
    }
}

// Mettre à jour le graphique avec les nouvelles données
function updateChart(price) {
    // Ajouter la nouvelle donnée de prix à l'array
    if (timeLabels.length >= 10) { // Limiter le nombre de points à 10 pour ne pas surcharger le graphique
        timeLabels.shift(); // Supprimer le premier élément (ancien)
        priceData.shift();  // Supprimer le premier prix
    }

    // Ajouter le nouveau point à la fin
    timeLabels.push(new Date().toLocaleTimeString());
    priceData.push(price);

    // Créer ou mettre à jour le graphique
    const ctx = document.getElementById('crypto-chart').getContext('2d');

    // Créer un nouveau graphique si aucun n'existe
    if (window.cryptoChart) {
        window.cryptoChart.data.labels = timeLabels;
        window.cryptoChart.data.datasets[0].data = priceData;
        window.cryptoChart.update();
    } else {
        window.cryptoChart = new Chart(ctx, {
            type: 'line', // Type de graphique : courbe
            data: {
                labels: timeLabels, // Labels pour l'axe des x
                datasets: [{
                    label: 'Bitcoin (USD)',
                    data: priceData, // Données pour l'axe des y
                    borderColor: '#1abc9c',
                    borderWidth: 2,
                    fill: false, // Ne pas remplir l'intérieur de la courbe
                    tension: 0.1 // Courbe lisse
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom'
                    },
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toFixed(2); // Afficher le prix avec un symbole de dollar
                            }
                        }
                    }
                }
            }
        });
    }
}

// Appel immédiat de la fonction pour récupérer les données
fetchCryptoData();

// Mettre à jour les données toutes les 30 secondes
setInterval(fetchCryptoData, 30000);
