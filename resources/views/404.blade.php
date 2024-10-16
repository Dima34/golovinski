@extends('layouts.app', ['hide_footer' => true])
@section('content')
  <main>
    <div id="smooth-wrapper">
      <div id="smooth-content">
  @include('layouts.header')
  <section class="error">
    <div class="error__block">
      <img class="error__block-img" src="@asset('images/errorimg.png')" alt="404">
      <div class="error__block_text">
        <span class="error__block_text-one">@pll('Page not found')</span>
        <span class="error__block_text-two">@pll('This is not page you are looking for'):&#40;</span>
      </div>
    </div>
    <a class="error__button" href="/">@pll('To main page') <img class="error__button-icon" src="@assets('images/Vector.png')" alt=""></a>
  </section>
        @include('layouts.footer')
      </div>
    </div>

  </main>
@endsection
