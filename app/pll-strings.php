<?php

use function App\Helpers\prefixSnakeCase;

/**
 * $PLL_STRINGS array for managing translation strings.
 *
 * This array stores translation strings for easy access and management.
 *
 * @var array $PLL_STRINGS
 * @example
 * [
 *     [
 *         'name' => 'myplugin', // (required) Name provided for sorting convenience (e.g., 'myplugin')
 *         'string' => 'The string to translate', // (required) The string to translate
 *         'context' => 'polylang', // (optional) The group in which the string is registered, defaults to 'polylang'
 *         'multiline' => false, // (optional) If set to true, the translation text field will be multiline, defaults to false
 *     ],
 *    'abc', // The string to translate
 *    ['def', true], // The string to translate, with optional multiline flag
 * ]
 */
$PLL_STRINGS = [
    'Theme Settings',
    'Phone number',
    'Address',
    'design by',
    'Developed by',
    'Let’s talk',
    'social networks',
    'Get in touch',
    'Leave a request',
    'You might be interesting',
    'by golovinski company',
    'scroll down',
    'min',
    'Latest Article',
    'Learn More',
    'show all',
    'Let’s get in touch',
    'submit  message',
    'phone',
    'Page not found',
    'This is not page you are looking for',
    'To main page',
    'Menu',
    'Language',
];
add_action('init',function () use ($PLL_STRINGS) {
    if (function_exists('pll_register_string')) {
        foreach ($PLL_STRINGS as $item) {
            // Normalize $item to ensure it's an associative array with required keys
            if (is_string($item)) {
                $item = [
                    'string' => $item,
                    'multiline' => false,
                ];
            } elseif (is_array($item) && isset($item[0]) && is_string($item[0])) {
                $item = [
                    'string' => $item[0],
                    'multiline' => isset($item[1]) ? (bool)$item[1] : false,
                ];
            }

            // Set default values if not provided
            $item = [
                'name' => isset($item['name']) ? prefixSnakeCase($item['name']) : prefixSnakeCase($item['string']),
                'string' => $item['string'],
                'context' => THEME_NAME,
                'multiline' => $item['multiline'],
            ];
            // Register the string
            pll_register_string($item['name'], $item['string'], $item['context'], $item['multiline']);
        }
    }
});
