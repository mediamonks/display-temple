/**
 * Return id
 *
 * @example
 *  uuid();
 *
 * @return {string}
 */
let _uuid = new Date().getTime();
export default function uuid() {
  return (_uuid++).toString(16);
}
