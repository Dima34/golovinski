<?php
// Custom WordPress adjustments

// Initialization hooks
add_action('init', 'customWpInitializations');
add_action('after_setup_theme', 'afterThemeSetup', 999);
add_action('wp_enqueue_scripts', 'removeStyles', 999);
add_action('admin_menu', 'removeAdminMenuItems');
add_action('admin_bar_menu', 'customizeAdminToolbar', 999);
add_action('wp_dashboard_setup', 'removeDashboardWidgets');

// RSS-related hooks
//add_action('do_feed', 'disableFeed', 1);
//add_action('do_feed_rdf', 'disableFeed', 1);
//add_action('do_feed_rss', 'disableFeed', 1);
//add_action('do_feed_rss2', 'disableFeed', 1);
//add_action('do_feed_atom', 'disableFeed', 1);
//add_action('do_feed_rss2_comments', 'disableFeed', 1);
//add_action('do_feed_atom_comments', 'disableFeed', 1);
//remove_action('wp_head', 'feed_links_extra', 3);
//remove_action('wp_head', 'feed_links', 2);

// Remove oEmbed links
remove_action('wp_head', 'wp_oembed_add_discovery_links');

// Initialization function to remove various features
function customWpInitializations()
{
//    remove_post_type_support('page', 'editor'); // Remove visual editor from pages
    remove_action('wp_head', 'rest_output_link_wp_head', 10); // Remove Rest API link tag
    remove_action('wp_head', 'rsd_link'); // Remove RSD link
    remove_action('wp_head', 'wp_generator'); // Remove generator meta tag
    removeEmojis(); // Remove emojis
}

// Remove emojis
function removeEmojis()
{
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('admin_print_styles', 'print_emoji_styles');
    remove_filter('the_content_feed', 'wp_staticize_emoji');
    remove_filter('comment_text_rss', 'wp_staticize_emoji');
    remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
    add_filter('tiny_mce_plugins', 'disableEmojisTinymce');
    add_filter('wp_resource_hints', 'disableEmojisRemoveDnsPrefetch', 10, 2);
}

function disableEmojisTinymce($plugins)
{
    return is_array($plugins) ? array_diff($plugins, array('wpemoji')) : array();
}

function disableEmojisRemoveDnsPrefetch($urls, $relation_type)
{
    if ('dns-prefetch' === $relation_type) {
        $emoji_svg_url = apply_filters('emoji_svg_url', 'https://s.w.org/images/core/emoji/2/svg/');
        $urls = array_diff($urls, array($emoji_svg_url));
    }
    return $urls;
}

//add_filter('admin_head', 'example_restrict_code_editor');
//
//function example_restrict_code_editor($settings)
//{
//    echo '<style type="text/css">
//            #editor > div.edit-post-layout.is-mode-visual.is-sidebar-opened.has-metaboxes.interface-interface-skeleton.has-footer > div.interface-interface-skeleton__editor > div.interface-interface-skeleton__body > div.interface-navigable-region.interface-interface-skeleton__content > div.edit-post-visual-editor.has-inline-canvas > div > div.editor-styles-wrapper.block-editor-writing-flow > div.is-root-container.is-desktop-preview.is-layout-flow.wp-block-post-content.block-editor-block-list__layout {
//            display: none;
//            }
//            .edit-post-meta-boxes-area .postbox>.inside {
//    padding: 0 24px 24px !important;
//}
//         </style>';
//
////    Dequeue the block editor styles
//    wp_dequeue_style('wp-block-library');
//    wp_dequeue_style('wp-block-library-theme');
//    return $settings;
//}

// Remove admin bar for non-admin users
function afterThemeSetup(): void
{
    if (!is_admin()) show_admin_bar(false); // Hide admin bar for non-administrative interface page
    /**
     * Disable full-site editing support.
     *
     * @link https://wptavern.com/gutenberg-10-5-embeds-pdfs-adds-verse-block-color-options-and-introduces-new-patterns
     */
    remove_theme_support('block-templates');

    /**
     * Disable the default block patterns.
     *
     * @link https://developer.wordpress.org/block-editor/developers/themes/theme-support/#disabling-the-default-block-patterns
     */
    remove_theme_support('core-block-patterns');

    /**
     * Disable the Automatic Feed Links feature.
     *
     * @link https://codex.wordpress.org/Automatic_Feed_Links
     */
    remove_theme_support('automatic-feed-links');

}

// Remove default styles
function removeStyles()
{
    wp_dequeue_style('classic-theme-styles'); // Classic Editor
    wp_dequeue_style('global-styles'); // WordPress
    wp_dequeue_style('wp-block-library'); // Gutenberg
    wp_deregister_style('smart-grid'); // Smart Grid
    wp_deregister_style('cf7-grid-layout'); // Contact Form 7
    wp_deregister_style('contact-form-7'); // Contact Form 7
    wp_deregister_style('redux-extendify-styles'); // Redux Framework
}

// Remove unnecessary admin menu items
function removeAdminMenuItems()
{
    remove_menu_page('edit.php?post_type=wp_block'); // Patterns
    // remove_menu_page('index.php'); // Dashboard
    // remove_menu_page('upload.php'); // Media
//    remove_menu_page( 'index.php' );                  //Dashboard
//    remove_menu_page( 'jetpack' );                    //Jetpack*
    remove_menu_page('edit.php');                   //Posts
//    remove_menu_page( 'upload.php' );                 //Media
//    remove_menu_page( 'edit.php?post_type=page' );    //Pages
    remove_menu_page('edit-comments.php');          //Comments
//    remove_menu_page( 'themes.php' );                 //Appearance
//    remove_menu_page( 'plugins.php' );                //Plugins
//    remove_menu_page( 'users.php' );                  //Users
//    remove_menu_page( 'tools.php' );                  //Tools
//    remove_menu_page( 'options-general.php' );        //Settings
}

// Customize admin toolbar
function customizeAdminToolbar($menu)
{
    // Uncomment to remove other toolbar items
    // $menu->remove_node('archive'); // Archive
    // $menu->remove_node('comments'); // Comments
    // $menu->remove_node('customize'); // Customize
    // $menu->remove_node('dashboard'); // Dashboard
    // $menu->remove_node('edit'); // Edit
    // $menu->remove_node('menus'); // Menus
    // $menu->remove_node('new-content'); // New Content
    // $menu->remove_node('search'); // Search
    // $menu->remove_node('site-name'); // Site Name
    // $menu->remove_node('themes'); // Themes
    // $menu->remove_node('updates'); // Updates
    // $menu->remove_node('view-site'); // Visit Site
    // $menu->remove_node('view'); // View
    // $menu->remove_node('widgets'); // Widgets
    // $menu->remove_node('wp-logo'); // WordPress Logo
}

// Remove unnecessary dashboard widgets
function removeDashboardWidgets()
{
    remove_meta_box('dashboard_activity', 'dashboard', 'normal'); // Activity
    remove_meta_box('dashboard_site_health', 'dashboard', 'normal'); // Site Health Status
    remove_meta_box('dashboard_primary', 'dashboard', 'side'); // WordPress Events and News
    remove_meta_box('dashboard_quick_press', 'dashboard', 'side'); // Quick Draft
    // remove_meta_box('dashboard_right_now', 'dashboard', 'normal'); // At a Glance
}

// Disable RSS feeds
function disableFeed()
{
    wp_die(__('No feed available, please visit the <a href="' . esc_url(home_url('/')) . '">homepage</a>!'));
}


/*
*
 * Remove comments
 *
*/
add_action('admin_init', function () {
// Redirect any user trying to access comments page
    global $pagenow;

    if ($pagenow === 'edit-comments.php') {
        wp_safe_redirect(admin_url());
        exit;
    }

// Remove comments metabox from dashboard
    remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal');

// Disable support for comments and trackbacks in post types
    foreach (get_post_types() as $post_type) {
        if (post_type_supports($post_type, 'comments')) {
            remove_post_type_support($post_type, 'comments');
            remove_post_type_support($post_type, 'trackbacks');
        }
    }
});

// Close comments on the front-end
add_filter('comments_open', '__return_false', 20, 2);
add_filter('pings_open', '__return_false', 20, 2);

// Hide existing comments
add_filter('comments_array', '__return_empty_array', 10, 2);

// Remove comments page in menu
add_action('admin_menu', function () {
    remove_menu_page('edit-comments.php');
});

// Remove comments links from admin bar
add_action('init', function () {
    if (is_admin_bar_showing()) {
        remove_action('admin_bar_menu', 'wp_admin_bar_comments_menu', 60);
    }
});
