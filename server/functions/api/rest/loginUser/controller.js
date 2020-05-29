'use strict'
const userModel = require('../../../../models/userModel');
const { ok, badRequest } = require('../../../../utils/response');
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
  
  if (!result.Item) return badRequest('User not Found');
  if (!bcrypt.compareSync(params.password, result.Item.password)) return badRequest('Wrong Password');

  const headers = {
  }
  return ok({}, headers);
}

module.exports = loginController