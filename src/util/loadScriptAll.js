import loadScript from './loadScript';
import loadAll from './loadAll';

/**
 * Loads multiple files and output an array with the objects
 * @param {Array<string>} urls
 * @param {boolean} sequential
 *
 * @example
 *  loadScriptAll(['./mycustomScript.js', './mycustomScript2.js', './mycustomScript3.js'], true);
 *
 *  loadScriptAll(['./mycustomScript.png']);
 *
 * @return {Promise<Array>}
 */
export default function loadScriptAll(urls, sequential = false) {
  return loadAll(urls, sequential, loadScript);
}
