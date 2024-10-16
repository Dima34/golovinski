<?php

use Carbon_Fields\Container;
use Carbon_Fields\Field;


Container::make('post_meta', __('Content'))->where('post_template', '=', 'template-custom.blade.php')
    ->add_fields([
        Field::make('text', THEME_PREFIX . 'text', 'Text Field'),
    ]);


