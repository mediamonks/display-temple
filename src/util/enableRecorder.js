/**
 * Enable the ad to communicate with the display-ads-recorder, allowing the ad to be converted to other formats like mp4 and animated gif.
 *
 * @param {String} animation GSAP Timeline.
 * @param {String} config richmedia config.
 */

export default function enableAdsRecorder(animation, config) {
  const animationConfig = {
    duration: animation.duration(),
    width: config.settings.size.width,
    height: config.settings.size.height,
  };

  window.addEventListener('message', event => {
    const { data } = event;
    if (data.name === 'request-animation-config') {
      window.postMessage({
        name: 'animation-config',
        ...animationConfig,
      });
    }

    if (data.name === 'request-goto-frame') {
      animation.pause(data.frame / 1000);
      window.postMessage({
        name: 'current-frame',
        frame: data.frame,
      });
    }
  });
}
