// Import
const { Router } = require("express"); // import express
const posts = require("./posts"); // import route
const users = require("./user"); // import route

const router = Router(); // const router

// Début de toute les routes - sauf api rajouté via app.js
router.use("/posts", posts); // signifie que posts début routes posts
router.use("/users", users); // signifie que posts début routes posts

module.exports = router; // export
