// Déclaration des données pour le graphique
let timeLabels = []; // Pour stocker les labels de temps
let priceData = [];  // Pour stocker les données des prix

// Création du graphique
const ctx = document.getElementById('crypto-chart').getContext('2d');
const cryptoChart = new Chart(ctx, {
    type: 'line', // Type de graphique en courbe
    data: {
        labels: timeLabels, // Labels des X
        datasets: [{
            label: 'Prix du Bitcoin (USD)',
            data: priceData, // Données des Y (prix)
            borderColor: '#1abc9c',
            backgroundColor: 'rgba(26, 188, 156, 0.2)',
            borderWidth: 2,
            tension: 0.4, // Lissage de la courbe
        }]
    },
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                ticks: {
                    stepSize: 1
                }
            },
            y: {
                beginAtZero: false,
                ticks: {
                    callback: function(value) {
                        return '$' + value; // Affichage des prix en USD
                    }
                }
            }
        },
    }
});

// Fonction pour récupérer les prix de la crypto
async function fetchCryptoData() {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';
    try {
        const response = await fetch(url);
        const data = await response.json();
        const price = data.bitcoin.usd;
        const time = new Date().getTime(); // Heure actuelle en millisecondes

        // Ajouter les nouvelles données au graphique
        timeLabels.push(time);
        priceData.push(price);

        // Mettre à jour le graphique avec les nouvelles données
        cryptoChart.update();

        // Mettre à jour l'UI avec le prix
        document.getElementById('loading').style.display = 'none';
        document.getElementById('crypto-price').style.display = 'block';
        document.getElementById('crypto-price').innerText = `$${price}`;

        // Afficher le graphique
        document.getElementById('crypto-chart').style.display = 'block';
    } catch (error) {
        console.error('Erreur lors de la récupération des données crypto:', error);
    }
}

// Appel immédiat de la fonction pour récupérer les données
fetchCryptoData();

// Mettre à jour les données toutes les 30 secondes
setInterval(fetchCryptoData, 30000);
