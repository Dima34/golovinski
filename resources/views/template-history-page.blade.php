{{--
  Template Name: History Page
  Template Post Type: page
--}}

@extends('layouts.app', ['hide_footer' => true])
@section('content')
  <div id="smooth-wrapper">
    <div id="smooth-content">
  @include('layouts.header')
  @include('sections.history-hero')
  @include('sections.history-roadmap')
      @include('layouts.footer')
    </div>
  </div>
@endsection
@section('before-body-close')
  <script>

  </script>
@endsection
