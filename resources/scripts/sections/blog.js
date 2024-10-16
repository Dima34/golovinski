import {isLoaded} from "@scripts/utils/is-loaded.js";
import {gsap} from "gsap";
import {MEDIA_QUERY, mm} from "@scripts/utils/match-media.js";
export function blog(){
  mm.add({
    isMobile: MEDIA_QUERY.MOBILE,
    isDesktop: MEDIA_QUERY.DESKTOP,
  }, (ctx)=>{
    const{isMobile, isDesktop}=ctx.conditions;
    const section = document.querySelector('section.blog__header');
    if (!section) return;
    const q= (el)=>section.querySelector(el);
    const qSA= (el)=>section.querySelectorAll(el);
    gsap.set(qSA('.blog__header-title .line-wrap'), {
      overflow: 'hidden',
    })
    const tl =
      gsap.timeline({paused: true})
        .from(qSA('.blog__header-title .line, .blog__header-subtitle .line'), {
          yPercent: 100,
          duration: 1.5,
          stagger: 0.1,
        })

    isLoaded(()=>tl.play());

    const cards = document.querySelectorAll(isDesktop ? '.blog__image_container-block' : '.blog__imagephone_container-block');
    cards.forEach((card,idx)=>{
      const visibleOnHero = idx === 0 || idx === 1;
      const q= (el)=>card.querySelectorAll(el);
      gsap.set(q('.line-wrap'), {
        overflow: 'hidden',
      })
      const cardsTl= gsap.timeline({
        scrollTrigger: visibleOnHero ? undefined: {
          trigger: card,
          start: 'top 60%',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
        },
      })
        .from(q('img'), {
          clipPath: 'inset(0 0 100% 0)',
          scale: 1.2,
          duration: 1,
        })
        .from(q('.line'), {
          yPercent: 100,
          stagger: 0.1,
          duration: 1,
        }, 1)
      if(visibleOnHero) {
        tl.add(cardsTl, 0)
      }
    })


    //Articles
    const articles=document.querySelectorAll(isDesktop? '.blog__article' : '.blog__articlephone')
    articles.forEach((article)=>{
      const q= (el)=>article.querySelectorAll(el);
      gsap.set(q('[line-wrap-split] .line-wrap'), {
        overflow: 'hidden',
      })
      gsap.timeline({
        scrollTrigger:{
          trigger: article,
          start: 'top 60%',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
        },
      })
        .from(q('img'), {
          clipPath: 'inset(0 0 100% 0)',
          scale: 1.2,
          duration: 1,
        })
        .from(q('[line-wrap-split] .line'), {
          yPercent: 100,
          stagger: 0.1,
          duration: 1,
        }, 1)
    })

    //Show more

    {
      const ref = document.querySelector('.blog__footer_btn');
      ref && gsap.timeline({
        scrollTrigger:{
          trigger: '.blog__footer_btn',
          start: 'top 70%',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
        },
      }).fromTo('.blog__footer_btn svg', {
        strokeDasharray: '0 125',
        stroke:'transparent',
      }, {
        strokeDasharray: '98 25',
        keyframes:{
          '1%': {
            stroke: 'white',
          },
        },
        ease: 'none',
        duration: 1,

      }, 0)
        .from('.blog__footer_btn .line', {
          yPercent: 100,
          stagger: 0.1,
          duration: 1,
        }, 0)

      const tween =ref && gsap.fromTo('.blog__footer_btn svg', {
        strokeDasharray: '98 25',
      },{
        strokeDasharray: '125 0',
        duration: 1,
        paused: true,
      })
      //On hover fill full stroke
      ref?.addEventListener('mouseenter', ()=>{
        tween.play()
      })
      ref?.addEventListener('mouseleave', ()=>{
        tween.reverse()
      })
    }
  })
}
