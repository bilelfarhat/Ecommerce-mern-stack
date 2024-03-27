const express = require("express");
const router = express.Router();
const config = require("config");
const Product = require("../../models/Product");
const multer = require('multer');
const fs = require('fs');

const storage = multer.memoryStorage(); // Utilisation de multer pour stocker l'image en mémoire
const upload = multer({ storage: storage });

router.post("/addproduct", upload.single('image'), async (req, res) => {
  try {
    const { title, description, price, quantity, category } = req.body;

    // Vérifiez si les champs requis sont présents
    if (!title || !description || !price || !quantity || !category) {
      return res.status(400).json({ msg: 'Veuillez remplir tous les champs obligatoires' });
    }

    // Lire le fichier image et le convertir en base64
    const imageBuffer = req.file.buffer;
    const imageBase64 = imageBuffer.toString('base64');

    const product = new Product({ image: imageBase64, title, description, price, quantity, category });
    await product.save();

    res.json({
      produit: {
        id: product.id,
        image: product.image,
        title: product.title,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        category: product.category,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Une erreur s\'est produite lors de l\'ajout du produit' });
  }
});


// Reste du code inchangé...



//affichage
router.get('/list',async (req,res)=>{
    const products =await Product.find();
    res.send(products);


});
//affichage by id
router.get('/getbyid/:id',async(req,res)=>{
    const id =req.params.id;
    const productbyid=await Product.findById(id);
    res.send(productbyid);

});

//modifier
router.put('/update/:id', async (req, res) => {
    try {
        const { image,title, description, price, quantity,category } = req.body;
        const id = req.params.id;
        const product = await Product.findById(id).exec();

        if (!product) {
            return res.status(404).send('Product not found');
        }
        product.image=image;
        product.title = title;
        product.description = description;
        product.price = price;
        product.quantity = quantity;
        product.category=category

        const update = await product.save();
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
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        const result = await product.deleteOne();
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;