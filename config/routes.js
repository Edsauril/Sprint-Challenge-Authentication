const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../database/dbConfig.js");

const { authenticate } = require("./middlewares");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: []
  };

  const secret = "secret";

  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secret, options);
}

function register(req, res) {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 14);
  creds.password = hash;
  db("users")
    .insert(creds)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
}

function login(req, res) {
  const creds = req.body;
  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: "Authentication succesful", token });
      } else {
        res.status(401).json({ message: "Failed to authenticate" });
      }
    })
    .catch(err => res.status(500).json(err));
}

function getJokes(req, res) {
  axios
    .get("https://safe-falls-22549.herokuapp.com/random_ten")
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
