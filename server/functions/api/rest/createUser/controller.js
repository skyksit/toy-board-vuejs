'use strict'
const userModel = require('../../../../models/userModel');
const { sign } = require('../../../../utils/util');
const { TOKEN_EXP_SECONDS } = require('../../../../utils/consts');
const { ok, badRequest } = require('../../../../utils/response');
const bcrypt = require('bcryptjs');

const createController = async(event) => {
  const body = JSON.parse(event.body);
  if (!body.id) return badRequest('Userid is required');
  if (!body.password) return badRequest('Password is required');
  const item = {
    pk: 'user',
    sk: body.id,
    content: body.name,
    password: bcrypt.hashSync(body.password, 8),
    userid: body.id
  };
  await userModel.put(item);
  const token = sign(body);
  const headers = {
    'Set-Cookie': 'jwt=' + token + '; Path=/; Expires=' + new Date(new Date().getTime() + 1000 * TOKEN_EXP_SECONDS).toUTCString()
  }
  return ok({}, headers);
}

module.exports = createController