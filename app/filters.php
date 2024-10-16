<?php

/**
 * Theme filters.
 */

namespace App;

use DirectoryIterator;

/**
 * Disable Editor
 *
 **/

add_action('admin_init', function () {
    $exclude_templates = ['template-front-page.blade.php','template-blog-page.blade.php','template-tech-page.blade.php', 'template-history-page.blade.php', 'template-contacts-page.blade.php'];
    if (isset($_GET['post'])) {
        $post_id = $_GET['post'];
    } elseif (isset($_POST['post_ID'])) {
        $post_id = $_POST['post_ID'];
    } else {
        return;
    }

    $template_file = get_post_meta($post_id, '_wp_page_template', true);

    if (in_array($template_file, $exclude_templates)) {
        remove_post_type_support('page', 'editor');
    }
});


add_action('acf/input/admin_footer', function () {
    ?>
    <script type="text/javascript">
        if (typeof (acf) !== 'undefined') {
            acf.addFilter('wysiwyg_tinymce_settings', function (mceInit, id, el) {

                if (el?.$el[0]?.classList.contains('limit-toolbar')) {
                    mceInit.wpautop = false;
                    mceInit.paste_as_text = true;
                    mceInit.force_p_newlines = false;
                    mceInit.force_br_newlines = true;
                    mceInit.forced_root_block = '';
                    mceInit.convert_newlines_to_brs = true;
                    mceInit.toolbar1 = 'forecolor,removeformat,undo,redo';

                }
                if (el?.$el[0]?.classList.contains('without-root-block')) {
                    mceInit.wpautop = false;
                    mceInit.paste_as_text = true;
                    mceInit.force_p_newlines = false;
                    mceInit.force_br_newlines = true;
                    mceInit.forced_root_block = '';
                    mceInit.convert_newlines_to_brs = true;

                }
                return mceInit;
            })
        }
    </script>
    <?php
});

/*
 * Custom logo
 */

add_filter( 'get_custom_logo', function ( $html ) {

    $html = str_replace( 'custom-logo-link', 'header_logo', $html );
    $html = str_replace( 'custom-logo', '', $html );

    return $html;
} );



add_action('acf/init', function () {
    remove_filter('acf_the_content', 'wpautop' );
});


add_filter('body_class', function ($classes) {
//    Tech page
    if (is_page_template('template-tech-page.blade.php')) {
        $classes[] = 'base';
    }
    //Blog page
    if (is_page_template('template-blog-page.blade.php')) {
        $classes[] = 'blogbody';
    }
    //Single article page template

    if (is_page_template('single-article.blade.php')) {
        $classes[] = 'article_base';
    }

    //Is 404 page
    if (is_404()) {
        $classes[] = 'error__page';
    }
    //History page
    if (is_page_template('template-history-page.blade.php')) {
        $classes[] = 'history';
    }
    return $classes;
});



/**
 * Register ACF Blocks.
 */
function theme_blocks_init()
{
    // Directory containing the blocks, within the 'resources/views' directory.
    $directory = resource_path('views') . '/blocks/';

    // Iterate over the directory provided and look for blocks.
    $block_directory = new DirectoryIterator($directory);

    foreach ($block_directory as $block) {
        if ($block->isDir() && !$block->isDot()) {
            register_block_type($block->getRealpath());
        }
    }
}
function blade_render_callback($block, string $content = '', bool $is_preview = false, int $post_id = 0)
{
    $slug                = str_replace( 'acf/', '', $block['name']);
    $block['slug']       = $slug;

    echo \Roots\view('blocks.' . $block['slug'] . '.' . $block['slug'], [ 'block' => $block ])->render();
}
add_action('init', __NAMESPACE__ . '\\theme_blocks_init');



add_action('init', function () {
    register_post_type('article',
        array(
            'labels'      => array(
                'name'          => 'Статьи',
                'singular_name' => 'Статья',
            ),
            'public'      => true,
            'has_archive' => true,
            //Gutenberg
            'show_in_rest' => true,
            'supports'    => array('title', 'editor', 'thumbnail' ),
        )
    );
    add_post_type_support( 'article', 'thumbnail' );
    add_theme_support( 'post-thumbnails', array( 'article' ));
});
add_filter('wpcf7_form_elements', function($content) {
    $content = preg_replace('/<(span).*?class="\s*(?:.*\s)?wpcf7-form-control-wrap(?:\s[^"]+)?\s*"[^\>]*>(.*)<\/\1>/i', '\2', $content);
    //Remove br tags
    $content = preg_replace('/<br[^>]*>/', '', $content);
    return $content;
});
add_filter( 'wpcf7_autop_or_not', '__return_false' );
