import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export function sectionHomePartners(){
  const section = document.querySelector('.partners');
  if(!section) return;
  const q=gsap.utils.selector(section);
  gsap.set(q('h2 .line'), {
    overflow: 'hidden',
  })
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 90%",
      markers: true,
      end: "bottom center",
      toggleActions: "play none none reverse",
    },
  })
    .from(q('h2 .word'), {
    yPercent: 100,
    stagger: 0.2,
    duration: 0.75,
  },1)
    .fromTo(q('.partners_card'), {
      clipPath: 'circle(0%)',
    }, {
      duration: 2.5,
      clipPath: 'circle(100%)',
      ease: 'Sharp.in-out',
    }, 0.5)
}
