const { DynamoDB } = require('aws-sdk');
const { getEndpoint, getRegion } = require('../utils/consts');

const docClient = new DynamoDB.DocumentClient({
  service: new DynamoDB({
    region: getRegion(),
    endpoint: getEndpoint()
  })  
});

module.exports = docClient