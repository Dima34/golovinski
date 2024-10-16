{{--
  Template Name: Contacts Page
  Template Post Type: page
--}}
@php use Brick\PhoneNumber\PhoneNumber;use Brick\PhoneNumber\PhoneNumberFormat; use App\Classes\CleanWalkerNav; @endphp
@extends('layouts.app', ['hide_footer' => true])
@section('content')
  <div id="smooth-wrapper">
    <div id="smooth-content">
  @include('layouts.header')
  <section class="contacts">
    <div class="contacts__input">
      <h4 class="contacts__input_title" line-wrap-split>@pll('Let’s get in touch')</h4>

      @php
        echo do_shortcode('[cf7form cf7key="contact-form-1" html_class="contacts__input-form"]');
      @endphp
    </div>
    <div class="contacts__information">
      <div class="contacts__information-text">
        <div class="contacts__information_block">
          <span class="contacts__information_block-name" line-split>@pll('Address'):</span>
          <span class="contacts__information_block-description fade">@option('address')</span>
        </div>
        <div class="contacts__information_block">
          <span class="contacts__information_block-name" line-split>@pll('phone'):</span>
          <span class="contacts__information_block-description fade">@option('phone')</span>
        </div>
        <div class="contacts__information_block">
          <span class="contacts__information_block-name" line-split>E-mail:</span>
          <span class="contacts__information_block-description fade">@option('e-mail')</span>
        </div>
      </div>
      <div class="contacts__information_block icon">
        <span class="contacts__information_block-name fade">@pll('social networks'):</span>
        @hasmenu('contacts_social')
        @menu( [
            'theme_location' => 'contacts_social',
            'depth' => 1,
            'container'=> null,
            'container_class' => '',
            'menu_class' => '',
            'items_wrap'     => '<div class="contacts__information_block-media">%3$s</div>',
            'item_wrap' => '',
            'item_class' => '',
            'item_active_class' => '',
            'link_class' => 'contacts__information_block-media-icon',
            'link_active_class' => '',
            'hide_text' => true,
            'icon'=> true,
            'link_before'=>'<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="circle">
            <circle cx="20" cy="20" r="19.5" stroke-width="0.5"/>
          </svg>',
            'walker' => new CleanWalkerNav()
        ] )
        @endhasmenu
      </div>
    </div>
  </section>
  </div>
  </div>
@endsection
@section('before-body-close')
@endsection
