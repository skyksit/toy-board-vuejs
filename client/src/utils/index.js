/**
 * get localStorage data
 * @param {string} name 
 */
export const getStore = name => {
  if (!name) return;
  return localStorage.getItem(name);
}
/**
 * set localStorage data
 * @param {string} name 
 * @param {(Object|string|number)} content 
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content != 'string') {
    content = JSON.stringify(content);
  }
  localStorage.setItem(name, content);
}
/**
 * remove localStorage data
 * @param {string} name 
 */
export const removeStore = name => {
  if (!name) return;
  localStorage.removeItem(name);
}