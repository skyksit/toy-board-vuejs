'use strict'
const userModel = require('../../../models/userModel');
const { sign } = require('../../../utils/util');
const { ok, badRequest, unauthorized } = require('../../../utils/response');
const bcrypt = require('bcryptjs');

const loginController = async(event) => {
  const body = JSON.parse(event.body);
  if (!body.user) return badRequest('User is required');
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

  const token = sign(loginUser);
  let userInfo = {
    id: result.Item.userid,
    name: result.Item.name,
    accessToken: token,
    message: 'User registered successfully!'
  };
  return ok(userInfo);
}

module.exports = loginController