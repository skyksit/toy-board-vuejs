'use strict'
const { badRequest } = require('../../../../utils/response');
const loginController = require('./controller');

exports.handler = async function(event) {
  try {
    return await loginController(event);
  } catch (error) {
    return badRequest('Failed Login User');
  }
}