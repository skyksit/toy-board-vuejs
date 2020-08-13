'use strict'
const updateController = require('./controller');
const { apiGatewaySample } = require('../../../utils/apiGatewaySample');
const chai = require('chai');
chai.should();

describe("REST/updateUser", () => {

  describe("Input Check", () => {
    it("updateUser_fail_wrongPath", async () => {
      let result = await updateController(
        {
          ...apiGatewaySample,
          pathParameters: { id2:"skyksit" },
          queryStringParameters: { id:"skykbc", password:"passw0rd" }
        }
      );
      result.should.property('body','{"message":"Wrong Path"}');
    });
    it("updateUser_fail_noUser", async () => {
      let result = await updateController(
        {
          ...apiGatewaySample,
          pathParameters: { id:"skyksit" },
          body: `{}`
          // body: `{ "user" : { "id":"skyksit", "password":"password"} }`
        }
      );
      console.log(`result=${result}`);
      result.should.property('body','{"message":"User is required"}');
    });
    it("updateUser_fail_noId", async () => {
      let result = await updateController(
        {
          ...apiGatewaySample,
          pathParameters: { id:"skyksit" },
          body: `{ "user" : { "password":"password"} }`
        }
      );
      console.log(`result=${result}`);
      result.should.property('body','{"message":"Userid is required"}');
    });
    it("updateUser_fail_noPassword", async () => {
      let result = await updateController(
        {
          ...apiGatewaySample,
          pathParameters: { id:"skyksit" },
          body: `{ "user" : { "id":"skyksit"} }`
        }
      );
      console.log(`result=${result}`);
      result.should.property('body','{"message":"Password is required"}');
    });
    
  });
});