'use strict'
const createController = require('./controller');
const { apiGatewaySample } = require('../../../utils/apiGatewaySample');
const chai = require('chai');
chai.should();

// eslint-disable-next-line no-undef
describe("REST/createUser", () => {
  // eslint-disable-next-line no-undef
  it("createUser_success", async () => {
    let result = await createController(
      {
        ...apiGatewaySample,
        body: `{ "user" : { "id":"skykbc", "name":"홍길동", "password":"passw0rd"} }`
      }
    );
    result.should.property('statusCode',201);
  });
  // eslint-disable-next-line no-undef
  it("createUser_fail_missingUser", async () => {
    let result = await createController(
      {
        ...apiGatewaySample,
        body: `{}`
      }
    );
    result.should.property('body','{"message":"User is required"}');
  });
  // eslint-disable-next-line no-undef
  it("createUser_fail_missingUserId", async () => {
    let result = await createController(
      {
        ...apiGatewaySample,
        body: `{ "user" : { "name":"홍길동", "password":"passw0rd"} }`
      }
    );
    result.should.property('body','{"message":"Userid is required"}');
  });


  it("createUser_fail_missingUserPassword", async () => {
    let result = await createController(
      {
        ...apiGatewaySample,
        body: `{ "user" : { "id":"skykbc", "name":"홍길동"} }`
      }
    );
    // result.should.property('statusCode',200);
    result.should.property('body','{"message":"Password is required"}');
    
  });
});