/**
 * Strip any HTML elements in the string with the help of DOMParser
 *
 * @param {string} html
 *
 * @example
 *  stripHtml('<h1>Hey, <strong>nice banners</strong>!</h1>')
 *
 * @returns {string>}
 */
export default function stripHtml(html) {
  return new DOMParser().parseFromString(html, 'text/html').body.textContent || '';
}
