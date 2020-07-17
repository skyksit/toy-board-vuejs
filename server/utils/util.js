'use strict'
const jwt = require('jsonwebtoken');
const { configs } = require('../utils/consts');

const sign = (user) => {
  const payload = {
    id: user.id
  }
  const options = {
    expiresIn: configs.TOKEN_EXP_HOURS
  }
  const token = jwt.sign(payload, configs.AUTH_SECRET, options);
  return token;
}

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

module.exports = {
  sign,
  generatePolicy
}