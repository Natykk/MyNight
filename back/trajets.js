// Importation des modules nécessaires
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

// Définition du schéma de modèle utilisateur avec Mongoose
var TrajetSchema = new Schema({
  Depart: {
    type: String,
    required: true  // Le lieu de départ est requis.
  },
  Arrivee: {
    type: String,
    required: true  // Le lieu d'arrivée est requis.
  },
  Date: {
    type: String,
    required: true  // La date est requise.
  }
  ,
  Heure: {
    type: String,
    required: true  // Le de rendez-vous est requis
  }
  ,
  Nbplace: {
    type: Number,
    required: true  // Le nombre de places est requis.
  },
  Prix: {
    type: Number,
    required: true  // Le Prix est requis.
  },
  Id_Conducteur:{
    type: String,
    required: true  // Le token du conducteur est requis.
  },
  Conducteur:{
    type: String,
    required: true  // Le conducteur est requis.
  }

});

TrajetSchema.pre('save', function(next) {
  var trajet = this;
  next();
});


// Exporter le modèle utilisateur créé avec Mongoose
module.exports = mongoose.model('Trajet', TrajetSchema);
