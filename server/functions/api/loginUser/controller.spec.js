'use strict'
const loginController = require('./controller');
const { apiGatewaySample } = require('../../../utils/apiGatewaySample');
const messages = require('../../../utils/messages.json');
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
      let outputMessage = Object();
      outputMessage.message = messages.requireUserid;
      result.should.property('body', JSON.stringify(outputMessage) );
    });
    // eslint-disable-next-line no-undef
    it("loginUser_fail_missingPassword", async () => {
      let result = await loginController(
        {
          ...apiGatewaySample,
          body: `{ "user" : { "id":"skyksit"} }`
        }
      );
      let outputMessage = Object();
      outputMessage.message = messages.requirePassword;
      result.should.property('body', JSON.stringify(outputMessage) );
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
      let outputMessage = Object();
      outputMessage.message = messages.wrongPassword;
      result.should.property('body', JSON.stringify(outputMessage) );
    });
    // eslint-disable-next-line no-undef
    it("loginUser_fail_userNotFound", async () => {
      let result = await loginController(
        {
          ...apiGatewaySample,
          body: `{ "user" : { "id":"no.user.id", "password": "no.user.password" } }`
        }
      );
      let outputMessage = Object();
      outputMessage.message = messages.notFoundUser;
      result.should.property('body', JSON.stringify(outputMessage) );
    });
  });
});