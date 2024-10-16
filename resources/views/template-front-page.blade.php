{{--
  Template Name: Front Page
  Template Post Type: page
--}}

@extends('layouts.app', ['hide_footer' => true])
@section('content')
  <main>
    <div id="smooth-wrapper">
      <div id="smooth-content">
    @include('layouts.header')

  @layouts('sections')
  @layout('hero_block')
  @include('sections.hero')
  @endlayout

  @layout('advantages_block')
  @include('sections.advantages')
  @endlayout

  @layout('presentation_block')
  @include('sections.presentation')
  @endlayout

  @layout('cta_block')
  @include('sections.cta')
  @endlayout

  @layout('who_we_block')
  @include('sections.who-we')
  @endlayout

  @layout('get_closer_block')
  @include('sections.get-closer')
  @endlayout

  @layout('partners_block')
  @include('sections.partners')
  @endlayout
  @endlayouts
        @include('layouts.footer')
      </div>
    </div>
  </main>


@endsection
@section('before-body-close')
  <canvas id="plate"></canvas>
  <div id="video-popup-overlay"></div>

  <div id="video-popup-container">
    <div id="video-popup-close" class="fade">&#10006;</div>
    <div id="video-popup-iframe-container">
      <iframe id="video-popup-iframe" src="" width="100%" height="100%" frameborder="0"></iframe>
    </div>
  </div>

  <script>

    jQuery(document).ready(function ($) {
      $(".vpop").on("click", function(e) {
        e.preventDefault();
        $("#video-popup-overlay,#video-popup-iframe-container,#video-popup-container,#video-popup-close").show();
        console.log("clicked");
        var srchref = "", autoplay = "", id = $(this).data("id");
        if ($(this).data("type") == "vimeo") var srchref = "//player.vimeo.com/video/";
        else if ($(this).data("type") == "youtube") var srchref = "https://www.youtube.com/embed/";

        if ($(this).data("autoplay") == true) autoplay = "?autoplay=1";

        $("#video-popup-iframe").attr("src", srchref + id + autoplay);

        $("#video-popup-iframe").on("load", function() {
          $("#video-popup-container").show();
        });
      });

      $("#video-popup-close, #video-popup-overlay").on("click", function(e) {
        $("#video-popup-iframe-container,#video-popup-container,#video-popup-close,#video-popup-overlay").hide();
        $("#video-popup-iframe").attr("src", "");
      });
    });

  </script>
@endsection
