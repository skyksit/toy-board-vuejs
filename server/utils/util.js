'use strict'
const jwt = require('jsonwebtoken');
const { TOKEN_EXP_SECONDS } = require('../utils/consts');

const sign = (user) => {
  const payload = {
    id: user.id
  }
  const options = {
    expiresIn: TOKEN_EXP_SECONDS
  }
  const token = jwt.sign(payload, 'verysecrettoken', options);
  return token;
}

module.exports = {
  sign
}