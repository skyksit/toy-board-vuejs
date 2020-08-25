'use strict'
const userModel = require('../../../models/userModel');
const auth = require('../../../utils/auth');
const { ok, badRequest } = require('../../../utils/response');
const bcrypt = require('bcryptjs');
const { messages } = require('../../../utils/messages.json');

const loginController = async(event) => {
  const body = JSON.parse(event.body);
  if (!body.user) return badRequest(messages.requireUser);
  const loginUser = body.user;

  if (!loginUser.id) return badRequest(messages.requireUserid);
  if (!loginUser.password) return badRequest(messages.requirePassword);

  let item = {
    pk: 'user',
    sk: loginUser.id
  };

  let result = await userModel.get(
    item,
    { consistent: true }
  );

  if (!result.Item) {
    console.log(`messages.requireUser=${JSON.stringify(messages.requireUser)}`);
    console.log(`messages type = ${typeof(messages)}`);
    return badRequest(messages.requireUser);
  }
  if (!bcrypt.compareSync(loginUser.password, result.Item.password)) return badRequest(messages.wrongPassword);

  const token = auth.signToken(loginUser.id);

  let userInfo = {
    id: result.Item.userid,
    name: result.Item.name,
    accessToken: token
  };
  return ok(userInfo);
}

module.exports = loginController