import ScrollSmoother from "./ScrollSmoother.js";

function handlePresentationVideo() {
  const presentationVideo = document.querySelector('.presentation_video')

  presentationVideo.controls = false

  presentationVideo.addEventListener('ended', function() {
    presentationVideo.currentTime = 0
    presentationVideo.play()
  })
}

function handleFillableText() {

  let fillableText =
    document.querySelectorAll('[fillable-text]');

  fillableText.forEach((el) => {
    console.log("========")
    new SplitType(el, {
      types: 'lines',
    })

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

  })
}


window.addEventListener('DOMContentLoaded', (event) => {
  window.scrollTo(0,0)
  
  // split text into words
  new SplitType('[text-split]', {
    types:
      'words, chars',
    tagName: 'span',
  })

  new SplitType('[line-split]', {
    types:
      'lines',
    tagName: 'span',
  })
  
  gsap.registerPlugin(GSDevTools, ScrollTrigger, ScrollSmoother);
  //
  // ScrollSmoother.create({
  //   wrapper: '#smooth-wrapper',
  //   content: '#smooth-content',
  //   smooth: 2, // how long (in seconds) it takes to "catch up" to the native scroll position
  //   smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
  // });


  const heroTitle = document.querySelector('.hero_title')
  let heroTitleWords = heroTitle.querySelectorAll('.word')
  let heroTitleTimeline = gsap.timeline({ paused: true })
  heroTitleTimeline.from(heroTitleWords, {
    duration: 1, ease: 'power1.out', translateY: 51,
    rotationX: -70, transformOrigin: '0% 70% -2.604vw', opacity: 0, stagger: 0.05,
    delay: .5,
  })
  
  const plateCanvas = document.querySelector('#plate')
  let advantageCards = Array.from(document.querySelectorAll('.advantages-card'));
  let lastAdvantageCard = advantageCards[advantageCards.length - 1];
  heroTitleTimeline.from(plateCanvas, {
    duration: 2,
    ease: 'power1.out',
    scale: 0,
  }, 0)
  
  gsap.from(plateCanvas, {scale: 1})
  gsap.to(plateCanvas, {
    scrollTrigger: {
      trigger: lastAdvantageCard,
      start: `top 20%`,
      end: `bottom 50%`,
      scrub: 1
    },
    duration: 1,
    scale: 0,
  })

  const headerLogo = document.querySelector('.header_logo')
  let headerLogoTl = gsap.timeline({ paused: true })
  headerLogoTl.from(headerLogo, {
    duration: 2, opacity: 0,
  })

  const headerNav = document.querySelectorAll('.header_nav-link')
  let headerNavTl = gsap.timeline({ paused: true })
  headerNavTl.from(headerNav, {
    duration: .6, stagger: .1, translateY: '1.146vw', ease: 'power3.out', delay: .3,
  })

  const heroBottomTitle = document.querySelector('.hero-bottom_title')
  let heroBottomTitleChars = heroBottomTitle.querySelectorAll('.char')
  let heroBottomTitleTl = gsap.timeline({ paused: true })

  const heroBottomButton = document.querySelector('.hero-bottom .button-arrow')
  heroBottomTitleTl.set(heroBottomButton,
    {
      height: 0,
    }, 0,
  )

  gsap.set(heroBottomTitleChars, { translateY: '1.042vw', translateX: '0.156vw', opacity: 0 })

  heroBottomTitleTl.to(heroBottomTitleChars, {
    translateY: '0px', translateX: '0px',
    ease: 'circ.inOut',
    stagger: .04,
    duration: .1,
    delay: .5,
  }, 0, 'heroBottomTitle')

  heroBottomTitleTl.to(heroBottomTitleChars, {
    opacity: '1', ease: 'circ.inOut',
    stagger: .04,
    duration: .55,
    delay: .4,
  }, 0)

  const heroBottomSubtitleLines = document.querySelectorAll('.hero-bottom_subtitle span')

  heroBottomTitleTl.from(heroBottomSubtitleLines,
    {
      opacity: 0, translateY: '0.521vw',
      stagger: .5,
      duration: .55,
      delay: .4,
    },
    '-=1',
  )

  heroBottomTitleTl.to(heroBottomButton,
    {
      height: '3.177vw',
      duration: 1.5,
      delay: .2,
      ease: 'circ.inOut',
    },
    'heroBottomTitle-=1.3',
  )

  const advCards = document.querySelectorAll('.advantages-card')

  const whoWeIntro = document.querySelectorAll('.who-we_intro')
  gsap.to(whoWeIntro, {
    scrollTrigger: {
      trigger: whoWeIntro,
      start: "top top",
      end: "50% top",
      scrub: 1
    },
    width: "62.865vw",
    marginRight: "2.604vw"
  })
  
  
  window.addEventListener('onLoaderLoaded', (event) => {
    setTimeout(()=>{
      headerLogoTl.play()
      heroTitleTimeline.play()
      headerNavTl.play()
      heroBottomTitleTl.play()
    }, 500)
  });

  // GSDevTools.create();
  // headerLogoTl.play()
  // heroTitleTimeline.play()
  // headerNavTl.play()
  // heroBottomTitleTl.play()


  handleFillableText()
  handlePresentationVideo()

})


const html = document.documentElement;
const canvas = document.getElementById("plate");
const context = canvas.getContext("2d");
const frameCount = 167;
const currentFrame = index => (
    `./img/plateSequence/0${index.toString()}.jpg`
)

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image()
img.src = currentFrame(1);
canvas.width=820;
canvas.height=626;
img.onload=function(){
  context.drawImage(img, 0, 0);
}

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
}

function updateImageByValue(value) {
  const frameIndex = Math.min(
      frameCount - 1,
      Math.ceil((value+ 1) / 2 * frameCount)
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
      return { scroll1, value1, scroll2, value2 };
    }
  }
  return null;
}

function stopOscillationAndGetSegments(segmetsData) {
  let screenCenter = window.innerHeight / 2
  let advantageCards = Array.from(document.querySelectorAll('.advantages-card'));
  
  segmetsData = advantageCards.map((card, index) =>{
    let cardPosFromTop = getYCenterDistance(card) - screenCenter
    let rotationValue = (index + 1) % 2 ? -1 : 1
    return [cardPosFromTop, rotationValue]
  })
  
  if (oscillating) {
    oscillating = false
    clearInterval(oscillationInterval);
    segmetsData.unshift([0, currentValue])

  } else{
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

function handleSegmentRotation(scrollFromTopPX,segmetsData) {
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
  const scrollY = window.scrollY;
  const scrollFromTopPX = scrollY;
  let segmetsData;

  if (scrollFromTopPX === 0) {
    startOscillation();
  } else {
    segmetsData = stopOscillationAndGetSegments();
    console.log(segmetsData)

    handleSegmentRotation(scrollFromTopPX,segmetsData);
  }
}



let oscillating = false;
let oscillationInterval = null;
let currentValue = 0;
let direction = 1;
let value = 0.5;


window.addEventListener("scroll", () => {
  handlePlateRotation();
});

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

preloadImages()