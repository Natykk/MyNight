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
const Trajet = require('./trajets');

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



connectToMongoDB();

// Middleware pour l'analyse des corps de requête
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Middleware CORS
app.use(cors());

// endpoint pour la création d'un compte utilisateur
app.post('/signup', (req, res) => {
  console.log(req.body);
  if (!req.body.user || !req.body.mdp) {
    res.json({ success: false, msg: 'Entrez une adresse e-mail et un mot de passe.' });
  } else {
    const newUser = new User({
      name: req.body.user,
      password: req.body.mdp
    });

    // Enregistrement de l'utilisateur dans la base de données
    newUser.save()
      .then(() => {
        res.json({ success: true, msg: 'Utilisateur créé avec succès.' });
        // retourner une réponse OK
        return res.status(200);
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
app.post('/api_ingredient', (req, res) => {
  // Obtenez les ingrédients à partir des paramètres de requête ou utilisez une liste par défaut
  let recherche = req.body.recherche;
  console.log("ingridents : %s", recherche);
  recherche = recherche.split(',');
  let data = '';

  // les/l'ingredients n'est pas null et est un tableau
  if (!recherche || !Array.isArray(recherche)) {
    console.log(recherche);
    console.log(recherche.class);
    return res.status(400).json({ error: 'Veuillez fournir des ingrédients valides' });
  }

  // Construisez la requête externe avec les ingrédients fournis
  const options = {
    hostname: 'api.spoonacular.com',
    port: 443,
    path: `/recipes/findByIngredients?type=drink&ingredients=${recherche.join(',')}&number=10&apiKey=${cle}`,
    method: 'GET',
  };

  // Effectuez la requête HTTPS vers l'API externe
  const requ = https.request(options, (response) => {
    // Accumulez les morceaux de données reçus
    response.on('data', (chunk) => {
      data += chunk;
    });

    // Une fois que toutes les données ont été reçues
    response.on('end', () => {
      console.log(data);
      // Envoyez les données au client
      res.status(200).json({ message: 'Requête API réussie', content: data });
    });
  });
  
  // Gestion des erreurs de requête
  requ.on('error', (error) => {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la requête vers l\'API externe' });
  });

  // Terminez la requête (important pour l'envoi de la requête)
  requ.end();
});

  // endpoint pour l'API
app.post('/api_nom', (req, res) => {
  // Obtenez les ingrédients à partir des paramètres de requête ou utilisez une liste par défaut
  let recherche = req.body.recherche;
  recherche = recherche.split(',');
  let data = '';

  // les/l'ingredients n'est pas null et est un tableau
  if (!recherche || !Array.isArray(recherche)) {
    console.log(recherche);
    console.log(recherche.class);
    return res.status(400).json({ error: 'Veuillez fournir des ingrédients valides' });
  }

  // Construisez la requête externe avec les ingrédients fournis
  const options = {
    hostname: 'api.spoonacular.com',
    port: 443,
    path: `/recipes/complexSearch?type=drink&query=${recherche}&number=10&apiKey=${cle}`,
    method: 'GET',
  };

  // Effectuez la requête HTTPS vers l'API externe
  const requ = https.request(options, (response) => {
    // Accumulez les morceaux de données reçus
    response.on('data', (chunk) => {
      data += chunk;
    });

    // Une fois que toutes les données ont été reçues
    response.on('end', () => {
      console.log(data);
      // Envoyez les données au client
      res.status(200).json({ message: 'Requête API réussie', content: data });
    });
  });

  // Gestion des erreurs de requête
  requ.on('error', (error) => {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la requête vers l\'API externe' });
  });

  // Terminez la requête (important pour l'envoi de la requête)
  requ.end();
});


//Endpoint pour le covoiturage
app.post('/ajout_trajet', async (req, res) => {
  // ajout d'un trajet
  //trajets.push(new Trajet(req.body.depart, req.body.arrivee, req.body.date, req.body.heure, req.body.nbPlace, req.body.prix, req.body.conducteur, req.body.passagers));
  console.log("ajout trajet");
  console.log(req.body);

  // Création d'un nouveau trajet avec les données fournies
  const newTrajet = new Trajet({
    Depart: req.body.depart,
    Arrivee: req.body.arrivee,
    Date: req.body.date,
    Heure: req.body.heure,
    Nbplace: req.body.nbPlace,
    Prix: req.body.prix,
    Id_Conducteur: req.body.conducteur,
    Conducteur: req.body.username
  });

  // verifie si le trajet n'est pas deja enregistré
  const verif = await Trajet.findOne({
    Depart: req.body.depart,
    Arrivee: req.body.arrivee,
    Date: req.body.date,
    Heure: req.body.heure,
    Nbplace: req.body.nbPlace,
    Prix: req.body.prix,
    Id_Conducteur: req.body.conducteur,
    Conducteur: req.body.username
  });

  if (!verif) {
  // on sauvegarde le trajet
    newTrajet.save()
    .then(() => {
      res.json({ success: true, msg: 'Trajet ajouté avec succès.' });
      // retourner une réponse OK
      return res.status(200);
    });
  }else{
    res.json({ success: false, msg: 'Trajet déjà existant.' });
    return res.status(200);
  }
});

app.get('/getTrajets', async (req, res) => {
  const traj = await Trajet.find({
    Depart: req.body.depart,
    Arrivee: req.body.arrivee,
    Date: req.body.date
  });
  console.log(traj);
  res.json(traj);
  return res.status(200);
  
});

app.post('/card',  (req, res) => {
  console.log(req.body);
  let id = req.body.id;
  let data = '';
  
  // Construisez la requête externe avec les ingrédients fournis https://api.spoonacular.com/recipes/631913/card?apiKey=ca05937b768e473499187c0ce1ccc8ea
  const options = {
    hostname: 'api.spoonacular.com',
    port: 443,
    path: `/recipes/${id}/card?apiKey=${cle}`,
    method: 'GET',
  };

  // Effectuez la requête HTTPS vers l'API externe
  const requ = https.request(options, (response) => {
    // Accumulez les morceaux de données reçus
    response.on('data', (chunk) => {
      data += chunk;
    });

    // Une fois que toutes les données ont été reçues
    response.on('end', () => {
      console.log(data);
      // Envoyez les données au client
      res.status(200).json({ message: 'Requête API réussie', content: data });
    });
  });

  // Gestion des erreurs de requête
  requ.on('error', (error) => {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la requête vers l\'API externe' });
  });

  // Terminez la requête (important pour l'envoi de la requête)
  requ.end();
});



// Endpoint pour l'authentification
app.post('/auth', async (req, res) => {
  console.log(req.body);
  try {
    // Recherche de l'utilisateur dans la base de données par nom
    const user = await User.findOne({ name: req.body.user });

    // Vérification de la présence de l'utilisateur
    if (!user) {
      return res.send({ success: false, msg: 'Authentification échouée. Utilisateur non trouvé.' });
    }

    // Comparaison du mot de passe fourni avec celui stocké dans la base de données
    const isMatch = await user.comparePassword(req.body.mdp);

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
