// Exemple de mise à jour du graphique
var layout = {
    title: 'Bitcoin Price',
    titlefont: {
        family: 'Arial, sans-serif',
        size: 24,
        color: '#8e44ad', // Titre en violet pour l'effet néon
    },
    plot_bgcolor: 'rgba(0, 0, 0, 0.8)', // Fond du graphique sombre pour renforcer l'effet
    paper_bgcolor: 'rgba(0, 0, 0, 0.8)', // Fond de l'ensemble du graphique
    xaxis: {
        showgrid: false,
        showline: true,
        linecolor: '#1abc9c', // Ligne de l'axe en vert néon
        zeroline: false
    },
    yaxis: {
        showgrid: true,
        gridcolor: '#444444', // Grilles sombres
        showline: true,
        linecolor: '#1abc9c' // Lignes d'axe en vert néon
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

console.log("Script chargé avec succès !");

var trace = {
    x: [new Date()], // Initialiser le graphique avec la date actuelle
    y: [0],           // Initialiser la valeur du Bitcoin à 0
    mode: 'lines',
    line: {
        color: '#8e44ad', // Ligne violette néon
        width: 2
    },
    name: 'Bitcoin'
};

// Initialiser le graphique avec des valeurs par défaut
Plotly.newPlot('crypto-chart', [trace], layout);

async function fetchCryptoData() {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';
    try {
        const response = await fetch(url);
        const data = await response.json();
        const price = data.bitcoin.usd;

        console.log('Prix du Bitcoin:', price); // Afficher le prix dans la console pour vérifier

        // Mettre à jour le prix dans le widget
        document.getElementById('loading').style.display = 'none';
        document.getElementById('crypto-price').style.display = 'block';
        document.getElementById('crypto-price').innerText = `$${price}`;

        // Mettre à jour le graphique avec les nouvelles données
        updateChart(price);

    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
}

// Fonction pour mettre à jour le graphique avec les nouvelles données
function updateChart(price) {
    var newTime = new Date();
    trace.x.push(newTime);
    trace.y.push(price);

    if (trace.x.length > 50) { // Limiter le nombre de points sur le graphique
        trace.x.shift();
        trace.y.shift();
    }

    Plotly.update('crypto-chart', { x: [trace.x], y: [trace.y] }, layout);
}

// Initialiser la récupération des données
fetchCryptoData();

// Mettre à jour les données toutes les 30 secondes
setInterval(fetchCryptoData, 30000);
