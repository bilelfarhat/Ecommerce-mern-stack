const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 25,
    },
    email: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 100,
        unique: true, // Assurez-vous que chaque adresse e-mail est unique
        lowercase: true, // Stockez les adresses e-mail en minuscules pour la normalisation
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
    },
    role:{
        type:String,
       required : true ,
    },
});

// Cryptage du mot de passe avant de sauvegarder dans la base de données
UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Génération du token JWT pour l'authentification
UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, name: this.name, email: this.email , role : this.role }, 'yourSecretKey', { expiresIn: '1h' });
    return token;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
