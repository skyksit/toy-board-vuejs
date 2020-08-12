'use strict'
const jwt = require('jsonwebtoken');
const AUTH_SECRET = process.env.AUTH_SECRET;

const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {}
  authResponse.principalId = principalId
  if (effect && resource) {
    const policyDocument = {}
    policyDocument.Version = '2012-10-17'
    policyDocument.Statement = []
    const statementOne = {}
    statementOne.Action = 'execute-api:Invoke'
    statementOne.Effect = effect
    statementOne.Resource = resource
    policyDocument.Statement[0] = statementOne
    authResponse.policyDocument = policyDocument
  }
  return authResponse
}

const authController = (event, context, callback) => {
  console.log(`event = ${JSON.stringify(event)}`);
  const parts = event.authorizationToken.split(' ');
  if (parts[0].toLowerCase() !== 'bearer' || !parts[1]) return callback('Unauthorized');
  const token = parts[1];

  try {
    jwt.verify(token, AUTH_SECRET, (err, decoded) => {
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