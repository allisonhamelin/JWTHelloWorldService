const express = require("express");
const expressjwt = require("express-jwt");
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.API_PORT || 8081;

const jwtCheck = expressjwt({
    secret: "marvel"
});

app.use(bodyParser.json());

app.get("/asset", (req, res) => {
    res.status(200).send("Everyone can see this.");
});

app.get("/asset/secret", jwtCheck, (req, res) => {
    res.status(200).send("You can only see this if you're logged in.");
});

app.get("*", (req, res) => {
    res.sendStatus(404);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});