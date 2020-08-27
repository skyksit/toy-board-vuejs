'use strict'
const { badRequest } = require('../../../utils/response');
const getBoardsController = require('./controller');

exports.handler = async function(event) {
  try {
    return await getBoardsController(event);
  } catch (error) {
    console.log(`getBoard.function.error=${JSON.stringify(error)}`);
    return badRequest('게시판 정보가 없습니다');
  }
}