<section class="presentation" id="@sub('id')">
  <div class="wrapper">
    <div class="presentation-header">
      <h2 class="presentation-text" fillable-text>@sub('text')</h2>
      <div class="presentation-decoration">
        <img class="circle" src="@asset('images/presentation-decoration-circle.svg')" alt="">
        <img class="arrow" src="@asset('images/presentation-decoration-arrow.svg')" alt="">
      </div>
    </div>
  </div>
  <video src="@sub('video')" autoplay muted playsinline class="presentation_video"></video>
  <!--    <video controls autoplay muted playsinline class="presentation_video">-->
  <!--      <source src="../img/presentation-2k.mp4" type="video/mp4" media="(max-width: 1920px) and (max-device-pixel-ratio: 1)">-->
  <!--      <source src="../img/presentation-2k.mp4" type="video/mp4" media="(max-width: 1920px) and (min-device-pixel-ratio: 1.5)">-->
  <!--      <source src="../img/presentation-2k.mp4" type="video/mp4" media="(min-width: 1921px)">-->
  <!--      Your browser does not support the video tag.-->
  <!--    </video>-->

</section>
