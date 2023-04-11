/**
 * Simple and free custom devtools timeline scrubber to control your main gsap timeline
 *
 * @param {Object} animation GSAP Timeline.
 */

import loadScript from './loadScript';
export default function timelineScrubber(animation) {
  let dragging = false;
  let paused = false;
  let hidden = false;
  let complete = false;
  const timelineSliderContainer = document.createElement('div');
  const timelineSlider = document.createElement('div');
  const sliderContainer = document.createElement('div');
  const slider = document.createElement('div');
  const knob = document.createElement('div');
  // const timeContainer = document.createElement('div');
  const playPauseContainer = document.createElement('div');
  let autoHideTween = gsap.timeline();
  let positionX = 0;
  let playPauseButton = document.querySelector('.play-pause');
  let playPauseMorph = gsap.timeline();

  //load draggable, only when using this scrubber
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/Draggable.min.js').then(
    init,
  );

  function init() {
    addStyling();
    createDraggableScrubber();
  }

  function addStyling() {
    //creating the style dynamically with js
    timelineSliderContainer.style.className = 'timelineSliderContainer';
    timelineSliderContainer.style.position = 'absolute';
    timelineSliderContainer.style.bottom = '0px';
    timelineSliderContainer.style.left = '0px';
    timelineSliderContainer.style.width = '100%';
    timelineSliderContainer.style.height = '21px';
    timelineSliderContainer.style.overflow = 'hidden';

    timelineSlider.style.className = 'timelineSlider';
    timelineSlider.style.position = 'absolute';
    timelineSlider.style.bottom = '0px';
    timelineSlider.style.left = '0px';
    timelineSlider.style.width = '100%';
    timelineSlider.style.height = '100%';
    timelineSlider.style.backgroundColor = 'black';
    timelineSlider.style.opacity = '1';
    timelineSlider.style.overflow = 'hidden';

    sliderContainer.style.position = 'absolute';
    sliderContainer.style.top = '0px';
    sliderContainer.style.left = '21px';
    sliderContainer.style.width = 'calc(100% - 28px)';
    sliderContainer.style.height = '100%';
    sliderContainer.className = 'sliderContainer';
    sliderContainer.style.overflow = 'hidden';

    slider.style.position = 'absolute';
    slider.style.bottom = '10px';
    slider.style.left = 0;
    slider.style.width = '100%';
    slider.style.height = '1px';
    slider.style.backgroundColor = 'white';
    slider.className = 'slider';

    //future addition
    /*    timeContainer.style.position = 'absolute';
    timeContainer.style.bottom = '4px';
    timeContainer.style.color = 'white';
    timeContainer.style.fontSize = '10px';
    timeContainer.style.textAlign = 'right';
    timeContainer.style.right = '5px';
    timeContainer.style.width = '60px';
    timeContainer.style.height = '12px';
    timeContainer.style.whiteSpace = 'nowrap';
    timeContainer.className = 'timeContainer';
    timeContainer.innerHTML = '0:00/0:00';
    timeContainer.style.display = 'none';*/

    knob.style.position = 'absolute';
    knob.style.bottom = '4px';
    knob.style.left = 0;
    knob.style.width = '16px';
    knob.style.height = '12px';
    knob.style.backgroundColor = 'white';
    knob.style.borderRadius = '6px';
    knob.className = 'knob';

    playPauseContainer.innerHTML =
      '<svg class=play-pause viewBox="0 0 20.97 25.67" xmlns=http://www.w3.org/2000/svg><g class=play><path d="M8,4.88 C8,10.18 8,15.48 8,20.79 5.33,22.41 2.66,24.04 0,25.67 0,17.11 0,8.55 0,0 2.66,1.62 5.33,3.25 8,4.88" class="gs-btn-white play-1" style=fill:#fff;stroke:#fff;stroke-width:.6px /><path d="M14.485,8.855 C16.64,10.18 18.8,11.5 20.97,12.83 16.64,15.48 12.32,18.13 8,20.79 8,15.48 8,10.18 8,4.88 10.16,6.2 12.32,7.53 14.48,8.85" class="gs-btn-white play-2" style=fill:#fff;stroke:#fff;stroke-width:.6px /></g></svg>';
    playPauseContainer.style.position = 'absolute';
    playPauseContainer.style.top = '2px';
    playPauseContainer.style.left = '5px';
    playPauseContainer.style.width = '10px';
    playPauseContainer.style.height = 'auto';
    playPauseContainer.style.cursor = 'pointer';

    sliderContainer.appendChild(slider);
    sliderContainer.appendChild(knob);
    timelineSlider.appendChild(sliderContainer);
    // timelineSlider.appendChild(timeContainer);
    timelineSliderContainer.appendChild(timelineSlider);
    timelineSliderContainer.appendChild(playPauseContainer);
  }

  function createDraggableScrubber() {
    gsap.registerPlugin(Draggable);
    document.body.appendChild(timelineSliderContainer);

    playPauseButton = document.querySelector('.play-pause');
    playPauseMorph = buildPlayPauseMorph(playPauseButton);

    Draggable.create(knob, {
      type: 'x',
      edgeResistance: 1,
      bounds: slider,
      onDrag: onDragHandler,
      onDragParams: [animation],
      onDragEnd: onDragEndHandler,
    });

    autoHideTween = gsap.to(timelineSlider, {
      duration: 0.3,
      autoAlpha: 0,
      display: 'none',
      y: 20,
      ease: 'power2.in',
      paused: true,
    });

    playPauseButton.addEventListener('click', togglePlayPause);
    animation.eventCallback('onUpdate', onUpdateHandler);
    animation.eventCallback('onComplete', onCompleteHandler);

    window.addEventListener('keydown', e => {
      let key = e.keyCode;

      if (event.defaultPrevented) {
        return; // Should do nothing if the default action has been cancelled
      }

      if (key === 32) {
        // pressing H
        togglePlayPause();
      } else if (key === 72) {
        //pressing spacebar
        toggleHide();
      }
    });
  }

  function buildPlayPauseMorph(svg) {
    var tl = gsap.timeline({
      onComplete: function onComplete() {
        return tl.kill();
      },
    });
    tl.to(svg.querySelector('.play-1'), {
      duration: 0.4,
      attr: {
        d:
          'M5.75,3.13 C5.75,9.79 5.75,16.46 5.75,23.13 4.08,23.13 2.41,23.13 0.75,23.13 0.75,16.46 0.75,9.79 0.75,3.12 2.41,3.12 4.08,3.12 5.75,3.12',
      },
      ease: 'power2.inOut',
      rotation: 360,
      transformOrigin: '50% 50%',
    }).to(
      svg.querySelector('.play-2'),
      {
        duration: 0.4,
        attr: {
          d:
            'M16.38,3.13 C16.38,9.79 16.38,16.46 16.38,23.13 14.71,23.13 13.04,23.13 11.38,23.13 11.38,16.46 11.38,9.79 11.38,3.12 13.04,3.12 14.71,3.12 16.38,3.12',
        },
        ease: 'power2.inOut',
        rotation: 360,
        transformOrigin: '50% 50%',
      },
      0.05,
    );
    return tl;
  }

  function togglePlayPause() {
    if (paused) {
      play();
    } else {
      pause();
    }
  }

  function play() {
    if (complete) {
      complete = false;
      animation.seek(0);
    }
    playPauseMorph.play();
    animation.resume();
    paused = false;
  }

  function pause() {
    playPauseMorph.reverse();
    animation.pause();
    paused = true;
  }

  function toggleHide() {
    if (hidden) {
      show();
    } else {
      hide();
    }
  }

  function show() {
    if (hidden) {
      autoHideTween.reverse();
      hidden = false;
    }
  }

  function hide() {
    if (!hidden) {
      autoHideTween.play();
      hidden = true;
    }
  }

  function onDragHandler(animation) {
    dragging = true;
    animation.pause();
    let positionTimeline = (this.x / this.maxX) * animation.duration();
    animation.seek(positionTimeline);
  }

  function onDragEndHandler() {
    dragging = false;
    if (!paused) {
      animation.play();
    }
  }

  function onUpdateHandler() {
    const sliderWidth = getProps(slider, 'width');
    const knobWidth = getProps(knob, 'width');

    positionX = (this.time() / this.duration()) * (sliderWidth - knobWidth);

    if (!dragging) {
      gsap.set(knob, { x: positionX });
    }
    let timeCopy = Math.round(this.time() * 100) / 100;
    let duration = Math.round(this.duration());

    //time future addition
    // gsap.set(timeContainer, {innerHTML: timeCopy + ' / ' + duration});
  }

  function onCompleteHandler() {
    togglePlayPause();
    complete = true;
  }

  function getProps(element, prop) {
    return Number(
      window
        .getComputedStyle(element, null)
        .getPropertyValue(prop)
        .replace('px', ''),
    );
  }
}
