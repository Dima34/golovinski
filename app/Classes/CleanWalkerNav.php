<?php

namespace App\Classes;

class CleanWalkerNav extends \Walker_Nav_Menu
{

    private $current_item_count = 0;
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

        $indent = str_repeat("\t", $depth);
        $output .= "\n$indent<ul>\n";
    }

    function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0)
    {
        $this->current_item_count++;
        $indent = ($depth) ? str_repeat("\t", $depth) : '';

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
                $output .= $indent;
            } else {
                $output .= $indent . '<' . $args->item_wrap . $value . $class_names . '>';

            }
        } else {
            echo 'no item_wrap set';
            $output .= $indent . '<li' . $value . $class_names . '>';
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
        //Check if link before is set and if its function call it and pass the item object
        $linkBefore = '';
        if (isset($args->link_before) && is_callable($args->link_before)) {
            $linkBefore = call_user_func($args->link_before, $item);
        }
        //Check if link before is set and if its string use it as a template
        if(isset($args->link_before) && is_string($args->link_before))
            $linkBefore = sprintf($args->link_before, $item->title, $this->current_item_count);

        $item_before = isset($args->item_before) ? $args->item_before : '';
        if(isset($args->item_before)&&is_callable($args->item_before)){
            $item_before = call_user_func($item_before, $item);
        }
        if(isset($args->item_before)&&is_string($args->item_before)){
            $item_before = sprintf($item_before, $item->title, $this->current_item_count);
        }
        $item_output = $args->before;
        $item_output .= $item_before;
        $item_output .= '<a' . $attributes . '>';
        $text = isset($args->hide_text) ? '' : apply_filters('the_title', $item->title, $item->ID);
        $iconURL = isset($args->icon) ? get_field('Icon', $item->ID) : null;
        $iconHtml = $iconURL ? '<img src="' . $iconURL . '" alt="" class="contacts__information_block-media-icon-img" />' : '';
        $item_output .= $iconHtml;
        $item_output .= $linkBefore . $text . $args->link_after;



        $item_output .= '</a>';
        $item_output .= $args->after;

        $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
    }

    function end_el(&$output, $data_object, $depth = 0, $args = null)
    {
        if (isset($args->item_spacing) && 'discard' === $args->item_spacing) {
            $t = '';
            $n = '';
        } else {
            $t = "\t";
            $n = "\n";
        }
        $indent = str_repeat($t, $depth);
        if (property_exists($args, 'item_wrap')) {
            if (empty($args->item_wrap)) {
                $output .= $indent . $n;
            } else {
                $output .= "$indent</{$args->item_wrap}>{$n}";
            }
        } else {
            $output .= "$indent</ul>{$n}";
        }
    }


}
