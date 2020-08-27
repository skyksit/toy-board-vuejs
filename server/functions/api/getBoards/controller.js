'use strict'
const { oneTable } = require('../../../models/boardModel');
const { ok } = require('../../../utils/response');

const getBoardsController = async(event) => {
  let result = await oneTable.query(
    'board',
    {
      limit: 10,
      beginsWith: 'board',
    }
  );
  return ok(result.Items);
}

module.exports = getBoardsController