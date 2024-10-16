<section class="hero" id="@sub('id')">
  <div class="wrapper">
    <h1 class="hero_title" text-split>
     @sub('title')
    </h1>
    <div class="hero-bottom">
      <div class="hero-bottom_content">
        <h2 class="hero-bottom_title" text-split>@sub('subtitle')</h2>
        <p class="hero-bottom_subtitle" line-split>
          @sub('text')
        </p>
      </div>
      <a href="/contacts" class="button-arrow" >
        <div class="button-content" data-el="cta">
          <div class="circle"></div>
          <span></span>
          <p>@pll('Get in touch')</p>
        </div>
        <div class="button-side"></div>
      </a>
    </div>
  </div>
</section>
