import './lang-switcher.js';
import {gsap} from "gsap";
import SplitType from 'split-type'
import {ScrollTrigger} from "gsap/ScrollTrigger";
import ScrollSmoother from './ScrollSmoother.js'
import './header.js'
import sectionHomeHero from './sections/home-hero.js';
import {initCTABtns} from "@scripts/components/btn-get-in-touch.js";
import {sectionAdvantages} from "@scripts/sections/home-advantages.js";
import {handleFillableText} from "@scripts/components/handleFillableText.js";
import {sectionHomeLetsCreate} from "@scripts/sections/home-lets-create.js";
import {sectionHomeWhoWeAre} from "@scripts/sections/home-who-we-are.js";
import {sectionHomeGetCloser} from "@scripts/sections/home-get-closer.js";
import {sectionHomePartners} from "@scripts/sections/home-partners.js";
import {sectionFooter} from "@scripts/sections/footer.js";
import {sectionTechPreview} from "@scripts/sections/tech-preview.js";
import {sectionTechFeatures} from "@scripts/sections/tech-features.js";
import {sectionTechFooter} from "@scripts/sections/tech-footer.js";
import {blog} from "@scripts/sections/blog.js";
import {history} from "@scripts/sections/history-hero.js";
import {sectionContacts} from "@scripts/sections/contacts.js";
import {sectionArticle} from "@scripts/sections/article.js";
// import {GSDevTools} from "./GSDevTools.js";
let rotatePlate = null;
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const smoother = ScrollSmoother.create({
  wrapper: '#smooth-wrapper',
  content: '#smooth-content',
  smooth: 2, // how long (in seconds) it takes to "catch up" to the native scroll position
  smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
  onUpdate:()=>{
    if(rotatePlate){
      rotatePlate()
    }
  }
});

function handlePresentationVideo() {
  const presentationVideo = document.querySelector('.presentation_video')
  if (!presentationVideo) return
  presentationVideo.controls = false
  presentationVideo.playbackRate = 0.66

  presentationVideo.addEventListener('ended', function () {
    presentationVideo.currentTime = 0
    presentationVideo.play()
  })
}

function isMobile() {
  return window.innerWidth <= 900;
}


window.addEventListener('DOMContentLoaded', (event) => {
  window.scrollTo(0, 0)
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  const fonts = ['regular Manrope','regular Gallient', 'medium Manrope']
  const promises = fonts.map(font => document.fonts.load(`1em ${font}`))
  Promise.all(promises).finally(() => {
    init()
  })
});


function init(){
  // split text into words
  new SplitType('[text-split]', {
    types:
      'words, chars',
    tagName: 'span',
  })
  new SplitType('[word-split]', {
    types:
      'lines,words',
    tagName: 'span',
    lineClass: 'line',
    wordClass: 'word',
  })
  new SplitType('[line-split]', {
    types:
      'lines',
    tagName: 'span',
  })
  new SplitType('[line-split-nested] > p', {
    types:
      'lines',
    tagName: 'span',
  })
  const wrappedLines = new SplitType('[line-wrap-split], .line-wrap-split', {
    types:
      'lines',
    tagName: 'span',
    lineClass: 'line-wrap',
    // absolute: true,
  })
  //Wrap content of each line in a span
  wrappedLines.lines.forEach((line) => {
    const lineContent = line.innerHTML
    line.innerHTML = `<span class="line" style="display: inline-block;">${lineContent}</span>`
  });
  initCTABtns();
  sectionHomeHero();
  sectionAdvantages();
  sectionHomeLetsCreate();
  sectionHomeWhoWeAre();
  sectionHomeGetCloser();
  sectionHomePartners();
  sectionTechPreview();
  sectionTechFeatures();
  sectionTechFooter();
  blog();
  history();
  sectionArticle();
  sectionContacts();
  handleFillableText()
  handlePresentationVideo()
  handlePlate()
  sectionFooter();

}

function handlePlate(){
  const html = document.documentElement;
  const canvas = document.getElementById("plate");
  if(!canvas) return
  const context = canvas?.getContext("2d");
  const frameCount = 167;

  const currentFrame = index => (
    `/wp-content/themes/sage-theme/public/images/plateSequence/0${index.toString()}.jpg`
  )

  const preloadImages = () => {
    for (let i = 1; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
    }
  };

  const img = new Image()
  img.src = currentFrame(1);
  canvas.width = 820;
  canvas.height = 626;
  img.onload = function () {
    context.drawImage(img, 0, 0);
  }

  const updateImage = index => {
    img.src = currentFrame(index);
    context.drawImage(img, 0, 0);
  }

  function updateImageByValue(value) {
    const frameIndex = Math.min(
      frameCount - 1,
      Math.ceil((value + 1) / 2 * frameCount)
    );

    requestAnimationFrame(() => updateImage(frameIndex + 1))
  }


// Функція для інтерполяції між двома значеннями
  function interpolate(value1, value2, factor) {
    return value1 + (value2 - value1) * factor;
  }

// Функція для пошуку найближчого сегменту в масиві scrollData
  function findSegment(scrollFromTop, segmentsData) {
    for (let i = 0; i < segmentsData.length - 1; i++) {
      const [scroll1, value1] = segmentsData[i];
      const [scroll2, value2] = segmentsData[i + 1];
      if (scrollFromTop >= scroll1 && scrollFromTop <= scroll2) {
        return {scroll1, value1, scroll2, value2};
      }
    }
    return null;
  }

  function stopOscillationAndGetSegments(segmetsData) {
    let screenCenter = window.innerHeight / 2
    let advantageCards = Array.from(document.querySelectorAll('.advantages-card'));

    segmetsData = advantageCards.map((card, index) => {
      let cardPosFromTop = getYCenterDistance(card) - screenCenter
      let rotationValue = (index + 1) % 2 ? -1 : 1
      return [cardPosFromTop, rotationValue]
    })

    if (oscillating) {
      oscillating = false
      clearInterval(oscillationInterval);
      segmetsData.unshift([0, currentValue])

    } else {
      segmetsData.unshift([0, 0])
    }

    return segmetsData


    function getYCenterDistance(elem) {
      const rect = elem.getBoundingClientRect();
      const elemCenterY = rect.top + rect.height / 2;
      const scrollY = window.scrollY || window.pageYOffset;
      const elemCenterYToTop = elemCenterY + scrollY;

      return elemCenterYToTop;
    }
  }

  function startOscillation() {
    let step = 0.001
    if (oscillating) return; // Якщо вже осцилює, виходимо

    oscillating = true;
    oscillationInterval = setInterval(() => {
      let numToAdd = step * direction;
      let newCurrentValue = currentValue + numToAdd;
      currentValue = newCurrentValue;

      // currentValue = Number((currentValue + numToAdd).toFixed(10));
      if (currentValue >= 1 || currentValue <= -1) {
        direction *= -1; // Міняємо напрямок
      }
      updateImageByValue(currentValue);
    }, 5);
  }

  function handleSegmentRotation(scrollFromTopPX, segmetsData) {
    const segment = findSegment(scrollFromTopPX, segmetsData);
    if (segment) {
      const {scroll1, value1, scroll2, value2} = segment;
      const factor = (scrollFromTopPX - scroll1) / (scroll2 - scroll1); // Частка між скролами
      const interpolatedValue = interpolate(value1, value2, factor);
      currentValue = Number(interpolatedValue.toFixed(2));
      updateImageByValue(currentValue);
    } else if (scrollFromTopPX > segmetsData[segmetsData.length - 1][0]) {
      // Якщо прокрутка більше останнього значення в масиві
      updateImageByValue(segmetsData[segmetsData.length - 1][1]);
    }
  }

  function handlePlateRotation() {
    const scrollY = smoother?.scrollTop() ?? window.scrollY;
    const scrollFromTopPX = scrollY;
    let segmetsData;

    if (scrollFromTopPX === 0) {
      startOscillation();
    } else if (!isMobile()) {
      segmetsData = stopOscillationAndGetSegments();

      handleSegmentRotation(scrollFromTopPX, segmetsData);
    }
  }

  let oscillating = false;
  let oscillationInterval = null;
  let currentValue = 0;
  let direction = 1;
  let value = 0.5;


  // window.addEventListener("scroll", () => {
  //   handlePlateRotation();
  // });
  rotatePlate= handlePlateRotation;
  handlePlateRotation()

  window.addEventListener('scroll', () => {
    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(
      frameCount - 1,
      Math.ceil(scrollFraction * frameCount)
    );
  });

  preloadImages();
}
