import SplitType from "split-type";
import {gsap} from "gsap";

export function handleFillableText() {

  let fillableText =
    document.querySelectorAll('[fillable-text]');

  fillableText.forEach((el) => {

    const lines = new SplitType(el, {
      types: 'lines',
    }).lines
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: fillableText,
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reverse",
        scrub: 1,
      }
    });

    tl.to(lines, {
      backgroundPositionX: 0,
      duration: .25,
      stagger: 0.15,
      ease: 'none',
    });

  })
}
