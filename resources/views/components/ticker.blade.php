@props(['duration' => 25, 'direction' => 'left', 'className'=>'', 'active' => false, 'duplicate'=>2])
@php
  $classes = 'ticker ' . $className;
  if ($active) {
      $classes .= ' is-active';
  }
if($direction === 'right') {
  $classes .= ' ticker--reverse-direction';
}
$style = '--ticker-duration: ' . $duration . 's';
$onWhenVisible = !$active ? 'data-on-when-visible="1"' : '';
@endphp
<div {{ $attributes->merge(['class' => $classes, 'style'=>$style]) }} {{$onWhenVisible}}>
  <div class="ticker__instance ticker__original">
    @for($x = 0; $x <= $duplicate; $x++)
      {{$slot}}
    @endfor

  </div>
  <div class="ticker__instance ticker__clone">
    @for($x = 0; $x <= $duplicate; $x++)
      {{$slot}}
    @endfor
  </div>
</div>
