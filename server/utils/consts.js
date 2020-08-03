'use strict'

const configs = {
  TOKEN_EXP_HOURS: process.env.TOKEN_EXP_HOURS,
  AUTH_SECRET: process.env.AUTH_SECRET
}

/* istanbul ignore next */
const getEndpoint = () => {
  if (process.env.DYNAMODB_ENDPOINT) {
    return `http://${process.env.DYNAMODB_ENDPOINT}`;
  }
  return "http://localhost:4000";
};
/* istanbul ignore next */
const getRegion = () => {
  if (process.env.AWS_REGION) {
    return process.env.AWS_REGION;
  }
  if (process.env.AWS_DEFAULT_REGION) {
    return process.env.AWS_DEFAULT_REGION;
  }
  return "localhost";
};

const getTableName = (tableName) => {
  if (process.env[tableName]) {
    return process.env[tableName];
  }
  
  return 'toyProject-board-local';
}

module.exports = {
  getEndpoint,
  getRegion,
  getTableName,
  configs
}