const Util = require('./Util');

module.exports = {
  async login(event) {
    const body = JSON.parse(event.body);
    if (!body.user) {
      return Util.envelop('User must be specified.', 422);
    }
    const user = body.user;
    if (!user.user_id) {
      return Util.envelop('User id must be specified', 422);
    }
  }
}