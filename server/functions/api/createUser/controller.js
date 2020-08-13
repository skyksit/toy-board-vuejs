'use strict'
const userModel = require('../../../models/userModel');
const { create, badRequest } = require('../../../utils/response');
const bcrypt = require('bcryptjs');

const createController = async(event) => {
  const body = JSON.parse(event.body);

  console.log(`createController=${JSON.stringify(body)}`);

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
  
  if(result.statusCode == null) {
    let message = { message: "User registered successfully!" };
    return create(message);
  } else {
    return badRequest('Password is required');
  }
}

module.exports = createController