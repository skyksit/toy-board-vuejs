import request from '../utils/request';

export function getBoardList() {
  return request({
    url: '/api/boards',
    method: 'get'
  });
}