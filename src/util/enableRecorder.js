/**
 * Enable the ad to communicate with the display-ads-recorder, allowing the ad to be converted to other formats like mp4 and animated gif.
 *
 * @param {String} animation GSAP Timeline.
 * @param {String} config richmedia config.
 */

export default function enableAdsRecorder(animation, config) {
  const animationRecordEvent = new CustomEvent('animation-record');
  const animationCompleteEvent = new CustomEvent('animation-end');

  document.dispatchEvent(
    new CustomEvent('animation-info', {
      detail: {
        duration: animation.duration(),
        width: config.settings.size.width,
        height: config.settings.size.height,
      },
    }),
  );

  document.addEventListener(`animation-info-received`, function(e) {
    animation.pause(0); // start at 0
    document.dispatchEvent(animationRecordEvent); // send request to record this frame

    document.addEventListener(`animation-gotoframe-request`, function(e) {
      animation.pause(e.detail / 1000);

      if (e.detail / 1000 <= animation.duration()) {
        document.dispatchEvent(animationRecordEvent);
      } else {
        document.dispatchEvent(animationCompleteEvent);
      }
    });
  });
}
