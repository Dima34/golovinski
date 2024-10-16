@group('main')
<section class="technology_features">
  <h3 class="main__title" line-wrap-split>@sub('title')</h3>
  <div class="main__list_mobile">
    <ul class="main__list-all">
      @php
    $cards = get_sub_field('cards');
 @endphp
      @foreach($cards as $card)
      <div class="main__list_mobile-item">
        <li class="main__list_mobile-item-marker">
          <span class="circle"></span>
          <span class="main__list_mobile-item-marker-name" line-wrap-split>{{$card['title']}}</span>
          <span class="main__list_mobile-item-marker-number" line-wrap-split>0{{$loop->iteration}} ]</span>
        </li>
        <p class="main__list_mobile-item-description" line-split>{{$card['text']}}</p>
      </div>
      @endforeach
    </ul>
  </div>
  <div class="main__list">
    <ul class="main__list-all">
      @foreach($cards as $card)
        <li class="main__list-item-marker">
          <span class="main__list-item-marker-name" ><span class="circle"></span><span line-wrap-split>{{$card['title']}}</span></span>
          <p class="main__list-item-description" line-split>{{$card['text']}}</p>
          <span class="main__list-item-marker-number" line-wrap-split>0{{$loop->iteration}} ]</span>
        </li>
      @endforeach
    </ul>
  </div>
</section>
@endgroup
