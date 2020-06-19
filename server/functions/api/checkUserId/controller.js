'use strict'
const userModel = require('../../../models/userModel');
const { sign } = require('../../../utils/util');
const { ok, badRequest, unauthorized } = require('../../../utils/response');

const checkUserIdController = async(event) => {
  const params = event.queryStringParameters;

  if (!params.user_id) return badRequest('Userid is required');
  
  let item = {
    pk: 'user',
    sk: params.user_id
  };

  let result = await userModel.get(
    item,
    { consistent: true }
  );
  
  if (result.Item == undefined)
    return ok({use_id:true});

  return ok({use_id:false});
}

module.exports = checkUserIdController