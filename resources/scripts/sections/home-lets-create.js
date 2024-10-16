import SplitType from "split-type";
import {gsap} from "gsap";
export function sectionHomeLetsCreate(){
  const section = document.querySelector('section.cta');
  if(!section) return;
  const selector = gsap.utils.selector(section);
  const leftTitle = section.querySelector('.cta_left');
  const leftTitleSplit = new SplitType(leftTitle, {
    types: 'lines',
  }).lines;
  const header = section.querySelector('.cta-header');

  gsap.set(selector('.line-wrap'), {
    overflow: 'hidden',
  })
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top center",
      end: "bottom center",
      toggleActions: "play none none reverse",
    }
  })
    .from(leftTitleSplit, {
      opacity: 0,
      yPercent: 100,
      stagger: 0.1,
      duration: 1,
    })
    .from(selector('.line-wrap .line'),{
      yPercent: 100,
      duration: 1,
      stagger: 0.1,
    }, 0)
    .from(selector('.cta-description .line'), {
      opacity:0,
      yPercent:20,
      stagger: 0.1,
    }, .5)
    .from(selector('.button-arrow'), {
      clipPath: 'inset(0% 0% 100% 0%)',
      duration: 1,
    }, .5)


}
