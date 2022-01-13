/**
 * Loads an image and returns the image element
 *
 * @example
 *  loadImage('./my_example_image.png');
 *
 * @param {string} src
 * @return {Promise<HTMLImageElement>}
 */
export default function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.onload = function() {
      resolve(this);
    };
    img.onerror = reject;
    img.dataset.src = src;
    img.src = src;
  });
}
