/**
 * Load text from a source
 * @param {string} src
 *
 * @example
 *  loadText('./my_example_data.html');
 *
 * @return {Promise<string>}
 */
export default function loadText(src) {
  return fetch(src).then(response => response.text());
}
