'use strict'
const { badRequest } = require('../../../utils/response');
const getUserController = require('./controller');

exports.handler = async function(event) {
  try {
    return await getUserController(event);
  } catch (error) {
    return badRequest('Failed Get User');
  }
}