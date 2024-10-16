{{--
  Template Name: Technology Page
  Template Post Type: page
--}}

@extends('layouts.app', ['hide_footer' => true])
@section('content')
{{--  <main>--}}
    <div id="smooth-wrapper">
      <div id="smooth-content">
    @include('layouts.header')
@include('sections.technology-preview')
@include('sections.technology-main')
  @include('sections.technology-footer')
        @include('layouts.footer')
      </div>
    </div>
{{--  </main>--}}
@endsection
@section('before-body-close')
@endsection
