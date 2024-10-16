<section class="article__header">
  <div class="article__header_column">
    <h3 class="article__header_column-title">@pll('You might be interesting'):</h3>
    <div class="article__header_column-list">
      @php
        $query = new WP_Query([
          'post_type' => 'article',
          'posts_per_page' => 4,
        ]);
      $current_id = get_the_ID();
      @endphp
      @posts($query)
      @if($current_id != get_the_ID())
      <a href="@permalink" class="article__header_column-list-item">
        <div class="article__header_column-list-itemi">
          <span class="article__header_column-list-item-name" line-wrap-split>@title</span>
          <img class="article__header_column-list-item-img" src="@asset('images/Vector.png')" alt="">
        </div>
      </a>
      @endif
      @endposts
    </div>
  </div>
  <div class="article__header_two">
    <div class="article__header_two-text">
      <div class="article__header_two-text-block">
        <h2 class="article__header_two-text-block-title" line-wrap-split>
          @title
        </h2>
        <span class="article__header_two-text-block-date">@field('time') @pll('min') | @php echo get_the_date('d.m.Y') @endphp</span>
      </div>
    </div>
    <span class="article__header_two-description" line-split>@field('subtitle') ]</span>
  </div>
  <div class="article__header_two-phone">
    <div class="article__header_two-phone-block">
      <h2 class="article__header_two-phone-block-title" line-wrap-split>@title</h2>
    </div>
    <p class="article__header_two-phone-description" line-split>@field('subtitle') ]</p>
    <div class="article__header_two-phone-text">
      <span class="article__header_two-phone-text-date">@field('time') @pll('min') | @php echo get_the_date('d.m.Y') @endphp</span>
      <span class="article__header_two-phone-text-name">@pll('by golovinski company')</span>
    </div>
  </div>
</section>
<section class="article__subheader">
  <img class="article__subheader-img" src="@asset('images/Star.png')" alt="Star">
  <div class="article__subheader-two">
    <span class="article__subheader-name">@pll('by golovinski company')</span>
    <div class="article__subheader-nav">
      <span class="article__subheader-nav-text">@pll('scroll down')</span>
      <img class="article__subheader-nav-img" src="@asset('images/Vector_down.png')" alt="Down">
    </div>
  </div>
</section>
