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
        marker: { color: 'rgb(46, 204, 113)' }, // Couleur verte (élégante)
        line: { color: 'rgb(142, 68, 173)', width: 3 }, // Couleur violet pour la ligne
        hovertemplate: 'Prix: $%{y}<extra></extra>',
    }];

    // Mise en forme du layout (affichage)
    const layout = {
        title: {
            text: 'Prix du Bitcoin en Temps Réel',
            font: { size: 24, family: 'Georgia, serif', color: 'rgb(142, 68, 173)' },
            x: 0.5,
            y: 0.95
        },
        xaxis: {
            title: 'Heure',
            titlefont: { size: 18, family: 'Georgia, serif', color: 'rgb(186, 189, 182)' },
            tickangle: 45,
            showgrid: false,
            zeroline: false,
        },
        yaxis: {
            title: 'Prix en USD',
            titlefont: { size: 18, family: 'Georgia, serif', color: 'rgb(186, 189, 182)' },
            showgrid: true,
            zeroline: true,
            gridcolor: 'rgb(44, 62, 80)', // Gris pour les lignes de grille
        },
        plot_bgcolor: 'rgb(18, 18, 18)', // Fond noir pour le graphique
        paper_bgcolor: 'rgb(44, 62, 80)', // Fond de la page
        showlegend: false, // Ne pas afficher la légende
        hoverlabel: {
            bgcolor: 'rgb(142, 68, 173)', // Violet pour les bulles de survol
            font: { color: 'white' }
        }
    };

    // Mettre à jour le graphique avec les nouvelles données
    Plotly.newPlot('crypto-chart', data, layout);
}

// Appel initial pour récupérer les données
fetchCryptoData();

// Mise à jour des données toutes les 30 secondes
setInterval(fetchCryptoData, 30000);
