'use strict'
const jwt = require('jsonwebtoken');
const { configs } = require('../../../utils/consts');
const { generatePolicy } = require('../../../utils/util');

const authController = (event, context, callback) => {
  console.log(`event = ${JSON.stringify(event)}`);
  const parts = event.authorizationToken.split(' ');
  if (parts[0].toLowerCase() !== 'bearer' || !parts[1]) return callback('Unauthorized');
  const token = parts[1];

  try {
    jwt.verify(token, configs.AUTH_SECRET, (err, decoded) => {
      if (err) {
        console.warn('Invalid token', err);
        return callback('Unauthorized');
      }

      const arn = event.methodArn.split('/').slice(0, 2).join('/') + '/*';
      return callback(null, generatePolicy(decoded.id, 'Allow', arn))
    })
  } catch {
    return callback('Unauthorized');
  }
}

module.exports = authController