// Lecture du fichier txt pour les clés 
const fs = require('fs');
let cle = fs.readFile('cle.txt', 'utf8', (err, data) => {
  if(err) {
    console.error(err);
    return;
  }
  console.log(data)
});

const https = require('https');

// Définir les détails de l'API REST
const options = {
    hostname: 'api.spoonacular.com',
    port: 80,
    path: '/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2&apiKey='+cle,
    method: 'GET',
  };
const express = require('express');

const cors = require('cors');

const app = express(),
    port = 3080;

app.use(cors());

app.get("/api", (req, res) => { // id , nom , prix , quantité
    // envoi un requete get pour obtenir les produits 
    // Effectuer la requête HTTPS
    const requ = https.request(options, (res) => {
    let data = '';
  
    // Accumuler les morceaux de données reçus
    res.on('data', (chunk) => {
      data += chunk;
    });
  
    // Une fois que toutes les données ont été reçues
    res.on('end', () => {
      console.log(data);
    });
  });
  
  // Gérer les erreurs de requête
  requ.on('error', (error) => {
    console.error(error);
  });
  
  // Terminer la requête (important pour envoyer la requête)
  requ.end();/*
    
    res.json([{
        id: 1,
        nom: "Produit 1",
        prix: 100,
        quantite: 10
    },
    {
        id: 2,
        nom: "Produit 2",
        prix: 200,
        quantite: 20    
    },
    {
        id: 3,
        nom: "Produit 3",
        prix: 300,
        quantite: 30
    }]
    );
    */
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
}
);
