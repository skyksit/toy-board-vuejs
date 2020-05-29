'use strict'
const loginController = require('./controller');
const { apiGatewaySample } = require('../../../../utils/apiGatewaySample');
const chai = require('chai');
chai.should();

// eslint-disable-next-line no-undef
describe("REST/login", () => {
  // eslint-disable-next-line no-undef
  it("Missing User ID", async () => {
    let result = await loginController(
      {
        ...apiGatewaySample,
        queryStringParameters: { password:"passw0rd" }
      }
    );
    result.should.property('body','{"message":"Userid is required"}');
  });
  // eslint-disable-next-line no-undef
  it("Missing User Password", async () => {
    let result = await loginController(
      {
        ...apiGatewaySample,
        queryStringParameters: { id:"skykbc" }
      }
    );
    result.should.property('body','{"message":"Password is required"}');
  });
  // eslint-disable-next-line no-undef
  it("Login User Success", async () => {
    let result = await loginController(
      {
        ...apiGatewaySample,
        queryStringParameters: { id:"skykbc", password:"passw0rd" }
      }
    );
    result.should.property('statusCode',200);
  });
  // eslint-disable-next-line no-undef
  it("Login User Failed", async () => {
    let result = await loginController(
      {
        ...apiGatewaySample,
        queryStringParameters: { id:"skykbc", password:"passw0rd1" }
      }
    );
    result.should.property('body','{"message":"Wrong Password"}');
  });
  // eslint-disable-next-line no-undef
  it("User Not Found", async () => {
    let result = await loginController(
      {
        ...apiGatewaySample,
        queryStringParameters: { id:"no.have.id", password:"nopassword" }
      }
    );
    result.should.property('body','{"message":"User not Found"}');
  });
});