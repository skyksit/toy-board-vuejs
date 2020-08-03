'use strict'
const getUserController = require('./controller');
const { apiGatewaySample } = require('../../../utils/apiGatewaySample');
const chai = require('chai');
const { expect } = require('chai');
chai.should();

// eslint-disable-next-line no-undef
describe("REST/getUser", () => {
  // eslint-disable-next-line no-undef
  it("getUser_success", async () => {
    let result = await getUserController(
      {
        ...apiGatewaySample,
        queryStringParameters: { id:"skykbc" }
      }
    );
    result.should.not.have.property('body', undefined);
  });
  it("getUser_failed_noUser", async () => {
    let result = await getUserController(
      {
        ...apiGatewaySample,
        queryStringParameters: { id:"skykbc2" }
      }
    );
    result.should.have.property('body', undefined);
  });
});