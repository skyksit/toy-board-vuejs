'use strict'
const jwt = require('jsonwebtoken');
const TOKEN_EXP_HOURS = process.env.TOKEN_EXP_HOURS;
const AUTH_SECRET = process.env.AUTH_SECRET;

const auth = {
  signToken (id) {
    return jwt.sign({ id: id }, AUTH_SECRET, { expiresIn: TOKEN_EXP_HOURS });
  }
}

module.exports = auth;
