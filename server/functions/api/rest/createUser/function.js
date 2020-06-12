'use strict'
const { badRequest } = require('../../../../utils/response');
const createController = require('./controller');

exports.handler = async function(event) {
  try {
    return await createController(event);
  } catch (error) {
    console.warn('createUser', error);
    return badRequest("Failed Created User");
  }
}