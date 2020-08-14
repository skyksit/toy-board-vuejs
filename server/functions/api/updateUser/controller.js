'use strict'
const userModel = require('../../../models/userModel');
const auth = require('../../../utils/auth');
const { ok, badRequest } = require('../../../utils/response');
const bcrypt = require('bcryptjs');

const updateUserController = async(event) => {
  const params = event.pathParameters;
  if (!params.id) return badRequest('Wrong Path');

  const body = JSON.parse(event.body);
  if (!body.user) return badRequest('User is required');
  const loginUser = body.user;

  if (!loginUser.id) return badRequest('Userid is required');
  if (!loginUser.password) return badRequest('Password is required');

  if (params.id != loginUser.id) return badRequest('Wrong Access');

  const encryptedPassword = bcrypt.hashSync(loginUser.password, 8);

  let item = {
    pk: 'user',
    sk: params.id
  };

  try {
    let result = await userModel.update(
      item, 
      {},
      {
        SET: ['#somefield = :somevalue'],
        ExpressionAttributeNames: { '#somefield': 'password' },
        ExpressionAttributeValues: { ':somevalue': encryptedPassword },
        ReturnValues: 'ALL_NEW'
      }
    );
    const token = auth.signToken(loginUser.id);

    result.Attributes.accessToken = token;
    return ok(result.Attributes);
  } catch(error) {
    return badRequest('비밀번호 변경을 실패했습니다');
  }
  
}

module.exports = updateUserController