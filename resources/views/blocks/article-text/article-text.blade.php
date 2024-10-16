<section class="article__type-one">
  <div class="article__type-one-line">
    <div class="article__type-one-block">
      <h2 class="article__type-one-title" ><span class="circle"></span><span line-wrap-split>@field('title')</span></h2>
    </div>
    <div class="article__type-one-description" line-split-nested>
      {!! wpautop( get_field('text') ) !!}
    </div>
  </div>
</section>
