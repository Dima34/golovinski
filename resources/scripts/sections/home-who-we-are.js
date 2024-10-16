import {gsap} from "gsap";
import {MEDIA_QUERY, mm} from "@scripts/utils/match-media.js";
import SplitType from "split-type";

export function sectionHomeWhoWeAre(){
  const section = document.querySelector('.who-we_intro');
  if(!section) return;
  mm.add({
    isMobile: MEDIA_QUERY.MOBILE,
    isDesktop: MEDIA_QUERY.DESKTOP,
  }, (ctx)=>{
    const { isMobile } = ctx.conditions;
    if(!isMobile){
      gsap.set(section, {
        transformOrigin: 'top right',
      })
      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "75% top",
          scrub: 1,
        },
        scale: 0.6,
      })
    }
    const leftTitleLines = section.querySelectorAll('.who-we_left .line');
    //Wrap content of each line in a div
    const textSplit= new SplitType('.who-we_right-content p', {
      types:
        'lines',
      tagName: 'span',
    })
    gsap.set('.who-we_left .line-wrap', {
      overflow: 'hidden',
    })
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.who-we .wrapper',
        start: "top 80%",
        end: "bottom center",
        toggleActions: "play none none reverse",
      },
    });
    tl.from('.who-we_left .line', {
      yPercent: 100,
      duration: 1,
      stagger: 0.1,
  })
      .from('.who-we_right .line, .who-we_right a', {
        opacity: 0,
        yPercent: 20,
        stagger: 0.1,
        duration: 1,
      }, .5)
      .from('.who-we_left p .line', {
        opacity: 0,
        yPercent:20,
      }, 1)

});}
