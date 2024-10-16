<section class="blog__image">
  <div class="blog__image_container">
    @php
      $query = new WP_Query([
        "orderby" => "menu_order",
    "order" => "ASC",
    "post_status" => "publish",
	"post_type" => "article",
	"posts_per_page" => 99,
	'meta_key' => 'highlighted',
  'meta_value' => '1'
      ]);
    @endphp
    @posts($query)
    <a href="@permalink" class="blog__image_container-block">
      <div class="img"><img src="@thumbnail('full', false)" alt="@title"></div>
      <div class="blog__image_container-block-description">
        <h2 class="blog__image_container-block-description-title" line-split>@title</h2>
        <span class="blog__image_container-block-description-date" line-split>@pll('Latest Article') (@published)</span>
      </div>
    </a>
    @endposts
  </div>
</section>
