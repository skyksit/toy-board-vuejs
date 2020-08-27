'use strict'
const getBoardsController = require('./controller');
const { apiGatewaySample } = require('../../../utils/apiGatewaySample');
const chai = require('chai');
const { expect } = require('chai');
chai.should();


describe("REST/getBoards", () => {
  // eslint-disable-next-line no-undef
  it("getBoards_success", async () => {
    let result = await getBoardsController(
      {
        ...apiGatewaySample
      }
    );
    result.should.not.have.property('body', undefined);
  });
});