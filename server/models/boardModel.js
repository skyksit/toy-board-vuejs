'use strict'
const docClient = require('../services/dynamoDB');
const { Table, Entity } = require('dynamodb-toolbox');
const { getTableName } = require('../utils/consts');
const userTableName = getTableName('BOARD_TABLE');

const oneTable = new Table({
  name: userTableName,
  partitionKey: 'pk',
  sortKey: 'sk',
  DocumentClient: docClient
});

const boardModel = new Entity({
  name: 'boardModel',
  timestamps: false,
  attributes: {
    pk: { partitionKey: true },
    sk: { sortKey: true },
    boardname: { map: 'content' }
    // content: { alias: 'boardname' }
  },

  table: oneTable
});

exports.boardModel = boardModel;
exports.oneTable = oneTable;