const dotenv = require('dotenv');
const express = require("express");
const bodyParser = require("body-parser");
const startMongoServer = require('./src/config/db');
const apiV1Routes = require('./src/routes/v1')

dotenv.config();
startMongoServer();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(bodyParser.json());

app.use('/api/v1', apiV1Routes);

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});