'use strict'
const { badRequest } = require('../../../utils/response');
const updateUserController = require('./controller');

exports.handler = async function(event) {
  try {
    return await updateUserController(event);
  } catch (error) {
    return badRequest('Failed Get User');
  }
}