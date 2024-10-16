@php
  $query = new WP_Query([
    "orderby" => "menu_order",
"order" => "ASC",
"post_status" => "publish",
"post_type" => "article",
"posts_per_page" => 99999,
'meta_key' => 'highlighted',
'meta_value' => '0'
  ]);
@endphp
<section class="blog__articlephone">
  @posts($query)
  <div class="blog__articlephone_container-block">
    <div class="img"><img src="@thumbnail('full', false)" alt="@title"></div>
    <div class="blog__articlephone_container-block-description">
      <h2 class="blog__articlephone_container-block-description-title">@title</h2>
      <span class="blog__articlephone_container-block-description-date">@published('F j, Y')</span>
    </div>
  </div>
  @endposts
</section>
