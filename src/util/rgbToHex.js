/**
 * Convert the RGB to hex code
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 *
 * @example
 *  rgbToHex(0, 51, 255)
 *
 * @returns {string>}
 */
export default function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
