const createController = require('./controller');
const { apiGatewaySample } = require('../../../../utils/apiGatewaySample');
const assert = require('assert');

// eslint-disable-next-line no-undef
describe("REST/create", () => {
  // eslint-disable-next-line no-undef
  it("Created User", async () => {
    await createController(
      {
        ...apiGatewaySample,
        body: `{"id":"skykbc", "name":"홍길동", "password":"passw0rd"}`
      }
    );
    assert.equal(true, true);
  });
});