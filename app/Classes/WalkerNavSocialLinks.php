<?php

namespace App\Classes;

use Walker_Nav_Menu;

class WalkerNavSocialLinks extends Walker_Nav_Menu
{


    /**
     * Filter used to remove built in WordPress-generated classes
     * @param mixed $var The array item to verify
     * @return boolean      Whether or not the item matches the filter
     */


    function filter_builtin_classes($var)
    {
        return (FALSE === strpos($var, 'item')) ? $var : '';
    }

    function start_lvl(&$output, $depth = 0, $args = [])
    {
        $output .= "<ul>";
    }

    function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0)
    {
        $class_names = $value = '';

        $unfiltered_classes = empty($item->classes) ? array() : (array)$item->classes;
        $classes = array_filter($unfiltered_classes, array($this, 'filter_builtin_classes'));
        $isCurrent = !!preg_grep("/^current/", $unfiltered_classes);

        if ($isCurrent) {
            $classes[] = !isset($args->item_active_class) ? 'active' : $args->item_active_class;
        }
        if (isset($args->item_class))
            $classes[] = $args->item_class;

        $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args));
        $class_names = $class_names ? ' class="' . esc_attr($class_names) . '"' : '';

        $id = apply_filters('nav_menu_item_id', 'menu-item-' . $item->ID, $item, $args);
        $id = $id ? ' id="' . esc_attr($id) . '"' : '';

//        Check if item_wrap is set(null is possible)
        if (property_exists($args, 'item_wrap')) {
            if (empty($args->item_wrap)) {
            } else {
                $output .= '<' . $args->item_wrap . $value . $class_names . '>';

            }
        } else {
            echo 'no item_wrap set';
            $output .= '<li' . $value . $class_names . '>';
        }


        $attrs = [];
        $attrs['title'] = !empty($item->attr_title) ? $item->attr_title : '';
        $attrs['target'] = !empty($item->target) ? $item->target : '';
        $attrs['rel'] = !empty($item->xfn) ? $item->xfn : '';
        $attrs['href'] = !empty($item->url) ? $item->url : '';
        $attrs['class'] = !empty($args->link_class) ? $args->link_class : '';

        if (isset($args->link_attr)) {
            foreach ($args->link_attr as $key => $value) {
                $attrs[$key] = sprintf($value, $item->title);
            }
        }

        if ($isCurrent && isset($args->link_active_class)) {
            $attrs['class'] .= ' ' . $args->link_active_class;
        }

        $attrs = apply_filters('nav_menu_link_attributes', $attrs, $item, $args);

        $attributes = '';
        foreach ($attrs as $attr => $value) {
            if (!empty($value)) {
                $value = ('href' === $attr) ? esc_url($value) : esc_attr($value);
                $attributes .= ' ' . $attr . '="' . $value . '"';
            }
        }
        $linkBefore = isset($args->link_before) ? sprintf($args->link_before, $item->title) : '';
        //Determine url of contact

        $icon = $this->getSocialPlatformIcon($item->url);
        $item_output = $args->before;
        $item_output .= '<a' . $attributes . '>';
        $item_output .= $linkBefore . $icon->toHtml() . $args->link_after;
        $item_output .= '</a>';
        $item_output .= $args->after;

        $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
    }

    function getSocialPlatformIcon($url)
    {

        return match (true) {
            str_contains($url, 'facebook') || str_contains($url, 'fb.com') => svg('fb'),
            str_contains($url, 'instagram') => svg('ig'),
            str_contains($url, 'linkedin') => svg('linkedin'),
            str_contains($url, 'mailto') => svg('mail'),
            default => svg('mail'),
        };
    }

    function end_el(&$output, $data_object, $depth = 0, $args = null)
    {
        if (property_exists($args, 'item_wrap')) {
            if (!empty($args->item_wrap)) $output .= "</{$args['item_wrap']}>";
        } else {
            $output .= "</ul>";
        }
    }
}
