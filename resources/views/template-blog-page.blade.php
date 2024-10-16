{{--
  Template Name: Blog Page
  Template Post Type: page
--}}

@extends('layouts.app', ['hide_footer' => true])
@section('content')
  <div id="smooth-wrapper">
    <div id="smooth-content">
  @include('layouts.header')
@include('sections.blog-header')
@include('sections.blog-image')
      @php
        $query = new WP_Query([
          "orderby" => "menu_order",
      "order" => "ASC",
      "post_status" => "publish",
      "post_type" => "article",
      "posts_per_page" => 3,
      'meta_key' => 'highlighted',
      'meta_value' => '0'
        ]);
      @endphp
@include('sections.blog-article')
@include('sections.blog-imagephone')
@include('sections.blog-articlephone')
      @if($query->found_posts > 3)
@include('sections.blog-footer')
      @endif
      @include('layouts.footer')
    </div>
  </div>
@endsection
@section('before-body-close')
@endsection
