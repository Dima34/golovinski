/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
function handlePresentationVideo() {
  const presentationVideo = document.querySelector('.presentation_video');
  presentationVideo.controls = false;
  presentationVideo.addEventListener('ended', function () {
    presentationVideo.currentTime = 0;
    presentationVideo.play();
  });
}
function handleFillableText() {
  gsap.registerPlugin(ScrollTrigger);
  let fillableText = document.querySelectorAll('[fillable-text]');
  fillableText.forEach(el => {
    console.log("========");
    new SplitType(el, {
      types: 'lines'
    });
    let lines = Array.from(el.querySelectorAll('.line'));
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: fillableText,
        start: "top center",
        end: "bottom center",
        scrub: 1
      }
    });
    tl.to(lines, {
      backgroundPositionX: 0,
      duration: 1,
      stagger: 0.7
    });
  });
}
window.addEventListener('DOMContentLoaded', event => {
  // split text into words
  new SplitType('[text-split]', {
    types: 'words, chars',
    tagName: 'span'
  });
  new SplitType('[line-split]', {
    types: 'lines',
    tagName: 'span'
  });
  gsap.registerPlugin(GSDevTools);
  gsap.registerPlugin(ScrollTrigger);
  const heroTitle = document.querySelector('.hero_title');
  let heroTitleWords = heroTitle.querySelectorAll('.word');
  let heroTitleTimeline = gsap.timeline({
    paused: true
  });
  heroTitleTimeline.from(heroTitleWords, {
    duration: 1,
    ease: 'power1.out',
    translateY: 51,
    rotationX: -70,
    transformOrigin: '0% 70% -50px',
    opacity: 0,
    stagger: 0.05,
    delay: .5
  });
  const headerLogo = document.querySelector('.header_logo');
  let headerLogoTl = gsap.timeline({
    paused: true
  });
  headerLogoTl.from(headerLogo, {
    duration: 2,
    opacity: 0
  });
  const headerNav = document.querySelectorAll('.header_nav-link');
  let headerNavTl = gsap.timeline({
    paused: true
  });
  headerNavTl.from(headerNav, {
    duration: .6,
    stagger: .1,
    translateY: '22px',
    ease: 'power3.out',
    delay: .3
  });
  const heroBottomTitle = document.querySelector('.hero-bottom_title');
  let heroBottomTitleChars = heroBottomTitle.querySelectorAll('.char');
  let heroBottomTitleTl = gsap.timeline({
    paused: true
  });
  const heroBottomButton = document.querySelector('.hero-bottom .button-arrow');
  heroBottomTitleTl.set(heroBottomButton, {
    height: 0
  }, 0);
  gsap.set(heroBottomTitleChars, {
    translateY: '20px',
    translateX: '3px',
    opacity: 0
  });
  heroBottomTitleTl.to(heroBottomTitleChars, {
    translateY: '0px',
    translateX: '0px',
    ease: 'circ.inOut',
    stagger: .04,
    duration: .1,
    delay: .5
  }, 0, 'heroBottomTitle');
  heroBottomTitleTl.to(heroBottomTitleChars, {
    opacity: '1',
    ease: 'circ.inOut',
    stagger: .04,
    duration: .55,
    delay: .4
  }, 0);
  const heroBottomSubtitleLines = document.querySelectorAll('.hero-bottom_subtitle span');
  heroBottomTitleTl.from(heroBottomSubtitleLines, {
    opacity: 0,
    translateY: '10px',
    stagger: .5,
    duration: .55,
    delay: .4
  }, '-=1');
  heroBottomTitleTl.to(heroBottomButton, {
    height: '61px',
    duration: 1.5,
    delay: .2,
    ease: 'circ.inOut'
  }, 'heroBottomTitle-=1.3');
  const advCards = document.querySelectorAll('.advantages-card');

  // window.addEventListener('onLoaderLoaded', (event) => {
  //   setTimeout(()=>{
  //     headerLogoTl.play()
  //     heroTitleTimeline.play()
  //     headerNavTl.play()
  //     heroBottomTitleTl.play()
  //   }, 500)
  // });

  // GSDevTools.create();
  headerLogoTl.play();
  heroTitleTimeline.play();
  headerNavTl.play();
  heroBottomTitleTl.play();
  handleFillableText();
  handlePresentationVideo();
});
/******/ })()
;
//# sourceMappingURL=main.js.map