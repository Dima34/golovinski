import gsap from "gsap";
import {CustomEase} from "gsap/CustomEase";
import {isLoaded} from "@scripts/utils/is-loaded.js";
import {MEDIA_QUERY, mm} from "@scripts/utils/match-media.js";
gsap.registerPlugin(CustomEase);
CustomEase.create("Sharp.in-out", ".5, 0, .25, 1");

    const responsiveMenu = document.querySelector(".header_mobile-nav");
    const menuBtn = document.querySelector(".header_menu-opener");

    const tl = gsap.timeline({
      paused: true,
      defaults:{
        ease: 'Sharp.in-out',
      },
    });

    tl.to(responsiveMenu, {
        duration: 1.4,
        xPercent:-100,
    })
      .from('.header_mobile-nav .nav li>a', {
        yPercent: 120,
        stagger: 0.15,
      duration: 0.8,
    })
      .from('.header_mobile-nav  .nav li>span', {
        yPercent: -120,
        stagger: 0.1,

    })
      .from('.header_mobile-nav .lang-item a', {
        yPercent: 120,
        duration: 0.75,
      },'<')
    menuBtn.addEventListener("click", () => {
        if (Array.from(menuBtn.classList).includes("is-active")) {
            menuBtn.classList.remove("is-active");
            tl.reverse();
        } else {
            menuBtn.classList.add("is-active");
            tl.play();
        }
    });
window.addEventListener('DOMContentLoaded', () => {
    const ref= document.querySelector('header');
    if(!ref) return;

  mm.add({
    isMobile: MEDIA_QUERY.MOBILE,
    isDesktop: MEDIA_QUERY.DESKTOP,
  }, (context) => {
    const { isMobile, isDesktop } = context.conditions;
    const tl = gsap.timeline({paused: true, defaults: {
        ease:'Sharp.in-out',
      }});
    tl.from('.header_logo', {
      opacity: 0,
      duration:1,
      delay: 0.2,
    })

    if(!isMobile){
      gsap.set('.header_language-selector-desktop', { overflow: 'hidden' });
      tl.from('.header_desktop-nav a, .header_language-selector-desktop > *', {
        yPercent: 110,
        stagger: 0.15,
        duration: 1,
      }, '<')
        .set('.header_desktop-nav, .header_language-selector-desktop', {
          overflow: 'visible',
        }, )
    }
    isLoaded(() => {
      tl?.play();
    });
  });

});
