// Fonction pour récupérer les données du prix du Bitcoin
async function fetchCryptoData() {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';
    try {
        const response = await fetch(url);
        const data = await response.json();
        const price = data.bitcoin.usd;

        // Mettre à jour le graphique avec le nouveau prix
        updateChart(price);
    } catch (error) {
        console.error('Erreur lors de la récupération des données crypto:', error);
    }
}

// Initialisation du graphique avec Plotly
let xValues = [];
let yValues = [];

// Fonction pour mettre à jour le graphique
function updateChart(price) {
    // Ajout des nouvelles données
    const currentTime = new Date().toLocaleTimeString();

    // Ajouter une nouvelle entrée dans les tableaux de données
    xValues.push(currentTime);
    yValues.push(price);

    // Limiter les données affichées aux 10 dernières valeurs
    if (xValues.length > 10) {
        xValues.shift();
        yValues.shift();
    }

    // Création des données du graphique
    const data = [{
        x: xValues,
        y: yValues,
        type: 'scatter', // Type graphique (ici une courbe)
        mode: 'lines+markers', // Affiche à la fois la ligne et les points
        marker: { color: 'rgb(0, 255, 0)' } // Couleur verte pour les points
    }];

    // Mise en forme du layout (affichage)
    const layout = {
        title: 'Prix du Bitcoin en Temps Réel',
        xaxis: {
            title: 'Heure',
            tickangle: 45
        },
        yaxis: {
            title: 'Prix en USD'
        }
    };

    // Mettre à jour le graphique avec les nouvelles données
    Plotly.newPlot('crypto-chart', data, layout);
}

// Appel initial pour récupérer les données
fetchCryptoData();

// Mise à jour des données toutes les 30 secondes
setInterval(fetchCryptoData, 30000);
