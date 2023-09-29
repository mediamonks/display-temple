// eslint-disable-next-line import/no-unresolved
const methodNameMatch = /(frame)(\d+)(In|Out|)$/;

const previewReady = new Promise(resolve => { window.addEventListener('previewReady', resolve) })

/**
 *
 */
export default class FrameAnimation {
  /**
   * @return Array<{in: gsap.core.Timeline | null, base: gsap.core.Timeline | null, out: gsap.core.Timeline | null}>
   * @private
   */
  __gatherAnimation() {
    const scope = this;
    let names = [];
    let obj = this;
    do {
      names = names.concat(Object.getOwnPropertyNames(obj));
    } while ((obj = Object.getPrototypeOf(obj)));

    const data = [];
    names.forEach(name => {
      const result = methodNameMatch.exec(name);
      if (result !== null) {
        let [frameNumber, type] = result.splice(2);
        frameNumber = parseInt(frameNumber, 10);
        type = `${type}`.toLowerCase();

        if (type === '') {
          type = 'base';
        }

        const method = scope[name];

        if (method) {
          if (!data[frameNumber]) {
            data[frameNumber] = {
              in: null,
              base: null,
              out: null,
            };
          }

          data[frameNumber][type] = method;
        }
      }
    });

    return data;
  }

  /**
   * @return gsap.core.Timeline
   * @private
   */
  __createTimeline(timeline = gsap.timeline()) {
    const animationMethods = this.__gatherAnimation();

    for (let i = 0; i < animationMethods.length; i++) {
      if (animationMethods[i]) {
        if (animationMethods[i].in) {
          const subTimeline = animationMethods[i].in.call(this, timeline);
          if (subTimeline) timeline.add(subTimeline);
        }
        if (animationMethods[i].base) {
          const subTimeline = animationMethods[i].base.call(this, timeline);
          if (subTimeline) timeline.add(subTimeline);
        }
        if (animationMethods[i].out) {
          const subTimeline = animationMethods[i].out.call(this, timeline);
          if (subTimeline) timeline.add(subTimeline);
        }
      }
    }
    //add an onStart event for the QA gsdevtools debugger in the preview page
    timeline.eventCallback("onStart", this.timelineOnStartHandler)

    return timeline;
  }

  /**
   * Returns the concatinated timeline timeline
   * @param timeline
   * @return {gsap.core.Timeline}
   */
  getTimeline(timeline = gsap.timeline()) {
    if (!this.__timeline) {
      this.__timeline = this.__createTimeline(timeline);
    }

    return this.__timeline;
  }

  timelineOnStartHandler() {
    // IE11 fix checking if custom events excists
    if ('CustomEvent' in window && 'function' == typeof window.CustomEvent) {
      window.dispatchEvent(new CustomEvent("getMainTimeline", {'detail': this}));
      previewReady.then(() => window.dispatchEvent(new CustomEvent("getMainTimeline", { 'detail': this })))
    }
  }

  /**
   *
   * @param {gsap.core.Timeline} timeline
   * @return {gsap.core.Timeline}
   */
  play(tl = gsap.timeline()) {
    const timeline = this.getTimeline(tl);
    timeline.play();
  }
}
