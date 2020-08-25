import request from '../utils/request';

export function update(user) {
  let data = {
    user: {
      id: user.id,
      password: user.password
    }
  };
  return request({
    url: `/api/user/${user.id}`,
    method: 'patch',
    data
  });
}

export function login(user) {
  let data = {
    user: {
      id: user.id,
      password: user.password
    }
  };
  
  return request({
    url: '/api/users/login',
    method: 'post',
    data
  });
}

export function register(user) {
  let data = {
    user: {
      id: user.id,
      name: user.name,
      password: user.password
    }
  };
  return request({
    url: '/api/users',
    method: 'post',
    data
  });
}

export function caniUseId(userid) {
  return request({
    url: '/api/id',
    method: 'get',
    params: {
      user_id: userid
    }
  });
}