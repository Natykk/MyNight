// Importation des modules nécessaires
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

// Définition du schéma de modèle utilisateur avec Mongoose
var UserSchema = new Schema({
  name: {
    type: String,
    unique: true,   // Le nom d'utilisateur doit être unique
    required: true  // Le nom d'utilisateur est requis
  },
  password: {
    type: String,
    required: true  // Le mot de passe est requis
  }
});

// Middleware exécuté avant la sauvegarde d'un utilisateur
UserSchema.pre('save', function (next) {
  var user = this;

  // Vérifier si le mot de passe a été modifié ou si c'est un nouvel utilisateur
  if (this.isModified('password') || this.isNew) {
    // Générer un sel pour le hachage
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      // Hacher le mot de passe avec le sel généré
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        // Stocker le mot de passe haché dans la base de données
        user.password = hash;
        next();
      });
    });
  } else {
    // Si le mot de passe n'est pas modifié, passer à l'étape suivante
    return next();
  }
});

// Méthode pour comparer le mot de passe fourni avec celui stocké dans la base de données
UserSchema.methods.comparePassword = function (passw) {
  // Utiliser une promesse pour gérer de manière asynchrone
  return new Promise((resolve, reject) => {
    bcrypt.compare(passw, this.password, (err, isMatch) => {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};

// Exporter le modèle utilisateur créé avec Mongoose
module.exports = mongoose.model('User', UserSchema);
