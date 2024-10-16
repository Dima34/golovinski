

@extends('layouts.app', ['hide_footer' => true])
@section('content')
  <main>
  <div id="smooth-wrapper">
    <div id="smooth-content">
  @include('layouts.header')
  @include ('sections.article-header')
@php

the_content()
 @endphp
  @include('layouts.footer')
    </div>
  </div>
  </main>
@endsection
@section('before-body-close')
@endsection
