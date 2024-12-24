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
