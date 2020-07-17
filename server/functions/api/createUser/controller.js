'use strict'
const userModel = require('../../../models/userModel');
const { sign } = require('../../../utils/util');
const { configs } = require('../../../utils/consts');
const { ok, create, badRequest } = require('../../../utils/response');
const bcrypt = require('bcryptjs');

const createController = async(event) => {
  const body = JSON.parse(event.body);
  if (!body.user) return badRequest('User is required');
  const newUser = body.user;
  if (!newUser.id) return badRequest('Userid is required');
  if (!newUser.password) return badRequest('Password is required');

  const encryptedPassword = bcrypt.hashSync(newUser.password, 8);
  let item = {
    pk: 'user',
    sk: newUser.id,
    content: newUser.name,
    password: encryptedPassword,
    userid: newUser.id
  };
  let options = {
    conditions: { attr: 'sk', exists: false }
  };
  
  let result = await userModel.put(item, options);
  console.log(`result.statusCode=${result.statusCode}`);
  if(result.statusCode == null) {
    const token = sign(newUser);
    let body = { message: "User registered successfully!", accessToken: token };
    return create(body);
  } else {
    return badRequest('Password is required');
  }
}

module.exports = createController