'use strict'
const createController = require('./controller');
const { apiGatewaySample } = require('../../../../utils/apiGatewaySample');
const chai = require('chai');
chai.should();

// eslint-disable-next-line no-undef
describe("REST/create", () => {
  // eslint-disable-next-line no-undef
  it("Created User Success", async () => {
    let result = await createController(
      {
        ...apiGatewaySample,
        body: `{ "user" : { "id":"skykbc", "name":"홍길동", "password":"passw0rd"} }`
      }
    );
    result.should.property('statusCode',200);
  });
  it("Missing ID", async () => {
    let result = await createController(
      {
        ...apiGatewaySample,
        body: `{ "user" : { "name":"홍길동", "password":"passw0rd"} }`
      }
    );
    result.should.property('body','{"message":"Userid is required"}');
  });
});