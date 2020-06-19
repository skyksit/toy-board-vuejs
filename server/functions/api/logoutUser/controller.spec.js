'use strict'
const logoutController = require('./controller');
const { apiGatewaySample } = require('../../../utils/apiGatewaySample');
const chai = require('chai');
chai.should();

describe("REST/logoutUser", () => {
  it("logoutUser_success", async () => {
    let result = await logoutController(
      {
        ...apiGatewaySample
      }
    );
    result.should.property('body','{}');
  });
});
