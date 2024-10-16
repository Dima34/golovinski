import {isLoaded} from "@scripts/utils/is-loaded.js";
import {gsap} from "gsap";
export function sectionTechPreview(){
  const section = document.querySelector('section.preview');
  if (!section) return;
  const q= (el)=>section.querySelector(el);
  const qSA= (el)=>section.querySelectorAll(el);
  gsap.set(qSA('.preview__title .line-wrap'), {
    overflow: 'hidden',
  })
  const tl =
    gsap.timeline({paused: true})
      .from(qSA('.preview__title .line'), {
        yPercent: 100,
        duration: 1.5,
        stagger: 0.1,
      })
      .from(q('.preview__title-history-img img'), {
        clipPath: 'inset(0 0 100% 0)',
        scale: 1.2,
        duration: 1.5,
      }, 0)
      .from('.preview__description .line', {
      opacity: 0,
      yPercent: 100,
      stagger: 0.1,
      duration: 1,
    }, .75)
      .from(q('.preview__title-history-btn'), {
        opacity:0,
        rotateZ: -45,
      }, 1.5)

  isLoaded(()=>tl.play());
}
