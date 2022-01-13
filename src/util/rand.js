/**
 * Get random number
 * @param {number} min
 * @param {number} max
 *
 * @example
 *  rand(10, 420);
 *
 * @return {number}
 */
export default function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
