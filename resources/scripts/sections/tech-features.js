import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {MEDIA_QUERY, mm} from "@scripts/utils/match-media.js";
gsap.registerPlugin(ScrollTrigger);
export function sectionTechFeatures(){
  const section = document.querySelector('section.technology_features');
  if (!section) return;
  const q= (el)=>section.querySelector(el);
  const qSA= (el)=>section.querySelectorAll(el);
  gsap.set(qSA('.main__title .line-wrap'), {
    overflow: 'hidden',
  })
  mm.add({
    isMobile: MEDIA_QUERY.MOBILE,
    isDesktop: MEDIA_QUERY.DESKTOP,
  }, ({
    conditions,
  })=>{
    const {
      isMobile,
      isDesktop,
    } = conditions;
    const tl =
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      })
        .from(qSA('.main__title .line'), {
          yPercent: 100,
          duration: 1,
          stagger: 0.1,
        })

      if(isMobile){
        const cards = qSA('.main__list_mobile-item');
        cards.forEach(card=>{
          const qA= (el)=>card.querySelectorAll(el);
          gsap.set(qA('.line-wrap'), {
            overflow: 'hidden',
          })
          gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "bottom center",
              toggleActions: "play none none reverse",
          }})
            .fromTo(qA('.circle'), {
              opacity: 0,
            },{
              opacity: 1,
              duration: 0.75,
            }, 0.25)
            .from(qA('.main__list_mobile-item-marker-name .line, .main__list_mobile-item-marker-number .line'), {
              yPercent: 100,
              duration: 0.75,
              stagger: 0.1,
            })
            .from(qA('.main__list_mobile-item-description .line'), {
              opacity: 0,
              yPercent: 100,
              stagger: 0.1,
              duration: 0.5,
            })
        })
        }

    if(isDesktop){
      const cards = qSA('.main__list-item-marker');
      cards.forEach(card=>{
        const qA= (el)=>card.querySelectorAll(el);
        gsap.set('.line-wrap', {
          overflow: 'hidden',
        })
        gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "bottom center",
            toggleActions: "play none none reverse",
            // markers: true,
          }})
          .fromTo(qA('.main__list-item-marker-name .circle'), {
            opacity: 0,
          },{
            opacity: 1,
            duration: 0.75,
          }, 0.25)
          .from(qA('.main__list-item-marker-name .line, .main__list-item-marker-number .line'), {
            yPercent: 105,
            duration: 0.75,
            stagger: 0.1,
          })
          .from(qA('.main__list-item-description .line'), {
            opacity: 0,
            yPercent: 105,
            stagger: 0.1,
            duration: 0.5,
          }, 0)
      })

    }
    ScrollTrigger.refresh();
      });

  }



