<section class="roadmap">
  <div class="roadmap-container">
    @php
    $cards = get_field('cards');
    @endphp
    <div class="roadmap-top swiper">
      <div class="roadmap-line"></div>
      <ul class="roadmap-list swiper-wrapper">
        @foreach($cards as $card)
          <li @class([
  "roadmap-item swiper-slide",
  "swiper-slide-active" => $loop->first
])>
            <span class="roadmap-item__dot"></span>
            <span class="roadmap-item__date" line-split>{{$card['year']}}</span>
          </li>
        @endforeach
      </ul>
    </div>
    <div class="roadmap-bottom swiper">
      <div class="sliders-navigation">
        <button class="sliders-navigation__btn sliders-navigation__btn--prev">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="">
            <path d="M0.910921 10.1612H18.5886M18.5886 10.1612L9.74976 1.32233M18.5886 10.1612L9.74976 19"
                  stroke="" stroke-width="1.5"/>
          </svg>
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="circle">
            <circle cx="20" cy="20" r="19.5" stroke-width="1"/>
          </svg>
        </button>
        <button class="sliders-navigation__btn sliders-navigation__btn--next">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="">
            <path d="M0.910921 10.1612H18.5886M18.5886 10.1612L9.74976 1.32233M18.5886 10.1612L9.74976 19"
                  stroke="" stroke-width="1.5"/>
          </svg>
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="circle">
            <circle cx="20" cy="20" r="19.5" stroke-width="1"/>
          </svg>
        </button>
      </div>
      <ul class="sliders swiper-wrapper">
        @foreach($cards as $card)
        <li class="sliders-item swiper-slide">
          <div class="sliders-info">
            <span class="sliders-heading" line-wrap-split>{{$card['title']}}</span>
            <div class="sliders-description" line-split-nested-s>{!! wpautop($card['description_']) !!}</div>
          </div>
          <div class="sliders-banner">
            <img
              src="{{$card['image']['url']}}"
              alt="{{$card['image']['alt']}}"
            >
          </div>
        </li>
        @endforeach
      </ul>
    </div>
  </div>
</section>
