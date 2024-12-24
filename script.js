let chart; // Déclare la variable chart en dehors de la fonction pour qu'elle soit accessible dans tout le code

// Fonction pour créer ou mettre à jour le graphique
function updateChart(price) {
    const ctx = document.getElementById('crypto-chart').getContext('2d');
    
    // Si le graphique n'est pas encore créé, crée un nouveau graphique
    if (!chart) {
        chart = new Chart(ctx, {
            type: 'line', // On crée un graphique linéaire
            data: {
                labels: [], // Les labels (dates ou moments)
                datasets: [{
                    label: 'Bitcoin Price (USD)',
                    data: [], // Les données de prix
                    borderColor: '#1abc9c', // Couleur de la courbe
                    fill: false, // Ne pas remplir sous la courbe
                    tension: 0.1 // Légère courbure pour une courbe plus douce
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
                        beginAtZero: false
                    }
                }
            }
        });
    }

    // Ajouter le prix au graphique et mettre à jour
    const now = new Date(); // Temps actuel
    const time = now.getTime(); // Convertir en timestamp (millisecondes depuis 1970)
    
    // Ajouter le prix et le timestamp
    chart.data.labels.push(time);
    chart.data.datasets[0].data.push(price);

    // Garder le graphique à une taille raisonnable en limitant les labels
    if (chart.data.labels.length > 30) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
    }

    chart.update(); // Mettre à jour le graphique
}

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
        
        // Mettre à jour le graphique
        updateChart(price);
    } catch (error) {
        console.error('Erreur lors de la récupération des données crypto:', error);
    }
}

// Appel immédiat de la fonction pour récupérer les données
fetchCryptoData();

// Mettre à jour les données toutes les 30 secondes
setInterval(fetchCryptoData, 30000);
