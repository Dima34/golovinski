
@posts($query)
<section class="blog__article">
  <div class="img"><img src="@thumbnail('full', false)" alt="@title"></div>
  <div class="blog__article_text">
    <h2 class="blog__article_text-title" line-wrap-split>@title</h2>
    <span class="blog__article_text-date">@published</span>
  </div>
  <a class="blog__article_btn" href="@permalink">
    @pll('Learn More')
  </a>
</section>
@endposts
