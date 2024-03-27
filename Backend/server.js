// Appel des packages
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");

// Lancer le module express avec le format JSON
const app = express();
app.use(express.json());
app.use(cors());

//Appeler le chemin de connexion
const mongo_url = config.get("mongo_url");

//Permet l'interaction avec MongoDB
mongoose.set("strict", true);
mongoose
  .connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Bien connecté à MongoDB");
    
    //link users routes

    
    const usersRouter = require('./routes/api/users');
    app.use('/users', usersRouter);
   
    const productsRouter = require('./routes/api/products');
    app.use('/products',productsRouter);
    

    const stripeRouter = require('./routes/api/stripe');
    app.use('/stripe', stripeRouter);

    const categorieRouter=require('./routes/api/categories');
    app.use('/categories',categorieRouter);
    
    //Démarrer le serveur
    const port = process.env.PORT || 3001;
    app.listen(port, () => console.log(`Bien connecté au serveur via le port ${port}`));
  })
  .catch((err) => console.log(err));