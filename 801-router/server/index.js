const express = require("express");
const app = express();
const path = require("path");

const pathToDist = path.join(__dirname, "..", "801-router", "dist");

const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next(); // Passes the request to the next middleware/controller
};

const serveHello = (req, res, next) => {
  const name = req.query.name || "stranger";
  res.send(`hello ${name}`);
};

const serveStatic = express.static(pathToDist);

app.use(logRoutes);
app.use(serveStatic);

app.get("/api/hello", serveHello);

const port = 8080;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));
