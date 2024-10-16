import {isLoaded} from "@scripts/utils/is-loaded.js";
import {gsap} from "gsap";
import Swiper from "swiper";
import {Navigation} from "swiper/modules";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import SplitType from "split-type";
gsap.registerPlugin(ScrollTrigger);
export function history(){
  const section = document.querySelector('section.history');
  if (!section) return;
  const q= (el)=>section.querySelector(el);
  const qSA= (el)=>section.querySelectorAll(el);
  gsap.set(qSA('.history-title .line-wrap'), {
    clipPath: 'inset(-20% 0 4% 0)',
  })
  const tl =
    gsap.timeline({paused: true})
      .from(qSA('.history-title .line'), {
        yPercent: 100,
        duration: 1.5,
        stagger: 0.1,
        delay: .2,
      })
      .from(q('.history-image img'), {
        clipPath: 'inset(0 0 100% 0)',
        scale: 1.2,
        duration: 1.5,
      }, 0)
  if (ScrollTrigger.isInViewport('.history-description', 0.5)) {
    tl.from('.history-description .line', {
      opacity: 0,
      yPercent: 100,
      stagger: 0.1,
      duration: 1,
    })
  } else {
    gsap.from('.history-description .line', {
      opacity: 0,
      yPercent: 100,
      stagger: 0.1,
      duration: 1,
      scrollTrigger: {
        trigger: '.history-description',
        start: 'top 85%',
        end: 'bottom center',
        toggleActions: 'play none none reverse',
      },
    })
  }


  isLoaded(()=>tl.play());


  //Swiper

  const sliderNavigationButtons = document.querySelectorAll('.sliders-navigation__btn');
  const bottomSliderWrapper = document.querySelector('.roadmap-bottom');
  const topSlider = new Swiper('.roadmap-top', {
    slidesPerView: 'auto',
    speed: 1500,
    centeredSlides: true,
    spaceBetween: '18.6%',
    allowTouchMove: false,
    modules: [Navigation],
    navigation: {
      prevEl: '.sliders-navigation__btn--prev',
      nextEl: '.sliders-navigation__btn--next',
    },
    breakpoints: {
      740: {
        spaceBetween: '13%',
      },

    },
    loopMode: true,
  })
  const bottomSlider = new Swiper('.roadmap-bottom', {
    mousewheel: false,
    loop: false,
    preventInteractionOnTransition: true,
    allowTouchMove: false,
    spaceBetween: 16,
    autoHeight: true,
    centeredSlides: true,
    setWrapperSize: true,
    modules: [Navigation],
    navigation: {
      prevEl: '.sliders-navigation__btn--prev',
      nextEl: '.sliders-navigation__btn--next',
    },
    on:{
      slideChange: (swiper)=>{
        const activeSlide = swiper.slides[swiper.activeIndex];
        const prevSlide = swiper.slides[swiper.previousIndex];
        const nextSlide = swiper.slides[swiper.activeIndex+1];
        //Active slide
        const animate =(el, reversed)=>{
          const q = (sel)=>el.querySelectorAll(sel);
          gsap.timeline({defaults:{
            overwrite: true,

              duration: 1,
              position:0,
            },
            reversed: reversed,
            delay: 1,
          })
            .fromTo(q('.sliders-heading .line'),{
              yPercent: 100,
            }, {
              yPercent: 0,
              stagger: 0.1,

          }).fromTo(q('.sliders-description .line'), {
            yPercent: 100,
            opacity: 0,
          },{
            yPercent: 0,
            opacity: 1,
            stagger: 0.1,

          }, 0)
        }
        animate(activeSlide, false);
      },
    },
    runCallbacksOnInit: true,
  });
  new SplitType('[line-split-nested-s] > p', {
    types:
      'lines',
    tagName: 'span',
    absolute: true,
  })

  bottomSlider.on('transitionStart', (sld) => {
    sliderNavigationButtons.forEach(btn => btn.style.pointerEvents = 'none')
  })
  bottomSlider.on('transitionEnd', (sld) => {
    sliderNavigationButtons.forEach(btn => btn.style.pointerEvents = '')
  })
  window.bottomSlider = bottomSlider;
  gsap.timeline({
    scrollTrigger: {
      trigger: '.roadmap',
      start: 'top center',
      end: 'bottom center',
      toggleActions: 'play none none reverse',
    },
  })
    .from('.roadmap-line', {
      scaleX: 0,
      duration: .5,
    },0)
    .from('.roadmap-item__date .line', {
        yPercent: 110,
      duration: .5,
    },0)
    .fromTo('.roadmap-item:first-child .roadmap-item__dot', {
      opacity: 0,
    },{
      opacity:1,
      duration: .5,
      clearProps: 'opacity',
    }, .25)
  const qFirstSlide = (sel)=> bottomSlider.slides[0].querySelectorAll(sel);
  gsap.timeline({defaults:{
      duration: 1,
      position:0,
    },
    scrollTrigger:{
      trigger: '.roadmap-bottom',
      start: 'top center',
      end: 'bottom center',
      once: true,
    },
  })
    .fromTo(qFirstSlide('.sliders-heading .line'),{
      yPercent: 100,
    }, {
      yPercent: 0,
      stagger: 0.1,

    }).fromTo(qFirstSlide('.sliders-description .line'), {
    yPercent: 100,
    opacity: 0,
  },{
    yPercent: 0,
    opacity: 1,
    stagger: 0.1,
  }, 0)

    gsap.fromTo('.sliders-navigation__btn .circle', {
      strokeDasharray: '0 125',
    }, {
      strokeDasharray: '125 0',
      duration: 1,
    scrollTrigger:{
      trigger: '.roadmap-bottom',
      start: 'top center',
      end: 'bottom center',
      once: true,
    },
      delay: 1,
    })
  //Same animation for hover
  const btns = document.querySelectorAll('.sliders-navigation__btn');
  btns.forEach(btn=>{
    const tween=gsap.fromTo(btn.querySelector('.circle'),  {
      strokeDasharray: '0 125',
    },{
      strokeDasharray: '125 0',
      duration: 1,
      paused: true,
      lazy: true,
      immediateRender: false,
    })
    btn.addEventListener('mouseenter', ()=>tween.play(0))
    btn.addEventListener('click', ()=>tween.play(0))
  })
}
