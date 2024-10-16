<section class="partners" id="@sub('id')">
  <div class="wrapper">
    <h2 word-split>@sub('title')</h2>
    <div class="partners_runline">
      <x-ticker duplicate="0" direction="left" active="true" duration="45">
      <div class="partners_runline-item">
        @php
          $logos= get_sub_field('logos');
        @endphp
        @foreach($logos as $logo)

          <div class="partners_card">
            <img src="{{$logo['url']}}" alt="{{$logo['alt']}}">
          </div>
        @endforeach
      </div>
      </x-ticker>
    </div>
  </div>
</section>
