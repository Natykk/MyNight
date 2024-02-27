// Import des modules nécessaires
const fs = require('fs');
const https = require('https');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import du modèle utilisateur
const User = require('./user');
const jwt = require('jwt-simple');


let fichier = fs.readFileSync('donnee.json');
let donneeCle= JSON.parse(fichier);

const cle = donneeCle["cle_sponnacular"];
const user_bdd = donneeCle["user_bdd"];
const password_bdd = donneeCle["password_bdd"];



// Initialisation d'une application Express
const app = express();

// Définition du port d'écoute
const port = 3080;

// Clé secrète pour la création de jetons JWT
const secret = donneeCle["secret"]







// Fonction de connexion à la base de données MongoDB
const connectToMongoDB = () => {
  mongoose.connect('mongodb+srv://'+user_bdd+':'+password_bdd+'@cluster0.iy7sqrx.mongodb.net/db_mynight?retryWrites=true&w=majority', {
    serverSelectionTimeoutMS: 5000, // temps d'attente pour la sélection du serveur
    socketTimeoutMS: 45000, // temps d'attente pour les requêtes
    family: 4, // utilise ipv4
  })
    .then(() => {
      console.log('Connecté à MongoDB');
      // Lancer le serveur Express une fois la connexion établie
      startServer();
    })
    .catch((err) => {
      console.error('Erreur de connexion MongoDB:', err);
    });
};

// Configuration des détails de l'API REST externe
const options = {
  hostname: 'api.spoonacular.com',
  port: 443,
  path: '/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2&apiKey=' + cle,
  method: 'GET',
};

connectToMongoDB();

// Middleware pour l'analyse des corps de requête
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Middleware CORS
app.use(cors());

// endpoint pour la création d'un compte utilisateur
app.post('/signup', (req, res) => {
  if (!req.body.name || !req.body.password) {
    res.json({ success: false, msg: 'Entrez une adresse e-mail et un mot de passe.' });
  } else {
    const newUser = new User({
      name: req.body.name,
      password: req.body.password
    });

    // Enregistrement de l'utilisateur dans la base de données
    newUser.save()
      .then(() => {
        res.json({ success: true, msg: 'Utilisateur créé avec succès.' });
      })
      .catch((err) => {
        if (err.code === 11000) {
          res.json({ success: false, msg: 'Utilisateur déjà existant.' });
        } else {
          console.error(err);
          res.status(500).json({ success: false, msg: 'Erreur lors de la sauvegarde de l\'utilisateur.' });
        }
      });
  }
});

// endpoint pour l'API
app.get('/api', (req, res) => {
  // Effectuer la requête HTTPS vers l'API externe
  const requ = https.request(options, (response) => {
    let data = '';

    // Accumuler les morceaux de données reçus
    response.on('data', (chunk) => {
      data += chunk;
    });

    // Une fois que toutes les données ont été reçues
    response.on('end', () => {
      console.log(data);
      // Envoyer les données au client si nécessaire
      res.json({ data });
    });
  });

  // Gestion des erreurs de requête
  requ.on('error', (error) => {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la requête vers l\'API externe' });
  });

  // Terminer la requête (important pour l'envoi de la requête)
  requ.end();
});

// Endpoint pour l'authentification
app.post('/auth', async (req, res) => {
  try {
    // Recherche de l'utilisateur dans la base de données par nom
    const user = await User.findOne({ name: req.body.name });

    // Vérification de la présence de l'utilisateur
    if (!user) {
      return res.send({ success: false, msg: 'Authentification échouée. Utilisateur non trouvé.' });
    }

    // Comparaison du mot de passe fourni avec celui stocké dans la base de données
    const isMatch = await user.comparePassword(req.body.password);

    // Si le mot de passe correspond
    if (isMatch) {
      // Création d'un jeton JWT en encodant les informations de l'utilisateur
      const token = jwt.encode(user, secret);
      // Retour des informations, y compris le jeton, au format JSON
      res.json({ success: true, token: 'JWT ' + token });
    } else {
      // Si le mot de passe ne correspond pas
      res.send({ success: false, msg: 'Authentification échouée. Mot de passe incorrect.' });
    }
  } catch (err) {
    // Gestion des erreurs, retour d'une réponse 500 en cas d'erreur
    console.error(err);
    res.status(500).json({ success: false, msg: 'Erreur lors de l\'authentification.' });
  }
});

// endpoint pour les utilisateurs authentifiés
app.get('/userinfo', (req, res) => {
  console.log(req.headers);
  if (req.headers.authorization === undefined) {
    res.status(403).json({ success: false, msg: 'Pas de token fourni.' });
  } else {
    req.headers.authorization = req.headers.authorization.replace('JWT ', '');
    const token = req.headers.authorization;
    console.log(token);
    if (token) {
      try {
        // Décodage du jeton
        const decoded = jwt.decode(token, secret);

        // Retour des informations de l'utilisateur
        res.json({ success: true, user: decoded });
      } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: 'Non Autorisé' });
      }
    } else {
      res.status(403).json({ success: false, msg: 'Pas de token fourni.' });
    }
  }
});

// Lancement du serveur Express
const startServer = () => {
  app.listen(port, () => {
    console.log(`Serveur à l'écoute sur le port::${port}`);
  });
};
