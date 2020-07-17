'use strict'
const userModel = require('../../../models/userModel');
const { sign } = require('../../../utils/util');
const { configs } = require('../../../utils/consts');
const { ok, badRequest, unauthorized } = require('../../../utils/response');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');

const loginController = async(event) => {
  const body = JSON.parse(event.body);
  if (!body.user) return badRequest('User is required');
  console.log(`user = ${JSON.stringify(body)}`);
  const loginUser = body.user;

  if (!loginUser.id) return badRequest('Userid is required');
  if (!loginUser.password) return badRequest('Password is required');

  let item = {
    pk: 'user',
    sk: loginUser.id
  };

  let result = await userModel.get(
    item,
    { consistent: true }
  );
  
  if (!result.Item) return unauthorized('User not Found');
  if (!bcrypt.compareSync(loginUser.password, result.Item.password)) return badRequest('Wrong Password');

  let expireDate = moment().tz('Asia/Seoul').add(configs.TOKEN_EXP_HOURS, 'days').format();

  const token = sign(loginUser);
  const headers = {
    'Set-Cookie': `'jwt=${token}; Path=/; Expires=${expireDate};'`
  }
  return ok({}, headers);
}

module.exports = loginController