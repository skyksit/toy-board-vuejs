'use strict'
const loginController = require('./controller');
const { apiGatewaySample } = require('../../../utils/apiGatewaySample');
const chai = require('chai');
chai.should();

// eslint-disable-next-line no-undef
describe("REST/loginUser", () => {
  // eslint-disable-next-line no-undef
  describe("Input Check", () => {
    it("loginUser_fail_missingID", async () => {
      let result = await loginController(
        {
          ...apiGatewaySample,
          body: `{ "user" : { "password":"password"} }`
        }
      );
      result.should.property('body','{"message":"Userid is required"}');
    });
    // eslint-disable-next-line no-undef
    it("loginUser_fail_missingPassword", async () => {
      let result = await loginController(
        {
          ...apiGatewaySample,
          body: `{ "user" : { "id":"skyksit"} }`
        }
      );
      result.should.property('body','{"message":"Password is required"}');
    });
  });

  describe("Login Check", () => {
    // eslint-disable-next-line no-undef
    it("loginUser_success", async () => {
      let result = await loginController(
        {
          ...apiGatewaySample,
          body: `{ "user" : { "id":"skyksit", "password": "password" } }`
        }
      );
      result.should.property('statusCode',200);
    });
    // eslint-disable-next-line no-undef
    it("loginUser_fail_wrongPassword", async () => {
      let result = await loginController(
        {
          ...apiGatewaySample,
          body: `{ "user" : { "id":"skyksit", "password": "password234" } }`
        }
      );
      result.should.property('body','{"message":"Wrong Password"}');
    });
    // eslint-disable-next-line no-undef
    it("loginUser_fail_userNotFound", async () => {
      let result = await loginController(
        {
          ...apiGatewaySample,
          body: `{ "user" : { "id":"no.user.id", "password": "no.user.password" } }`
        }
      );
      result.should.property('body','{"message":"User not Found"}');
    });
  });
});