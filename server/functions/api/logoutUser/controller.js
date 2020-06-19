'use strict'
const { configs } = require('../../../utils/consts');
const { ok } = require('../../../utils/response');

const logoutController = async(event) => {
  const headers = {
    'Set-Cookie': 'jwt=; Path=/; Expires=' + new Date(new Date().getTime()).toUTCString()
  }
  return ok({}, headers);
}

module.exports = logoutController