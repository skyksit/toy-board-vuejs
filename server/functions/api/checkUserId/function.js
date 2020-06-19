'use strict'
const { badRequest } = require('../../../utils/response');
const checkUserIdController = require('./controller');

exports.handler = async function(event) {
  try {
    return await checkUserIdController(event);
  } catch (error) {
    return badRequest('Failed Get UserId');
  }
}