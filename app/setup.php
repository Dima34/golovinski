<?php

/**
 * Theme setup.
 */

namespace App;

use function Roots\bundle;

/**
 * Register the theme assets.
 *
 * @return void
 */
add_action('wp_enqueue_scripts', function () {
    //    Jquery https://code.jquery.com/jquery-3.7.1.min.js
    wp_enqueue_script('jquery', 'https://code.jquery.com/jquery-3.7.1.min.js', [], null, true);

    bundle('main')->enqueue();
    if (is_page_template('template-history-page.blade.php')) {
//        wp_enqueue_script('swiper', 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/10.0.0/swiper-bundle.min.js', [], null, true);
        wp_enqueue_style('swiper', 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/10.0.0/swiper-bundle.min.css');
    }

}, 100);


/**
 * Register the initial theme setup.
 *
 * @return void
 */
add_action('after_setup_theme', function () {

    /**
     * Register the navigation menus.
     *
     * @link https://developer.wordpress.org/reference/functions/register_nav_menus/
     */
    register_nav_menus([
        'header_navigation' => 'Навигация в шапке',
        'contacts_social' => 'Социальные сети в контактах',
        'footer_social' => 'Социальные сети в подвале',
        'footer_legal' => 'Правовая информация в подвале',
        'mobile_navigation' => 'Навигация в мобильном меню',

//        'mobile_social' => 'Mobile Social Links',
    ]);


    /**
     * Enable plugins to manage the document title.
     *
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#title-tag
     */
    add_theme_support('title-tag');

    /**
     * Enable post thumbnail support.
     *
     * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
     */
//    add_theme_support('post-thumbnails');

    /**
     * Enable responsive embed support.
     *
     * @link https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-support/#responsive-embedded-content
     */
//    add_theme_support('responsive-embeds');

    /**
     * Enable HTML5 markup support.
     *
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#html5
     */
    add_theme_support('html5', [
        'caption',
        'comment-form',
        'comment-list',
        'gallery',
        'search-form',
        'script',
        'style',
    ]);

    /**
     * Enabling custom logo support.
     *
     * @link https://developer.wordpress.org/themes/functionality/custom-logo/
     */
    add_theme_support('custom-logo', [
        'height' => 51,
        'width' => 45,
        'flex-height' => true,
        'flex-width' => true,
        'header-text' => ['site-title', 'site-description'],

    ]);

    /*
     * Image sizes
     */
    //AR 21/9 uncropped
//    add_image_size('ar-21x9-w768-uncropped', 768, 0, false);
//    add_image_size('ar-21x9-w1024-uncropped', 1024, 0, false);
//    add_image_size('ar-21x9-w1440-uncropped', 1440, 0, false);
//    add_image_size('ar-21x9-w1920-uncropped', 1920, 0, false);
//    add_image_size('ar-21x9-w2560-uncropped', 2560, 0, false);
}, 20);


