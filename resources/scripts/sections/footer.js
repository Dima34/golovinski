import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export function sectionFooter(){
  const ref = document.querySelector('footer');
  if(!ref) return;
  const q=gsap.utils.selector(ref);
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ref,
      start: 'top 70%',
      toggleActions: "play none none reverse",
    }});

  gsap.set(q('.line-wrap'), {
    clipPath: 'inset(-2% -20% -2% -20%)',
  });

  tl.from(q('.footer-top .line'), {
    yPercent: 120,
    duration: 0.5,
    stagger: 0.2,
  })
    .to(q('.footer-socials-button'), {
    keyframes: {
      '--border-crop1': ['102%', '-2%', '-2%' ],
      '--border-crop2': ['102%','102%','-2%' ],
    },
    stagger: 0.2,
  }, .5)
   gsap.from('.footer-bottom .line', {
      yPercent: 120,
      duration: 0.5,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.footer-bottom',
        start: 'top 90%',
        toggleActions: "play none none reverse",
      }
    })
  //Socials hover
  {
    const socials = q('.footer-socials-button');
    socials.forEach(social =>{
      const border = social.querySelector('.border');
      const tween = gsap.to(border, {
        keyframes: {
          '--border-crop1': ['102%', '-2%', '-2%' ],
          '--border-crop2': ['102%','102%','-2%' ],
        },
        paused: true,
        onUpdate:()=>console.log(border.style.getPropertyValue('--border-crop1')),
      });
      social.addEventListener('mouseover', () => tween.play());
      social.addEventListener('mouseout', () => tween.reverse());
    })
  }
}
