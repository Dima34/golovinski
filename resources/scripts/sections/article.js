import {isLoaded} from "@scripts/utils/is-loaded.js";
import {MEDIA_QUERY, mm} from "@scripts/utils/match-media.js";
import {gsap} from "gsap";
export function sectionArticle(){
  const ref = document.querySelector('.single-article');
  if(!ref) return;

//Hero
  {
    const q=gsap.utils.selector('.article__header');
    mm.add({
      isMobile: MEDIA_QUERY.MOBILE,
      isDesktop: MEDIA_QUERY.DESKTOP,
    }, ({conditions})=>{
      const {isMobile, isDesktop} = conditions;
      const tl=gsap.timeline({paused: true})
      gsap.set(q('.line-wrap'), {overflow: 'hidden'});
      if(isDesktop){
        tl.from('.article__header_two-text-block-title .line', {
          yPercent: 100,
          duration: 0.75,
          stagger: 0.1,
        }).from('.article__header_two-description .line, .article__header_column-title', {
          opacity: 0,
          yPercent: 100,
          stagger: 0.1,
          duration: 0.75,
        }, 0)
          .from('.article__header_column-list-item', {
            opacity: 0,
            yPercent: 100,
            stagger: 0.1,
            duration: 0.75,
          }, 0.5)
          .from('.article__header_two-text-block-date', {
            opacity: 0,
            duration: 0.75,
          }, 0.5)

      }

      if(isMobile){
        tl.from('.article__header_two-phone-block-title .line', {
          yPercent: 100,
          duration: 0.75,
          stagger: 0.1,
        })
          .from('.article__header_two-phone-description .line', {
            opacity: 0,
            yPercent: 100,
            stagger: 0.1,
            duration: 0.75,
          }, 0)
          .from('.article__header_two-phone-text-date, .article__header_two-phone-text-name', {
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
        }, 0)


          gsap.timeline({
            scrollTrigger:{
              trigger: '.article__header_column-title',
              start: 'top 90%',
              end: 'bottom center',
            }
          }).from('.article__header_column-title', {
            opacity: 0,
            duration: 0.75,
            stagger: 0.1,
          }, 0)
            .from('.article__header_column-list-item', {
              opacity: 0,
              yPercent: 100,
              stagger: 0.1,
              duration: 0.75,
            }, 0.5)
      }
      isLoaded(()=>tl.play())



    })
  }

  //Thumb animation
  {
    const els = document.querySelectorAll('#smooth-content > .wp-block-image');

    els.forEach((el)=>{
      const q= gsap.utils.selector(el);
      gsap.from(q('img'), {
        clipPath: 'inset(0 0 100% 0)',
        scale: 1.2,
        duration: 1,
        scrollTrigger:{
          trigger: el,
          start: 'top 65%',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
        }
      })
    })

  }


  //article__type-one
  {
    const els = document.querySelectorAll('.article__type-one');
    els.forEach(el=>{
      const q=gsap.utils.selector(el);
      gsap.set(q('.line-wrap'), {overflow: 'hidden'});
      gsap.timeline({
        scrollTrigger:{
          trigger: el,
          start: 'top 85%',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
        },
      }).from(q('.article__type-one-title .line'), {
        yPercent: 100,
        duration: 0.75,
        stagger: 0.1,
      })
        .fromTo(q('.circle'), {
          opacity: 0,
        },{
          opacity: 1,
          duration: 0.75,
        }, 0.25)
        .from(q('.article__type-one-description .line'), {
        opacity: 0,
        yPercent: 100,
        stagger: 0.1,
        duration: 0.75,
      }, 0.5)
    })
  }

  //article__img
  {
    const els = document.querySelectorAll('.article__img');
    els.forEach(el=>{
      const q=gsap.utils.selector(el);
      gsap.from(q('img'), {
        clipPath: 'inset(0 0 100% 0)',
        duration: 1,
        stagger: 0.2,
        scrollTrigger:{
          trigger: el,
          start: 'top 65%',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
        }
      })
    })
  }
}
