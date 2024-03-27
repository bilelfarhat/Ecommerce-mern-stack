const express = require("express");
const router = express.Router();
const Categorie = require("../../models/Categorie");

//add categorie
router.post("/addcategorie", async (req, res) => {
    const { name} = req.body;
    let categorie = await Categorie.findOne({ name });
  
    if (categorie) return res.status(400).send("Categorie already exist");
  
    categorie = new Categorie({ name });
    await categorie.save();

    res.status(200).json({ categorie });
  });

//list categorie
router.get("/list", async (req, res) => {
    const categories = await Categorie.find();
    res.send(categories);
  }); 
  
//modification categorie
router.put('/update/:id', async (req, res) => {
    try {
        const { name} = req.body;
        const id = req.params.id;
        const categorie = await Categorie.findById(id).exec();
  
        if (!categorie) {
            return res.status(404).send('Categorie not found');
        }
        categorie.name=name;
       
        const update = await categorie.save();
        res.send(update);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
  });  

//supprimer
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const categorie = await Categorie.findById(id);
  
        if (!categorie) {
            return res.status(404).send('Categorie not found');
        }
  
        const result = await categorie.deleteOne();
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
  });  
  
  module.exports = router;  