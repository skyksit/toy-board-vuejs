'use strict'
const { badRequest } = require('../../../utils/response');
const createController = require('./controller');

exports.handler = async function(event) {
  try {
    let result = await createController(event);
    return result;
  } catch (error) {
    return badRequest('Failed Created User');
  }
}