'use strict'
const authController = require('./controller');
const { apiGatewaySample } = require('../../../../utils/apiGatewaySample');
const chai = require('chai');
chai.should();

describe("REST/authUser", () => {
  it("authUser_success", () => {
    authController(
    {
      ...apiGatewaySample,
      "type":"TOKEN",
      "authorizationToken":"allow",
      "methodArn":"arn:aws:execute-api:us-west-2:123456789012:ymy8tbxw7b/*/GET/"
    }, null, (data) => {
      console.log(`data = ${data}`);
    });
  });
});