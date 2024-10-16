
<section class="advantages" id="@sub('id')">
  <div class="wrapper">
    @fields('cards')
    <div class="advantages-card">
      <h2 class="advantages-card_title">
        @sub('title')
      </h2>
      <p class="advantages-card_text text-16">
        @sub('text')
      </p>
    </div>
    @endfields
  </div>
</section>
