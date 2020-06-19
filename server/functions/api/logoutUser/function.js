'use strict'
const { badRequest } = require('../../../utils/response');
const logoutController = require('./controller');

exports.handler = async function(event) {
  try {
    return await logoutController(event);
  } catch (error) {
    return badRequest('Failed Logout User');
  }
}