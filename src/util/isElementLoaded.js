import undefinedOrNull from './undefinedOrNull';

/**
 * Wait for a DOM element to load.
 *
 * @param {string} selector
 * @param {number} time
 *
 * @example
 *  isElementLoaded('svg.logo').then((elm) => elm);
 *
 *  isElementLoaded('.containerHidden', 2000).then((elm) => elm);
 *
 * @returns {Promise<HTMLImageElement>}
 */
export default function isElementLoaded(selector, time = 500) {
  if (undefinedOrNull(selector)) {
    return null;
  }

  // eslint-disable-next-line compat/compat
  return new Promise((resolve, reject) => {
    if (typeof selector === 'undefined' || selector === null) {
      return reject(null);
    }

    let _interval = setInterval(() => {
      if (document.querySelector(selector) != null) {
        clearInterval(_interval);
        return resolve(document.querySelector(selector));
      }
    }, time);
  });
}
