'use strict'
const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_LIFE = process.env.ACCESS_TOKEN_LIFE;

const auth = {
  signToken (id) {
    return jwt.sign({ id: id }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_LIFE });
  }
}

module.exports = auth;
