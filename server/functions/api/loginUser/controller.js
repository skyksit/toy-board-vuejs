'use strict'
const userModel = require('../../../models/userModel');
const { sign } = require('../../../utils/util');
const { configs } = require('../../../utils/consts');
const { ok, badRequest, unauthorized } = require('../../../utils/response');
const bcrypt = require('bcryptjs');

const loginController = async(event) => {
  const params = event.queryStringParameters;

  if (!params.id) return badRequest('Userid is required');
  if (!params.password) return badRequest('Password is required');

  let item = {
    pk: 'user',
    sk: params.id
  };

  let result = await userModel.get(
    item,
    { consistent: true }
  );
  
  if (!result.Item) return unauthorized('User not Found');
  if (!bcrypt.compareSync(params.password, result.Item.password)) return badRequest('Wrong Password');

  const token = sign(params);
  const headers = {
    'Set-Cookie': 'jwt=' + token + '; Path=/; Expires=' + new Date(new Date().getTime() + 1000 * configs.TOKEN_EXP_SECONDS).toUTCString()
  }
  return ok({}, headers);
}

module.exports = loginController