'use strict'
const userModel = require('../../../models/userModel');
const { sign } = require('../../../utils/util');
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
  
  console.log(`result=${JSON.stringify(result)}`);

  return ok(result.Item);
}

module.exports = getUserController