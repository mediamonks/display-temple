/**
 * Load a JSON file.
 * @param {String} url
 *
 * @example
 *  loadJSON('https://jsonplaceholder.typicode.com/todos/1');
 *
 * @return {Promise<any>}
 */
export default function loadJSON(url) {
  return fetch(url).then(response => response.json());
}
