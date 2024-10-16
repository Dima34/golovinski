import gsap from 'gsap';
import {isLoaded} from "@scripts/utils/is-loaded.js";
// import {mm} from './match-media.js';



export default function (){

    const sectionRef = document.querySelector('.hero');
    if(!sectionRef) return;
    const tl = gsap.timeline({paused: true, defaults: {
      ease:'Sharp.in-out',
      }});
    tl
      .from('#plate', {
    duration: 1.5,
        delay: 0.2,
    scale: 0,
  }, )
      //Title
      .to('.hero_title .word', {
      duration: 1.5,
        z: 0,
        rotateX: 0,
        opacity: 1,
      stagger: 0.1,
    }, 0.35)
      //Subtitle
      .from('.hero-bottom_subtitle .line',
      {
        opacity: 0,
        yPercent: 20,
        duration: 1.5,
        stagger: {
          amount: 1,
        },
      },
      1,
    ).from('.hero-bottom_title .char',{
      yPercent: 20,
      opacity:0,
      stagger:{
        each: 0.05,

      },

    }, 0.75)
      //Button arrow
      .fromTo('.hero-bottom .button-arrow',
      {
        clipPath: 'inset(0% 0% 100% 0%)',

      },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.5,
      },
      1,
    )
      .fromTo('.hero-bottom .button-arrow .button-content p',
      {
        opacity: 0,
      },
        {
          opacity:1.5,
        },
      '<',
    )


    isLoaded(()=>{
      tl.play();
    })

}
