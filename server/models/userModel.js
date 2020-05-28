'use strict'
const docClient = require('../services/dynamoDB');
const { Table, Entity } = require('dynamodb-toolbox');
const consts = require('../utils/consts');
const userTableName = consts.getTableName('BOARD_TABLE');
const moment = require('moment-timezone');

const userTable = new Table({
  name: userTableName,
  partitionKey: 'pk',
  sortKey: 'sk',
  DocumentClient: docClient
});

const userModel = new Entity({
  name: 'userModel',
  timestamps: false,
  attributes: {
    pk: { partitionKey: true },
    sk: { sortKey: true },
    content: { alias: 'name' },
    password: { type: 'string' },
    userid: { type: 'string' },
    createdAt: { default: () => moment().tz('Asia/Seoul').format() },
    updatedAt: { default: () => moment().tz('Asia/Seoul').format() },
  },

  table: userTable
});

module.exports = userModel