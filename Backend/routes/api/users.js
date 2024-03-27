const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser"); //
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

// Use cookie-parser as middleware
router.use(cookieParser());

// Add user
router.post("/adduser", async (req, res) => {
  const { name, email, password, role } = req.body;
  let user = await User.findOne({ email });

  if (user) return res.status(400).send("Email already taken");

  user = new User({ name, email, password, role });
  await user.save();

  // Generate JWT token
  const token = user.generateAuthToken();

  // Send the user and token in the response
  res.status(200).json({ user, token });
});

// list users
router.get("/list", async (req, res) => {
  const users = await User.find();
  res.send(users);
});
// API pour les administrateurs
router.get("/admins", async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' });
    res.send(admins);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

// API pour les utilisateurs réguliers
router.get("/users", async (req, res) => {
  try {
    const regularUsers = await User.find({ role: 'user' });
    res.send(regularUsers);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Administrator does not exist!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Email or Password is not correct" });
    }

    // Generate JWT token
    const token = user.generateAuthToken();

    // Add JWT token as a cookie
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // Cookie expires after 1 hour (3600000 milliseconds)

    // Add any additional logic you need for a successful login

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//supprimer
router.delete('/delete/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const user = await User.findById(id);

      if (!user) {
          return res.status(404).send('User not found');
      }

      const result = await user.deleteOne();
      res.send(result);
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

//modifier
router.put('/update/:id', async (req, res) => {
  try {
      const { name,email } = req.body;
      const id = req.params.id;
      const user = await User.findById(id).exec();

      if (!user) {
          return res.status(404).send('Product not found');
      }
      user.name=name;
      user.email=email;
     
      const update = await user.save();
      res.send(update);
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
