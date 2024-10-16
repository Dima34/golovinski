<?php

namespace App\Helpers;

function prefixSnakeCase( string $string ): string {
    return THEME_PREFIX . '_' . str_replace( ' ', '_', strtolower( $string ) );
}
