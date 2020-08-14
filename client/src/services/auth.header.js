export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));
  let accessToken = JSON.parse(localStorage.getItem('accessToken'));

  if (user && accessToken) {
    return { Authorization: 'Bearer ' + accessToken };
  }
  return {};
}