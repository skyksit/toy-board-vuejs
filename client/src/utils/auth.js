import Vue from 'vue';
import VueCookies from 'vue-cookies';

Vue.use(VueCookies);

export function getAccessToken() {
  return Vue.$cookies.get('AccessToken');
}

export function setAccessToken(token) {
  return Vue.$cookies.set('AccessToken', token);
}

export function removeAccessToken() {
  return Vue.$cookies.remove('AccessToken');
}

export function getUser() {
  return Vue.$cookies.get('user');
}

export function setUser(user) {
  return Vue.$cookies.set('user', user);
}

export function removeUser() {
  return Vue.$cookies.remove('user');
}