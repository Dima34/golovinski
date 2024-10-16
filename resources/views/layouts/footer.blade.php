@php use Brick\PhoneNumber\PhoneNumber;use Brick\PhoneNumber\PhoneNumberFormat; use App\Classes\CleanWalkerNav; @endphp
<footer>
  <div class="wrapper">
    <div class="footer-top">
      <div class="footer_left">
        <div class="footer_link-block big">
          <h2 class="text-20" line-wrap-split>@pll('Let’s talk')</h2>
          <a href="mailto:@option('e-mail')" class="button no-underline" line-wrap-split>@option('e-mail')</a>
        </div>
        <div class="footer_left_link-grid">
          <div class="footer_link-block">
            <h3 class="text-20" line-wrap-split>@pll('Phone number'):</h3>
            @php
              $phoneText = get_field('phone', 'option');
              $parsedPhone = $number = PhoneNumber::parse($phoneText);
              $telFormat = $parsedPhone->format(PhoneNumberFormat::RFC3966);
            @endphp
            <a href="{{$telFormat}}" class="button no-underline">@option('phone')</a>
          </div>

          <div class="footer_link-block">
            <h3 class="text-20" line-wrap-split>
              @pll('Address'):
            </h3>
            <a href="#" class="button no-underline address">@option('address')</a>
          </div>

          <div class="footer_link-block">
            <h3 class="text-20" line-wrap-split>@pll('design by')</h3>
            <a href="#" class="button no-underline" line-wrap-split>Alex hryshchenko</a>
          </div>

          <div class="footer_link-block">
            <h3 class="text-20" line-wrap-split>@pll('Developed by')</h3>
            <a href="https://linktr.ee/vavilovdevelopment" class="button no-underline" line-wrap-split>Dima vavilov</a>
          </div>
        </div>
      </div>
      <div class="footer_right">
        <div class="footer_socials">
          <h3 class="text-20" line-wrap-split>@pll('social networks'):</h3>
          @hasmenu('footer_social')
          @menu( [
              'theme_location' => 'footer_social',
              'depth' => 1,
              'container'=> null,
              'container_class' => '',
              'menu_class' => '',
              'items_wrap'     => '<ul>%3$s</ul>',
              'item_wrap' => 'li',
              'item_class' => 'footer-socials-button',
              'item_active_class' => '',
              'link_class' => 'text-20 ',
              'link_active_class' => '',
               'item_before'=>'<span class="border"></span>',
              'walker' => new CleanWalkerNav()
          ] )
          @endhasmenu
        </div>
        @hasmenu('footer_legal')
        @menu( [
            'theme_location' => 'footer_legal',
            'depth' => 1,
            'container'=> null,
            'container_class' => '',
            'menu_class' => '',
            'items_wrap'     => '<ul class="footer_privacy">%3$s</ul>',
            'item_wrap' => 'li',
            'item_class' => '',
            'item_active_class' => '',
            'link_class' => 'button text-20 line-wrap-split no-underline',
            'link_active_class' => '',

            'walker' => new CleanWalkerNav()
        ] )
        @endhasmenu
      </div>
    </div>
    <div class="footer-bottom">
      <p line-wrap-split>Golovinski©</p>
    </div>
  </div>
</footer>
