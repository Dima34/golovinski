@group('preview')
<section class="preview">
  <span class="technology-note">@sub('subtitle')</span>
  <h4 class="preview__title" line-wrap-split>@sub('title')</h4>
  <div class="preview__title-history">
    <button class="preview__title-history-btn"><img class="preview__title-history-btn-icon" src="@asset('images/button.png')" alt="Arrow"></button>
    @php
    $image = get_sub_field('image');
    $alt = $image['alt'];
    $src = $image['url'];
 @endphp
    <div class="preview__title-history-img"><img src="{{$src}}" alt="{{$alt}}"></div>

    <div class="preview__description" line-split-nested>{!! wpautop(get_sub_field('text')) !!}</div>
  </div>
</section>
@endgroup
