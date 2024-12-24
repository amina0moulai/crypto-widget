// Initialisation du graphique
let chart = null;

// Fonction pour récupérer les prix de la crypto
async function fetchCryptoData() {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';
    try {
        const response = await fetch(url);
        const data = await response.json();
        const price = data.bitcoin.usd;

        // Mettre à jour l'UI avec le prix
        document.getElementById('loading').style.display = 'none';
        document.getElementById('crypto-price').style.display = 'block';
        document.getElementById('crypto-price').innerText = `$${price}`;
        
        // Afficher le canvas pour le graphique
        document.getElementById('crypto-chart').style.display = 'block';

        // Mettre à jour le graphique
        updateChart(price);
    } catch (error) {
        console.error('Erreur lors de la récupération des données crypto:', error);
    }
}

// Fonction pour mettre à jour le graphique
function updateChart(price) {
    const ctx = document.getElementById('crypto-chart').getContext('2d');

    // Si le graphique existe déjà, on le met à jour
    if (chart) {
        chart.data.datasets[0].data.push(price);
        chart.update();
    } else {
        // Sinon, on crée un nouveau graphique
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],  // Les labels sont les dates ou indices
                datasets: [{
                    label: 'Prix Bitcoin (USD)',
                    data: [price],  // Valeur initiale
                    borderColor: '#1abc9c',  // Couleur de la courbe
                    backgroundColor: 'rgba(26, 188, 156, 0.2)',  // Couleur de fond sous la courbe
                    fill: true,
                    tension: 0.1  // Courbure de la courbe
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'linear',  // Assurer que les labels de l'axe X sont numériques
                        position: 'bottom'
                    },
                    y: {
                        beginAtZero: false  // L'axe Y commence à partir du prix minimal
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