import { gsap, TweenLite, Back, Power4 } from 'gsap';
import imagesLoaded from 'imagesloaded';

export default function() {
  let loadingProgress = 0;
  let loadedCount = 0;
  let progressTl;
  const $images = document.querySelectorAll('img');
  const $text = document.querySelector('.txt-perc');
  const $bar = document.querySelector('#progress span');
  const imgLoad = imagesLoaded($images);

  /* timeline
  -------------------------------------------- */
  function progressUpdate() {
    loadingProgress = Math.round(progressTl.progress() * 100);
    $text.innerHTML = `${loadingProgress} %`;
  }

  function loadComplete() {
    const preloaderOutTl = gsap.timeline({
      onComplete: () => {
        console.log('preloaderOutTl complete');
      },
    });

    preloaderOutTl
      .to('#progress', 0.3, { y: 100, autoAlpha: 0, ease: Back.easeIn })
      .to($text, 0.3, { y: 100, autoAlpha: 0, ease: Back.easeIn }, 0.1)
      .to('#preloader', 0.7, { yPercent: 100, ease: Power4.easeInOut })
      .to('#preloader', 0.1, { opacity: 0, className: '+=is-hidden' });
  }

  progressTl = gsap.timeline({
    paused: true,
    onUpdate: progressUpdate,
    onComplete: loadComplete,
  });

  progressTl.to($bar, { width: 100 });

  /* imagesLoaded
  -------------------------------------------- */
  function loadProgress(imgLoad, image) {
    loadedCount += 1;
    loadingProgress = loadedCount / $images.length;
    TweenLite.to(progressTl, 1, { progress: loadingProgress });
  }

  imgLoad.on('done', (instance) => {
    console.log('DONE  - all images have been successfully loaded');
  });

  imgLoad.on('progress', (instance, image) => {
    if (image.isLoaded) {
      loadProgress();
    }
  });
}
