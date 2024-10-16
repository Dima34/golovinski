<!doctype html>
<html @php(language_attributes())>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500&display=swap" rel="stylesheet">
  @php(do_action('get_header'))
  @php(wp_head())
</head>

<body @php(body_class())>

@php(wp_body_open())
<x-pre-loader />
{{--@include('layouts.header')--}}
{{--<div id="smooth-wrapper">--}}
{{--  <div id="smooth-content">--}}
{{--<main class="main">--}}
  @yield('content')
{{--</main>--}}
{{--  </div>--}}
{{--</div>--}}
@if(!isset($hide_footer))
  @include('layouts.footer')
@endif
@php(do_action('get_footer'))
@php(wp_footer())

<svg hidden class="hidden">
  @stack('bladeicons')
</svg>
@yield('before-body-close')
<script>
  //Language switcher
  {
    const ref= document.querySelector('.lang-switcher');
    const btn = document.querySelector('.lang-switcher__dropbtn');
    btn.addEventListener('click', () => {
      ref.classList.toggle('is-open');
    });
  }
</script>
</body>
</html>
