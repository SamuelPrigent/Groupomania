const { Router } = require("express"); // import express
const router = Router(); // désormais router utilise express
const posts = require("../controllers/posts"); // import controllers
const auth = require("../middleware/auth"); // import jsonwebtoken verif
// const multer = require("../middleware/multer-config") // import rename nom fichier img

// Routes gestion des Posts

// remettre auth après test front
router.get("/", auth, posts.getPosts); // get all
router.get("/:id", auth, posts.getOnePost); // get 1
router.put("/:id", auth, posts.updatePost); // put 1
router.post("/", auth, posts.createPost); // Create new post
router.delete("/:id", auth, posts.deletePost); // del 1

module.exports = router;
