const { Router } = require("express"); // import express
const router = Router(); // désormais router utilise express
const users = require("../controllers/user"); // import controllers
const auth = require("../middleware/auth"); // import jsonwebtoken verif

// Routes gestion des Users
router.post("/signup", users.userRegistration); // Create User
router.post("/login", users.userLogin); // Create User
router.delete("/:id", auth, users.deleteUser); // Delete 1
router.get("/:id", auth, users.getOneUser); // Get 1

module.exports = router;
