<section class="article__img">
  <div class="article__img_phonedekstop">
    @php
$images = get_field('images');
 @endphp
@foreach ($images as $image)
    <img src="{{ $image['url'] }}" alt="{{ $image['alt'] }}" />
@endforeach
  </div>
</section>
