const express = require("express");
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const bearerToken = require('express-bearer-token');
const app = express();

const PORT = process.env.API_PORT || 8081;
const JSON_SECRET_KEY = 'marvel';

app.use(bodyParser.json());
app.use(bearerToken());

app.get("/assets", (req, res) => {
    res.status(200).send("Everyone can see this.");
});

app.get("/assets/secret", (req, res) => {
    jwt.verify(req.token, JSON_SECRET_KEY, (error, decoded) => {
        if(error) {
            res.status(401).send('You are not who you think you are!');
            return false;
        }

        res.status(200).send("You can only see this because you are " + decoded.username);
    });
});

app.get("*", (req, res) => {
    res.sendStatus(404);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
