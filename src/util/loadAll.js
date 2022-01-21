import load from './load';

/**
 * Loads multiple files and output an array with the objects
 * @param {Array<string>} urls
 * @param {boolean} sequential
 * @param {function} loader
 *
 * @example
 *  loadAll(['./my_example_image.png', './my_example_image2.png', './my_example_image3.png'], true);
 *
 *  loadAll(['./custom_image.png']);
 *
 * @return {Promise<Array>}
 */
export default function loadAll(urls, sequential = false, loader = load) {
  if (sequential) {
    return urls.reduce((prom, url) => prom.then(() => loader(url)), Promise.resolve(true));
  }

  return Promise.all(urls.map(url => loader(url)));
}
