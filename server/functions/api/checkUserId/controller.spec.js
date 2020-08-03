'use strict'
const checkUserIdController = require('./controller');
const { apiGatewaySample } = require('../../../utils/apiGatewaySample');
const chai = require('chai');
const { expect } = require('chai');
chai.should();

// eslint-disable-next-line no-undef
describe("REST/checkUserId", () => {
  // eslint-disable-next-line no-undef
  it("checkUserId_success", async () => {
    let result = await checkUserIdController(
      {
        ...apiGatewaySample,
        queryStringParameters: { user_id:"skykbc" }
      }
    );
    result.should.have.property('body', '{"use_id":false}');
  });
  it("checkUserId_failed_noUserId", async () => {
    let result = await checkUserIdController(
      {
        ...apiGatewaySample,
        queryStringParameters: { user_id:"skykbc2" }
      }
    );
    result.should.have.property('body', '{"use_id":true}');
  });
});