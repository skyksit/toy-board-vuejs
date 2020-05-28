const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true
}

module.exports.ok = function (body, headers = null) {
  return {
    statusCode: 200,
    body: JSON.stringify(body),
    headers: headers || CORS
  }
}

module.exports.notFound = function (message) {
  return {
    statusCode: 404,
    body: JSON.stringify({ message: message }),
    headers: CORS
  }
}

module.exports.badRequest = function (message) {
  return {
    statusCode: 400,
    body: JSON.stringify({ message: message }),
    headers: CORS
  }
}

module.exports.unauthorized = function (message) {
  return {
    statusCode: 401,
    body: JSON.stringify({ message: message }),
    headers: CORS
  }
}

module.exports.forbidden = function (message) {
  return {
    statusCode: 403,
    body: JSON.stringify({ message: message }),
    headers: CORS
  }
}