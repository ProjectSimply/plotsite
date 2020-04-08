<?php

//This file includes a load of lovely helper functions
//that might come in handy during a project

// Define helper constants
define('IMAGES', get_stylesheet_directory_uri() . '/assets/img'); 

function plotGetSlug($id=null) {
    global $post;

    if($id==null)
        $cID = $post->ID;
    else
        $cID = $id;

    $post_data = get_post($cID, ARRAY_A);
    $slug = $post_data['post_name'];
    return $slug; 
}

/**
 * Pluralises a word if quantity is not one.
 *
 * @param string $singular Singular form of word
 * @param string $plural Plural form of word; function will attempt to deduce plural form from singular if not provided
 * @return string Pluralised word if quantity is not one, otherwise singular
 */
function plotPluralise($singular, $plural=null) {
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


function allowArtistSubfieldSearchInPerformances( $where ) {
    $where = str_replace("meta_key = 'artists_$", "meta_key LIKE 'artists_%", $where);
    return $where;
}
add_filter('posts_where', 'allowArtistSubfieldSearchInPerformances');


/**
* Returns true if we are not hiding the site (i.e. splash page or live site) or we're an
* admin or editor user (so we can edit and view pages that are hidden from public)
*   @return  Boolean 
**/
function plotCanShowSite(){
    return get_field('site_status','option') != 'hidden' || current_user_can('editor') || current_user_can('administrator');    
}

//A handy function for outputting lazy load images or videos with screen size options
function plotLazyload($args) {

    //Defaults
    $defaults = [
        'image'                 => '', //The large screen image (shown for screen sizes over 640px wide)
        'imageSize'             => '', //The name of the resized image size generated in WP (from config.php)
        'smallScreenImage'      => '', //Optional small screen image
        'smallScreenImageSize'  => '', //The name of the resized small screen image size generated in WP (from config.php)
        'video'                 => '', //The video field
        'smallScreenVideo'      => '', //The small screen video field
        'class'                 => '', //optional classnames. Will always have the JS--lazyload class added
        'id'                    => '', // Optional HTML ID for this element
        'alt'                   => '', //Optional alt tag if you want'image'
        'forCarousel'           => false //We use a different lazyLoad class for carousels so we can load them on reveal of carousel
                                         //item instead of when they're in view.
    ];

    $options = [];

    foreach($defaults as $option => $value) :

        if(isset($args[$option])) :
            $options[$option] = $args[$option];
        else :
            $options[$option] = $value;
        endif;

    endforeach;

    if(!$options['image'] && !$options['video']) :
        return;
    endif;

  

    //Check if the smallscreenimagesize has been set. If not, set it to be the desktop one
    if(!$options['smallScreenImageSize']) {
        $options['smallScreenImageSize'] = $options['imageSize'];
    }



    if($options['image']) : ?>

        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 <?= $options['image']['sizes'][$options['imageSize'] . '-width'] ?> <?= $options['image']['sizes'][$options['imageSize'] . '-height'] ?>'%3E%3C/svg%3E"
            data-src="<?= $options['image']['sizes'][$options['imageSize']] ?>"
            <?php if($options['smallScreenImage']) : ?>

                data-small-src="<?= $options['smallScreenImage']['sizes'][$options['smallScreenImageSize']] ?>"

            <?php endif; ?>

            class="<?= $options['forCarousel'] ? 'JS--lazyLoadForCarousel' : 'JS--lazyLoad' ?> <?= $options['class'] ?>" 
            alt="<?= $options['alt'] ?>"
            <?= $options['id'] ? 'id="'.$options['id'].'"' : '' ?>
        />

    <?php else : ?>

        <video 
            data-src="<?= $options['video'] ?>"

            <?php if($options['smallScreenVideo']) : ?>

                data-small-src="<?= $options['smallScreenVideo'] ?>"

            <?php endif; ?>

            class="<?= $options['forCarousel'] ? 'JS--lazyLoadForCarousel' : 'JS--lazyLoad' ?> <?= $options['class'] ?>"
            autoplay muted loop playsinline
            >
        </video>

    <?php endif;

}

/**
    Here we simplify and place upon our body some
    helpful HTML classes. Also checking
    to see if we have a holding page up
**/
function plotBodyClass(){
    
    global $post;

    $bodyClass = '';

    if($post) {

        $bodyClass .= get_post_type() . '-' . $post->post_name;
    
    }

    body_class($bodyClass);
}


function plotTemplatePath() {
  return PlotRouting::$main_template;
}


function plotLoadTemplatePartFromAjax() {

    if(!isset($_POST['templatePart'])) {
        echo json_encode(['success' => false, 'error' => 'Template part not found. Make sure to pass one through, the location within the templates directory, for example \'parts/ajax-content\'']);
        exit;
    }

    $plotData = [];

    if(isset($_POST['data'])) {
        $plotData = $_POST['data'];
    }

    $plotData['return'] = true;

    $htmlToReturn = plotGetTemplatePart($_POST['templatePart'],$plotData);

    // set success to true and send back the html as JSON
    echo json_encode(['success' => true, 'html' => $htmlToReturn]);
    exit;

}

function plotGetTemplatePart( $file, $plotData = array(), $cache_args = array() ) {
    $plotData = wp_parse_args( $plotData );
    $cache_args = wp_parse_args( $cache_args );
    if ( $cache_args ) {
        foreach ( $plotData as $key => $value ) {
            if ( is_scalar( $value ) || is_array( $value ) ) {
                $cache_args[$key] = $value;
            } else if ( is_object( $value ) && method_exists( $value, 'get_id' ) ) {
                $cache_args[$key] = call_user_method( 'get_id', $value );
            }
        }
        if ( ( $cache = wp_cache_get( $file, serialize( $cache_args ) ) ) !== false ) {
            if ( ! empty( $plotData['return'] ) )
                return $cache;
            echo $cache;
            return;
        }
    }
    $file_handle = $file;

    if ( file_exists( get_stylesheet_directory() . '/templates/' . $file . '.php' ) )
        $file = get_stylesheet_directory() . '/templates/' . $file . '.php';
    elseif ( file_exists( get_template_directory() . '/templates/' . $file . '.php' ) )
        $file = get_template_directory() . '/templates/' . $file . '.php';
    ob_start();
    $return = require( $file );
    $data = ob_get_clean();

    if ( $cache_args ) {
        wp_cache_set( $file, $data, serialize( $cache_args ), 3600 );
    }
    if ( ! empty( $plotData['return'] ) )
        if ( $return === false )
            return false;
        else
            return $data;
    echo $data;
}

class PlotRouting {

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

add_filter('template_include', array('PlotRouting', 'wrap'), 99);

function plotIsSiteHidden() {

  return get_field('site_status','option') == 'hidden';

}

function plotIsSplashPageOn() {

    return get_field('site_status','option') == 'splash' && !isset($_GET['sh']);

}

function plotGetPerformanceImage($performanceId) {

    if(!$performanceId)
        return false;

    if(get_field('listing_image',$performanceId) == 'custom' && get_field('image',$performanceId))
        return get_field('image',$performanceId);  

    $artists = get_field('artists',$performanceId);

    if(get_field('artists',$performanceId)) :

        if(get_field('featured_image',$artists[0]['artist']))
            return get_field('featured_image',$artists[0]['artist']->ID);

    endif;

    return false;
}

function plotMakePerformanceTitle($performanceId) {
    if(!$performanceId)
        return false;

    if(get_field('custom_title',$performanceId))
        return get_field('custom_title',$performanceId);  

    $return = ''; 

    $i = 0;

    $max = sizeof(get_field('artists',$performanceId));

    while(has_sub_field('artists',$performanceId)) :

        $artist = get_sub_field('artist');

        $return .= '<span 
                        data-plot-modal
                        data-plot-modal-class="plotModal--artist"
                        data-plot-modal-template-part="parts/artist-biog"
                        data-plot-modal-data-artist-id="' . $artist->ID . '"
                        data-plot-modal-group="scheduleArtists"
                        data-plot-modal-type="ajax">' . $artist->post_title . '</span>';

        if($i + 2 == $max) {
            $return .= ' & ';
        } elseif($i + 1 == $max) {
            $return .= '';
        } else {
            $return .= ', ';
        }

        $i++;

    endwhile;

    return $return;

    
}


function plotGenerateSchedule() {

    $schedule = [];

    $args = [
        'post_type'         => 'performance',
        'posts_per_page'    => -1
    ];

    $performanceQuery = new WP_Query($args);

    while($performanceQuery->have_posts()) : $performanceQuery->the_post(); 

        $date       = get_field('performance_day')['value'];

        $dateText    = get_field('performance_day')['label'];
        $startTime  = DateTime::createFromFormat('g:i a', get_field('start_time'));
        $endTime    = DateTime::createFromFormat('g:i a', get_field('end_time'));
        $dateYmd    = DateTime::createFromFormat('d/m/Y', get_field('performance_day')['value']);

        if(!$date || !$startTime || !$endTime)
            continue;

        $timeDifference = $endTime->diff($startTime);

        $minutes = ($timeDifference->days * 24 * 60) +
           ($timeDifference->h * 60) + $timeDifference->i;

        $stage = get_field('stage');

        $performanceInfo = [ 
                    'id'                => get_the_ID(),
                    'customTitle'       => get_field('title') != 'custom' ? '' : get_field('custom_title'),
                    'startDateTime'     => $startTime,
                    'duration'          => $minutes
                ];

        if(!isset($schedule[$date])) :

            $schedule[$date] = [    'stages'        => [], 
                                    'earliestTime'  => clone $startTime, 
                                    'latestTime'    => clone $endTime,
                                    'dateText'      => $dateText,
                                    'dateYmd'       => $dateYmd->format('Ymd')
                                ];

        else :

            if($startTime < $schedule[$date]['earliestTime']) {
                $schedule[$date]['earliestTime'] = clone $startTime; 
            } 

            if($endTime > $schedule[$date]['latestTime']) {
                $schedule[$date]['latestTime'] = clone $endTime;
            }
                      
        endif;

        if(!isset($schedule[$date]['stages'][$stage->ID])) :

            $schedule[$date]['stages'][$stage->ID] = [
                'stageName'    => $stage->post_title,
                'performances' => []
            ];
        
        endif;

        $schedule[$date]['stages'][$stage->ID]['performances'][] = $performanceInfo;
            
    endwhile;

    foreach($schedule as $date => &$day) :

            $dayLength = $day['earliestTime']->diff($day['latestTime']);
            $schedule[$date]['dayLength'] = $dayLength->h*60 + $dayLength->i;

            foreach($day['stages'] as &$stage) :

                foreach($stage['performances'] as &$performance) :

                    $startTimeOffset = $day['earliestTime']->diff($performance['startDateTime']);

                    $startTimeOffsetInMinutes = $startTimeOffset->h*60 + $startTimeOffset->i;

                    $performance['startTimeOffsetPercentage'] =  $startTimeOffsetInMinutes /  $schedule[$date]['dayLength'] * 100;

                    $performance['percentageDuration'] = $performance['duration'] / $schedule[$date]['dayLength'] * 100;

                endforeach;

            endforeach;

    endforeach;

    uasort($schedule, function($a, $b) {
        return $a['dateYmd'] <=> $b['dateYmd'];
    });

    wp_reset_query();

    return $schedule;

}

function plotGetNotifications() {

    $date_now = date('Y-m-d H:i:s');

    $args = [
        'posts_per_page' => 1,
        'post_type'      => 'notification',
        'meta_query'     => [
            [  
                'relation' => 'OR',
                [ 
                    'relation' => 'AND',
                    [
                        'key'       => 'date_from',
                        'compare'   => '<=',
                        'value'     => $date_now,
                    ],
                    [
                        'key'       => 'date_to',
                        'compare'   => '>=',
                        'value'     => $date_now,
                    ],
                ],
                [
                    'key'       => 'show_notification_within_a_specific_time_frame',
                    'value'     => '1',
                    'compare'   => '!='
                ],
            ],
            [
                'key'       => 'disabled',
                'compare'   => '!=',
                'value'     => 1,
            ],
            [
                'relation' => 'OR',
                [
                    'relation' => 'AND',
                    [
                        'key'       => 'which_pages', 
                        'value'     => '"' . get_the_ID() . '"', 
                        'compare'   => 'LIKE'
                    ],
                    [
                        'key'       => 'display_options', 
                        'value'     => 'include', 
                    ]
                ],
                [
                    'relation' => 'AND',
                    [
                        'key'       => 'exclude_these_pages', 
                        'value'     => '"' . get_the_ID() . '"', 
                        'compare'   => 'NOT LIKE'
                    ],
                    [
                        'key'       => 'display_options', 
                        'value'     => 'exclude', 
                    ]
                ],

            ],
        ]
    ];


    $notificationQuery = new WP_Query( $args );

    if ( $notificationQuery->have_posts() ) : $notificationQuery->the_post(); 

        if(get_field('notification_type') == 'Banner') :

            plotGetTemplatePart('notifications/banner');

        endif;

        if(get_field('notification_type') == 'Pop Up') :

            plotGetTemplatePart('notifications/popup');

        endif;

    endif;

    wp_reset_query();
    
}

function plotShowPartners() {

    wp_reset_query();

    $displayPartners = get_field('display_partners','option');

    if($displayPartners) : 

        if($displayPartners == 'exclude') : 

            $pagesToHide = get_field('pages_to_hide_partners','option');

            if($pagesToHide) :

                return !in_array(get_the_ID(), $pagesToHide);

            else :

                return true;

            endif;

        endif;

        if($displayPartners == 'include') :

            $pagesToShow = get_field('pages_to_show_partners','option');

            if($pagesToShow) :

                return in_array(get_the_ID(), $pagesToShow);

            else :

                return true;

            endif;


        endif;

    endif;

    return false;


}

function plotShowMainTicketsButton() {

    wp_reset_query();


    if(plotIsSiteHidden() || (plotIsSplashPageOn()  && (is_front_page() || get_post_type() == 'holding-page' ) ) )
        return false;

    if(!get_field('show_main_tickets_button','option'))
        return false;

    
    $pagesToHide = get_field('exclude_main_tickets_button','option');

    if($pagesToHide) :

        return !in_array(get_the_ID(), $pagesToHide);

    else :

        return true;

    endif;

    return false;

}

function plotTimeElapsed($datetime, $full = false) {
    $now = new DateTime;
    $ago = new DateTime($datetime);
    $diff = $now->diff($ago);

    $diff->w = floor($diff->d / 7);
    $diff->d -= $diff->w * 7;

    $string = array(
        'y' => 'year',
        'm' => 'month',
        'w' => 'week',
        'd' => 'day',
        'h' => 'hour',
        'i' => 'minute',
        's' => 'second',
    );
    foreach ($string as $k => &$v) {
        if ($diff->$k) {
            $v = $diff->$k . ' ' . $v . ($diff->$k > 1 ? 's' : '');
        } else {
            unset($string[$k]);
        }
    }

    if (!$full) $string = array_slice($string, 0, 1);
    return $string ? implode(', ', $string) . ' ago' : 'just now';
}

// /**
//  * Check if post is in a menu
//  *
//  * @param $menu menu name, id, or slug
//  * @param $object_id int post object id of page
//  * @return bool true if object is in menu
//  */
function checkPostIsInMenu( $menu = null, $object_id = null ) {
    
    // get menu object
    $menu_object = wp_get_nav_menu_items( esc_attr( $menu ) );

    // stop if there isn't a menu
    if( ! $menu_object )
        return false;
    
    // stop if there is less than 2 menu items
    if(count($menu_object) < 2) {
        return false;
    }

    // get the object_id field out of the menu object
    $menu_items = wp_list_pluck( $menu_object, 'object_id' );

    // use the current post if object_id is not specified
    if( !$object_id ) {
        global $post;
        $object_id = get_queried_object_id();
    }

    // test if the specified page is in the menu or not. return true or false.
    return in_array( (int) $object_id, $menu_items );

}