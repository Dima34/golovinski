@php use App\Classes\CleanWalkerNav;use BladeUI\Icons\Svg; @endphp
<header>
  <div class="wrapper">
    @php
    the_custom_logo();
    @endphp
      @hasmenu('header_navigation')
      @menu( [
          'theme_location' => 'header_navigation',
          'depth' => 1,
          'container'=> 'nav',
          'container_class' => 'header_desktop-nav',
          'menu_class' => 'nav',
          'items_wrap'     => '%3$s',
          'item_wrap' => '',
          'item_class' => '',
          'item_active_class' => '',
          'link_class' => 'header_nav-link',
          'link_active_class' => 'active-link',

          'walker' => new CleanWalkerNav()
      ] )
      @endhasmenu

    <div class="header_mobile-nav ">
      @hasmenu('mobile_navigation')
      @menu( [
          'theme_location' => 'mobile_navigation',
          'depth' => 1,
          'container'=> null,
          'container_class' => '',
          'menu_class' => '',
          'items_wrap'     => '<ul class="nav">%3$s</ul>',
          'item_wrap' => 'li',
          'item_class' => '',
          'item_active_class' => '',
          'link_class' => '',
          'link_active_class' => '',
          //Link before <span>(02)</span>
          'item_before' => '<span>(0%2$s)</span>',
          'walker' => new CleanWalkerNav()
      ] )
      @endhasmenu
      <ul class="header_language-selector-mobile">
{{--        <a>EN</a>--}}
{{--        <a>UA</a>--}}
        @php
          pll_the_languages([
              'show_flags' => 0,
              'display_names_as' => 'slug',
          ])
          @endphp
        </ul>
      </div>

      <div class="header_language-selector-desktop">
        <span class="header_language-selector-desktop__label">
          @pll('Language'):
        </span>

        <div class="lang-switcher">
          <button class="lang-switcher__dropbtn">
            @php
              echo pll_current_language('slug');
            @endphp
            <x-icon-arrow-dropdown />
          </button>
          <ul class="lang-switcher__list">
            @php
              pll_the_languages([
                  'show_flags' => 0,
                  'display_names_as' => 'slug',
                  'hide_if_empty' => 0,
              ])
            @endphp
          </ul>
        </div>

    </div>

    <button class="header_menu-opener">
      <span class="text-open">@pll('Menu')</span>
      <span class="icon-wrap">
        <x-icon-menu-open class="open" />
      <x-icon-menu-close class="close" />
      </span>

    </button>
  </div>
</header>

