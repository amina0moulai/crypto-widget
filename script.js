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
