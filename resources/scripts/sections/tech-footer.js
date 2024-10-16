import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export function sectionTechFooter(){
  const section = document.querySelector('section.technology-footer');
  if (!section) return;
  const q= (el)=>section.querySelector(el);
  const qSA= (el)=>section.querySelectorAll(el);
  gsap.set(qSA('[line-split]'), {
    overflow: 'hidden',
  })
  const tl =
    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reverse",
      },
    })
      .from(qSA('[line-split] .line'), {
        yPercent: 100,
        duration: 0.75,
        stagger: 0.1,
      }, 1)
  }



