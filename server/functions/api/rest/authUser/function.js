'use strict'
const { badRequest } = require('../../../../utils/response');
const authController = require('./controller');

exports.handler = function(event, context, callback) {
  try {
    return authController(event, context, callback);
  } catch (error) {
    return badRequest("Failed Authorized");
  }
}