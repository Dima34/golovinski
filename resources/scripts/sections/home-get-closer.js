import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export function sectionHomeGetCloser(){
  const section = document.querySelector('.get-closer');
  if(!section) return;
  const q=gsap.utils.selector(section);
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top center",
      end: "bottom center",
      toggleActions: "play none none reverse",
    },
  });
  tl.from(q('h2 .line, .get-closer_content .line'), {
    y: 20,
    opacity: 0,
    stagger: 0.1,
    duration: 1,
  },1)
    .from(q('.get-closer_video-wrapper'), {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: 1,

    }, 1)
}
