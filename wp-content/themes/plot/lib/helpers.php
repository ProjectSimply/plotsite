<?php

function is_child($pageID) {
    global $post;
    if( is_page() && ($post->post_parent==$pageID) )
        return true;
    else
        return false;
}

function get_slug($id=null) {
    if($id==null)
        $cID = $post->ID;
    else
        $cID = $id;

    $post_data = get_post($cID, ARRAY_A);
    $slug = $post_data['post_name'];
    return $slug; 
}

function ps_get_current_term() {
    $obj = get_queried_object();

    return $obj->name;
}

//Quick function to detect post type glamorously
function is_post_type($type){
    global $wp_query;
    if($type == get_post_type($wp_query->post->ID)) return true;
    return false;
}

/**
 * Pluralises a word if quantity is not one.
 *
 * @param string $singular Singular form of word
 * @param string $plural Plural form of word; function will attempt to deduce plural form from singular if not provided
 * @return string Pluralised word if quantity is not one, otherwise singular
 */
function pluralise($singular, $plural=null) {
    if(empty($singular)) return $singular;
    if($plural!==null) return $plural;

    $last_letter = strtolower($singular[strlen($singular)-1]);
    switch($last_letter) {
        case 'y':
            return substr($singular,0,-1).'ies';
        case 's':
            return $singular.'es';
        default:
            return $singular.'s';
    }
}

function ps_pagination($base_url = '') {

    global $wp_query;
    /** Stop execution if there's only 1 page */
    if( $wp_query->max_num_pages <= 1 )
        return;

    $paged      = get_query_var( 'paged' ) ? get_query_var( 'paged' ) : 1;
    $max        = intval( $wp_query->max_num_pages );

    if(!$base_url) :
        $base_url = get_permalink( $post_id );
    endif;

    if(is_tax() || is_category()) :

        $term = get_queried_object();
        $base_url = get_term_link( $term->name,$term->taxonomy);

    endif;

    if(is_date()) :

        $base_url = get_month_link(get_the_date('Y'),get_the_date('m'));

    endif;

    if(is_author()) :

        $authorObj = get_user_by('slug',$author);
        $base_url =  get_author_link(false,$authorObj->ID,$author);

    endif;

    /** Add current page to the array */
    if ( $paged >= 1 )
        $links[] = $paged;

    /** Add the pages around the current page to the array */
    if ( $paged >= 3 ) {
        $links[] = $paged - 1;
        $links[] = $paged - 2;
    }

    if ( ( $paged + 2 ) <= $max ) {
        $links[] = $paged + 2;
        $links[] = $paged + 1;
    }

    wp_reset_query();
    if(is_page() || is_single()) :
        $base_url = get_permalink( $post_id );
    endif;


    echo '<div class="navigation"><ul class="pagination">' . "\n";

    /** Link to first page, plus ellipses if necessary */
    if ( ! in_array( 1, $links ) ) {
        $class = 1 == $paged ? ' class="active"' : '';

        printf( '<li%s><a class="psAjax" href="%s">%s</a></li>' . "\n", $class, $base_url, '1' );

        if ( ! in_array( 2, $links ) )
            echo '<li>…</li>';
    }

    /** Link to current page, plus 2 pages in either direction if necessary */
    sort( $links );
    foreach ( (array) $links as $link ) {
        $class = $paged == $link ? ' class="current"' : '';
        printf( '<li%s><a class="psAjax" href="%s">%s</a></li>' . "\n", $class, $base_url . 'page/' . $paged, $link );
    }

    /** Link to last page, plus ellipses if necessary */
    if ( ! in_array( $max, $links ) ) {
        if ( ! in_array( $max - 1, $links ) )
            echo '<li>…</li>' . "\n";

        $class = $paged == $max ? ' class="active"' : '';
        printf( '<li%s><a class="psAjax" href="%s" %s data-paged="%s">%s</a></li>' . "\n", $class, $base_url . 'page/' . $max,$data_atts, $max, $max );
    }


    echo '</ul></div>' . "\n";

}


function menu_set_dropdown( $sorted_menu_items, $args ) {
    $last_top = 0;
    foreach ( $sorted_menu_items as $key => $obj ) {
        // it is a top lv item?
        if ( 0 == $obj->menu_item_parent ) {
            // set the key of the parent
            $last_top = $key;
        } else {
            $sorted_menu_items[$last_top]->classes['slide-across'] = 'has-dropdown';
        }
    }
    return $sorted_menu_items;
}
add_filter( 'wp_nav_menu_objects', 'menu_set_dropdown', 10, 2 );


class PS_Walker extends Walker_Nav_Menu
{

    function start_lvl(&$output, $depth = 0,$args = [])
    {
        $indent = str_repeat("\t", $depth);
        $output .= "\n$indent<ul class=\"dropdown\">\n";
    }
    function end_lvl(&$output, $depth = 0,$args = [])
    {
        $indent = str_repeat("\t", $depth);
        $output .= "$indent</ul>\n";
    }
    
    function start_el(&$output, $item, $depth = 0, $args = [], $id = 0)
    {
        global $wp_query;
        $indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';

        $class_names = $value = '';

        $classes = empty( $item->classes ) ? array() : (array) $item->classes;

        $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item ) );
        $class_names = ' class="'. esc_attr( $class_names ) . '"';

        $output .= $indent . '<li id="menu-item-'. $item->ID . '"' . $value . $class_names .'>';

        $attributes  = ! empty( $item->attr_title ) ? ' title="'     . esc_attr( $item->attr_title       ) .'"' : '';
        $attributes .= ! empty( $item->target )     ? ' target="'    . esc_attr( $item->target           ) .'"' : '';
        $attributes .= ! empty( $item->xfn )        ? ' rel="'       . esc_attr( $item->xfn              ) .'"' : '';
        $attributes .= ! empty( $item->url )        ? ' href="'      . esc_attr( $item->url              ) .'"' : '';

        $prepend = '';
        $append = '';

        if($depth != 0)
        {
        $description = $append = $prepend = "";
        }

        $transition = get_post_meta($item->ID,'ps_menu_item_transition',true);

        $item_output = $args->before;
        $item_output .= '<a class="psAjax" '. $attributes .'>';
        $item_output .= $args->link_before .$prepend.apply_filters( 'the_title', $item->title, $item->ID ).$append;
        $item_output .= $description.$args->link_after;
        $item_output .= '</a>';
        $item_output .= $args->after;

        $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );

    }

}


function ps_template_path() {
  return PS_Routing::$main_template;
}

class PS_Routing {

  // Stores the full path to the main template file
  static $main_template;

  // Stores the base name of the template file; e.g. 'page' for 'page.php' etc.
  static $base;

  static function wrap($template) {
    self::$main_template = $template;

    self::$base = substr(basename(self::$main_template), 0, -4);

    if (self::$base === 'index') {
      self::$base = false;
    }

    $templates = array('base.php');

    if (self::$base) {
      array_unshift($templates, sprintf('base-%s.php', self::$base ));
    }

    return locate_template($templates);
  }
}

add_filter('template_include', array('PS_Routing', 'wrap'), 99);


