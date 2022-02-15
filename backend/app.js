require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const app = express();
const port = process.env.PORT || 4005;

// APP

app.use(express.json()); // remplace body parser

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
}); // app.liste = http.createServer() // + Log du Port

// Set Header for response to provide CORS Error
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // définis par * = tout le monde peut accéder à l'API
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Route
app.use("/api", routes); // rajoute /api a toute les routes du dossier routes
