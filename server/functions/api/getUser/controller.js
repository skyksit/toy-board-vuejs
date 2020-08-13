'use strict'
const userModel = require('../../../models/userModel');
const { ok, badRequest, unauthorized } = require('../../../utils/response');

const getUserController = async(event) => {
  const params = event.queryStringParameters;

  if (!params.id) return badRequest('Userid is required');
  
  let item = {
    pk: 'user',
    sk: params.id
  };

  let result = await userModel.get(
    item,
    { consistent: true }
  );
  
  return ok(result.Item);
}

module.exports = getUserController