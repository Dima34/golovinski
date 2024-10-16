@php
  $query = new WP_Query([
    "orderby" => "menu_order",
"order" => "ASC",
"post_status" => "publish",
"post_type" => "article",
"posts_per_page" => 99999,
'meta_key' => 'highlighted',
'meta_value' => '1'
  ]);
@endphp
<section class="block__imagephone">
@posts($query)
  <a href="@permalink()" class="blog__imagephone_container-block">
    <img src="@thumbnail('full', false)" alt="@title">
    <div class="blog__imagephone_container-block-description">
      <h2 class="blog__imagephone_container-block-description-title" line-wrap-split>@title</h2>
      <span class="blog__imagephone_container-block-description-date" line-wrap-split>@pll('Latest Article') (@published)</span>
    </div>
  </a>
@endposts
</section>
