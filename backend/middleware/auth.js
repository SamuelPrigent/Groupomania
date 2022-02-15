// Authentifie les actions via token + UserID
// Vérifie Action correspond à : UserId authentifié + UserId X a bien la permissions d'effectuer cette action

// Import
const jwt = require("jsonwebtoken");

// Middleware

module.exports = async (req, res, next) => {
  // Try car on essaye plusieurs élément dans le bloc try que l'on veut gérer avec le même catch
  try {
    const token = req.headers.authorization.split(" ")[1]; // on récupère le token d'auth de connection
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET); // Verify Token récup / stocké
    const userId = decodedToken.userId; // récup userId req décodé
    //  console.log("Decoded UserId =", userId); // undefined

    if (!decodedToken) {
      throw new Error("Invalid token");
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new Error("user not found");
    }
    req.user = user;
    req.userId = userId;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(405).json({ message: "Unauthorized request!" });
    console.log("=> Unauthorized request !");
  }
};
