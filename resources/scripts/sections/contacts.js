import {isLoaded} from "@scripts/utils/is-loaded.js";
import {gsap} from "gsap";
export function sectionContacts(){
  const section = document.querySelector('section.contacts');
  if (!section) return;
  const q= (el)=>section.querySelector(el);
  const qSA= (el)=>section.querySelectorAll(el);
  gsap.set(qSA('.line-wrap, .contacts__information_block-name[line-split]'), {
    overflow: 'hidden',
  })
  const tl =
    gsap.timeline({paused: true})
      .from(qSA('.contacts__input_title .line'), {
        yPercent: 100,
        duration: 1.5,
        stagger: 0.1,
      })
      .from(qSA('.fade'), {
        opacity: 0,
        yPercent: 20,
        duration: 1,
      },.75)
      .from('.contacts__information_block-name[line-split] .line', {
        yPercent: 100,
        duration: 1,
      },0)
      .fromTo('.contacts__information_block-media-icon', {
    strokeDasharray: '0 125',
        opacity: 0,
  }, {
    strokeDasharray: '125 0',
        opacity: 1,
    duration: 1,
        stagger: 0.2,
  }, 1)
      .to(qSA('.field'), {
        '--scale': 1,
        stagger: 0.2,
        duration: 1,
      }, 1)
      .from(qSA('.field .line label'), {
        yPercent: 100,
        duration: 1,
        stagger: 0.2,
      }, 1)
      .from(qSA('.field input, .field textarea, .checkbox, .contacts__input-btn, .optional-label'), {
       opacity: 0,
        duration: 1,
        stagger: 0.2,
      }, 1)

  isLoaded(()=>tl.play());
}
