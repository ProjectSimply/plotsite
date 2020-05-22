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

function plotNormalisePerformanceData($data) {
    if(isset($data['id']))
        return $data['id'];

    if(isset($data['performance']))
        return $data['performance']->ID;

    return false;
}

function plotFlushRedirectRules() {

    if((bool)get_option( 'plotFlushRedirectFlag' )){
      flush_rewrite_rules(); 
      update_option( 'plotFlushRedirectFlag', 'true');
    }
  
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
        'opacity'               => 1,  //Opacity of the image or video
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

    ?>

    <div class="plotLazyLoadFrame"> 

        <?php if($options['image']) : ?>

            <img style="opacity: <?= $options['opacity']; ?>" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 <?= $options['image']['sizes'][$options['imageSize'] . '-width'] ?> <?= $options['image']['sizes'][$options['imageSize'] . '-height'] ?>'%3E%3C/svg%3E"
                data-src="<?= $options['image']['sizes'][$options['imageSize']] ?>"
                <?php if($options['smallScreenImage']) : ?>

                    data-small-src="<?= $options['smallScreenImage']['sizes'][$options['smallScreenImageSize']] ?>"

                <?php endif; ?>

                class="<?= $options['forCarousel'] ? 'JS--lazyLoadForCarousel' : 'JS--lazyLoad' ?> <?= $options['class'] ?>" 
                alt="<?= $options['alt'] ?>"
                <?= $options['id'] ? 'id="'.$options['id'].'"' : '' ?>
            />

        <?php else :  ?>

            <video style="opacity: <?= $options['opacity']; ?>" 
                data-src="<?= $options['video'] ?>"

                <?php if($options['smallScreenVideo']) : ?>

                    data-small-src="<?= $options['smallScreenVideo'] ?>"

                <?php endif; ?>

                class="<?= $options['forCarousel'] ? 'JS--lazyLoadForCarousel' : 'JS--lazyLoad' ?> <?= $options['class'] ?>"
                autoplay muted loop playsinline
                >
            </video>

        <?php endif; ?>


    </div> <?php 

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
    global $posts, $post, $wp_did_header, $wp_query, $wp_rewrite, $wpdb, $wp_version, $wp, $id, $comment, $user_ID;
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

function plotPerformanceTime($performance) {

    if(isset($performance['startDateTime']) && isset($performance['duration'])) :

        $startDateTime = $performance['startDateTime'];

        $return =  $startDateTime->format('H:i') . '- ';
        $startDateTime->add(new DateInterval('PT' . $performance['duration'] . 'M'));
        $return .= $startDateTime->format('H:i');

        return $return;

    endif;

    if($performance) : 

        $startTime  = DateTime::createFromFormat('g:i a', get_field('start_time',$performance));
        $endTime    = DateTime::createFromFormat('g:i a', get_field('end_time',$performance));

        if($startTime && $endTime)

            return $startTime->format('g:i') . '- ' . $endTime->format('g:ia'); 

    endif; 

    return false;
}

function plotShowArticleDates() {

    return get_field('show_article_dates','option');

}

function plotShowArticleAuthor() {

    return get_field('show_article_authors','option');

}

function plotHasPerformancePages() {

    return get_field('performance_pages','option');
}

function plotHasStagePages() {

    return get_field('stage_pages','option');
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

function plotMakePerformanceTitle($performanceId, $linkType = 'artist') {
    if(!$performanceId)
        return false;

    if($linkType != 'performance' || !plotHasPerformancePages())
        $linkType = 'artist';

    if($linkType == 'performance') :
        $return = '<a target="_blank" href="' . get_permalink($performanceId) . '">'; 
    else :
        $return = '';
    endif;

    if(get_field('title',$performanceId) == 'custom') :
        $return .= get_field('custom_title',$performanceId);  
    else :
   

        $i = 0;

        $max = sizeof(get_field('artists',$performanceId));

        while(has_sub_field('artists',$performanceId)) :

            $artist = get_sub_field('artist');

            if($linkType == 'performance') :

                $return .= $artist->post_title . ' ';

            else :

                if(get_field('artist_links','option') == 'off') :

                    $return .= '<a target="_blank" href="' . get_permalink($artist->ID) . '">' . $artist->post_title . '</a>'; 

                else :

                    $return .= '<span 
                                data-plot-modal
                                data-plot-modal-class="plotModal--artist--' . get_field('artist_links','option') . '"
                                data-plot-modal-template-part="parts/artist-biog"
                                data-plot-modal-data-artist-id="' . $artist->ID . '"
                                data-plot-modal-group="scheduleArtists"
                                data-plot-modal-type="ajax">' . $artist->post_title . '</span>';

                endif;

            endif;

            if($i + 2 == $max) {
                $return .= ' & ';
            } elseif($i + 1 == $max) {
                $return .= '';
            } else {
                $return .= ', ';
            }

            $i++;

        endwhile;

    endif;

    if($linkType == 'performance') :

        $return .= '</a>';

    endif; 

    return $return;

    
}

function plotGetArtistsMetaFromPerformances($metaCompare = ">=") {

    $now = new DateTime('NOW');
    
    $args = [
        'post_type'         => 'performance',
        'orderby'           => 'meta_value',
        'meta_key'          => '',
        'order'             => 'asc',
        'posts_per_page'    => -1,
        'meta_query'        => [
            [
                'key'       => 'plot_performance_datetime',
                'value'     => $now->format('YmdHis'),
                'compare'   => $metaCompare
            ]
        ]
    ];

    $performanceQuery = new WP_Query($args);

    $terms = [];

    while($performanceQuery->have_posts()) : $performanceQuery->the_post(); 

        while(has_sub_field('artists')) :

            $artistTypes = get_the_terms(get_sub_field('artist')->ID,'artist-type');

            if($artistTypes)
                foreach($artistTypes as $artistType) :
                    if(!in_array($artistType->name, $terms))
                        $terms[$artistType->term_id] = $artistType->name;

                endforeach;

        endwhile;

    endwhile;

    wp_reset_query();

    return ['terms'=>$terms];

}


function plotGetArtistsMeta() {

    $args = [
        'post_type'         => 'artist',
        'orderby'           => 'title',
        'order'             => 'asc',
        'posts_per_page'    => -1,
        'meta_query'        => [
            'relation' => 'OR',
            [
                'key'       => 'archive',
                'compare'   => 'NOT EXISTS'
            ],
            [
                'key'       => 'archive',
                'value'     => 1,
                'compare' => '!='
            ]
        ]
    ];

    $yearQuery = new WP_Query($args);

    $terms = [];

    while($yearQuery->have_posts()) : $yearQuery->the_post(); 

        $artistTypes = get_the_terms(get_the_ID(),'artist-type');

        if($artistTypes)
            foreach($artistTypes as $artistType) :
                if(!in_array($artistType->name, $terms))
                    $terms[$artistType->term_id] = $artistType->name;

            endforeach;

    endwhile;

    wp_reset_query();

    return ['terms'=>$terms];

}

function plotGetArchiveArtistsMeta() {

    $args = [
        'post_type'         => 'artist',
        'orderby'           => 'title',
        'order'             => 'asc',
        'posts_per_page'    => -1,
        'meta_query'        => [
            [
                'key'       => 'archive',
                'value'     => 1
            ]
        ]
    ];

    $yearQuery = new WP_Query($args);

    $years = [];
    $terms = [];

    while($yearQuery->have_posts()) : $yearQuery->the_post(); 

        if(!in_array(get_field('archive_year'), $years))
            $years[] = get_field('archive_year');

        $artistTypes = get_the_terms(get_the_ID(),'artist-type');

        if($artistTypes)
            foreach($artistTypes as $artistType) :
                if(!in_array($artistType->name, $terms))
                    $terms[$artistType->term_id] = $artistType->name;

            endforeach;

    endwhile;

    wp_reset_query();

    return ['years' => $years,'terms'=>$terms];

}

function plotGetPerformanceDays($options = []) {

    $defaults = [
        'futureOnly' => true
    ];
    $settings = [];

    foreach($defaults as $key => $default) :

        if(isset($options[$key])) :
            $settings[$key] = $options[$key];
        else :
            $settings[$key] = $defaults[$key];
        endif;

    endforeach;

    $args = [
        'post_type'         => 'performance',
        'posts_per_page'    => -1
    ];

    if($settings['futureOnly'] == true) :
        
        $now = new DateTime('NOW');

        $args['meta_query'] = [
            [
                'key'       => 'plot_performance_datetime',
                'value'     => $now->format('YmdHis'),
                'compare'   => '>='
            ]
        ];

    endif;

    $performanceQuery = new WP_Query($args);
    $displayFormat = get_field('display_performance_dates','option');
    if(!$displayFormat) 
        $displayFormat = 'l';

    $days = [];

    while($performanceQuery->have_posts()) : $performanceQuery->the_post(); 

        $date       = get_field('day');
        $dateObject = DateTime::createFromFormat('d/m/Y',$date);

        $startTime  = DateTime::createFromFormat('g:i a', get_field('start_time'));
        $endTime    = DateTime::createFromFormat('g:i a', get_field('end_time'));

        $dayEnd     = get_field('day_end','option');
        $startHour  = $startTime->format('g');

        if($dayEnd > $startHour) {
           $dateObject->modify('-1 day');
        }

        $date = $dateObject->format('Ymd');
        if(!$date || !$startTime || !$endTime)
            continue;

        if(empty($days[$date]))
            $days[$date] = $dateObject->format($displayFormat);


    endwhile;

    ksort($days);

    wp_reset_query();

    return $days;

}

function plotFormatDate($date) {
   $dateObject = DateTime::createFromFormat('d/m/Y',$date);
   $displayFormat = get_field('display_performance_dates','option');
   if($dateObject)  
       return $dateObject->format($displayFormat); 
}

function plotGeneratePerformancesMetaQuery($day) {

    $dayEnd = get_field('day_end','option');
    $dayEnd = DateTime::createFromFormat('H',$dayEnd);
    $dayEnd = $dayEnd->format('H:i:s');

    $dayObj = DateTime::createFromFormat('Ymd',$day);
    if(!$dayObj)
        return false;

    $tomorrow = $dayObj->modify('1 day');
    $tomorrow = $tomorrow->format('Ymd');

    return [
            'relation' => 'OR',
            [
                [
                    'key'     => 'day',
                    'value'   => $day
                ],
                [
                    'key'     => 'start_time',
                    'value'   => $dayEnd,
                    'compare' => '>='
                ]
            ],
            [
                [
                    'key'     => 'day',
                    'value'   => $tomorrow
                ],
                [
                    'key'     => 'start_time',
                    'value'   => $dayEnd,
                    'compare' => '<'
                ]
            ]
        ];

}


function plotGenerateSchedule() {

    $schedule = [];

    $args = [
        'post_type'         => 'performance',
        'posts_per_page'    => -1
    ];

    $performanceQuery = new WP_Query($args);
    $displayFormat = get_field('display_performance_dates','option');
    if(!$displayFormat) 
        $displayFormat = 'l';

    while($performanceQuery->have_posts()) : $performanceQuery->the_post(); 

        $date       = get_field('day');
        $dateObject = DateTime::createFromFormat('d/m/Y',$date);

        $startTime  = DateTime::createFromFormat('g:i a', get_field('start_time'));
        $endTime    = DateTime::createFromFormat('g:i a', get_field('end_time'));

        $dayEnd     = get_field('day_end','option');
        $startHour  = $startTime->format('g');

        if($dayEnd > $startHour) {
           $dateObject->modify('-1 day');
           $startTime->modify('+1 day');
           $endTime->modify('+1 day');
        }

        $dateText = $dateObject->format($displayFormat);
        $date = $dateObject->format('d/m/Y');

        $dateYmd    = $dateObject->format('Ymd');

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
                                    'dateYmd'       => $dateYmd
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
                'order'        => $stage->menu_order,
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

    foreach($schedule as &$day) :

        uasort($day['stages'], function($a, $b) {
            return $a['order'] <=> $b['order'];
        });

    endforeach;

    wp_reset_query();

    return $schedule;

}

function plotGetNotifications() {

    $date_now = date('Y-m-d H:i:s');
    $currentID = get_the_ID();

    $args = [
        'posts_per_page' => -1,
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
            ]
        ]
    ];

    $notificationQuery = new WP_Query( $args );

    if ( $notificationQuery->have_posts() ) : 

        while($notificationQuery->have_posts()) :

            $notificationQuery->the_post(); 

            if((get_field('display_options') == 'exclude' && !in_array($currentID, get_field('exclude_these_pages'))) ||
                (get_field('display_options') == 'include') && in_array($currentID, get_field('which_pages'))) {

                if(get_field('notification_type') == 'Banner') :

                    plotGetTemplatePart('notifications/banner');

                endif;

                if(get_field('notification_type') == 'Pop Up') :

                    plotGetTemplatePart('notifications/popup');

                endif;

                break;

            }

        endwhile;

    endif;

    wp_reset_query();
    
}

function plotShowPartners() {

    wp_reset_query();

    $displayPartners = get_field('display_partners_options','option');

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