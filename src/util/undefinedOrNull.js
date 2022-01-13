/**
 * Checks whether a given variable is undefined or null
 * @param obj
 * @returns {boolean}
 */
export default function undefinedOrNull(obj) {
  return typeof obj === 'undefined' || obj === null;
}
