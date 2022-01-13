/**
 * Wait until N time
 * @param {number} time
 *
 * @example
 *  until(5000);
 *
 * @return {Promise}
 */
export default function until(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
