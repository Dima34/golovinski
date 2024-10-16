<section class="cta" id="@sub('id')">
  <div class="wrapper">
    <div class="cta_left" >
      @sub('text-left')
    </div>
    <div class="cta_right">
      <h2 class="cta-header">
        @if(pll_current_language() == 'ua')
          <div class="line-wrap"><div class="line">давайте створимо</div></div>
          <div class="line-wrap"><div class="line">щось
          <div class="rotation-word_container">
            <div class="rotating-words">
              <span>вражаюче</span>
              <span>творче</span>
              <span>оригінале</span>
              <span>елегантне</span>
              <span>величне</span>
            </div>
          </div></div>
          </div>
        @else
          <div class="line-wrap"><div class="line" >let’s create</div></div>
          <div class="line-wrap"><div class="line">something
          <div class="rotation-word_container">
            <div class="rotating-words">
              <span>striking</span>
              <span>creative</span>
              <span>original</span>
              <span>elegant</span>
              <span>majestic</span>
              <span>striking</span>
            </div>
          </div>
          </div></div>
        @endif

      </h2>

      <div class="cta-content">
        <p class="cta-description" line-split>@sub('description')</p>
        <a href="@sub('link')" class="button-arrow" data-el="cta">
          <div class="button-content">
            <span></span>
            <div class="circle"></div>
            <p>@pll('Leave a request')</p>
          </div>
          <div class="button-side"></div>
        </a>
      </div>
    </div>
  </div>
</section>
