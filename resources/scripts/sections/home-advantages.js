import SplitType from "split-type";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export function sectionAdvantages() {
  const section = document.querySelector('.advantages');
  if(!section) return;
  const advCards = Array.from(document.querySelectorAll('.advantages-card'));

  advCards.forEach((card) => {
    const cardTitle = card.querySelector('.advantages-card_title');
    const cardText = card.querySelector('.advantages-card_text');
    const titleLines = new SplitType(cardTitle, {
      types:
        'lines',
      tagName: 'span',
    }).lines

    const textLines = new SplitType(cardText, {
      types:
        'lines',
      tagName: 'span',
    }).lines
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top 66%",
        end: "bottom bottom",
        toggleActions: "play none none reverse",
        duration: 3,

      },
    });

    tl.from(card, {
      clipPath: 'inset(0% 0% 100% 0%)',
      duration: 1.5,
    })



    tl.from(titleLines,
      {
        opacity: 0,
        yPercent:100,
        stagger: .15,
        ease: 'power1.out',
      },
      0.25,
    )
    .from(textLines,
      {
        opacity: 0,
        yPercent:100,
        stagger: .1,
        duration: 0.75,
        ease: 'power1.out',
      },
      0.75,
    )
    .fromTo(card,
      {
        "--ill-opacity": "0",
        "--ill-rotation": "0deg",
      },
      {
        "--ill-opacity": "1",
        "--ill-rotation": "180deg",
        duration: 1,
      },
      1.25
    )
  })

  gsap.fromTo('#plate', {
    scale: 1,
  },{
    scrollTrigger: {
      trigger: '.advantages-card:last-child',
      start: `top 20%`,
      end: `bottom 50%`,
      scrub: 1,

    },
    duration: 1,
    scale: 0,
    lazy: true,
    immediateRender: false,
  })
}
