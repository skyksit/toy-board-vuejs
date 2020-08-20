'use strict'
import messages from '../../../utils/messages.json';
const { badRequest } = require('../../../utils/response');
const loginController = require('./controller');

exports.handler = async function(event) {
  try {
    return await loginController(event);
  } catch (error) {
    console.log(`loginUser.function.error=${JSON.stringify(error)}`);
    return badRequest(messages.failLogin);
  }
}