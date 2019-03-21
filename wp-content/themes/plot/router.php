<?php	

	//Set a false flag for whether or not we can find a page template
    $exists = false;

    if(canShowSite()) {
        
    	//First up, if we're a normal single page, let's go!
    	if( is_page() || is_single() || is_front_page() ) { 
            
            $slug = get_slug(false); 
            
            if(get_field('site_status','option') == 'splash' && !isset($_GET['show_home']) && is_front_page()) {

                $holdingPage = get_field('holding_page','option'); 
                get_template_part('templates/page/content', $holdingPage->post_name);

            } else {
               get_template_part('templates/' . get_post_type() . '/content', $slug);
            }
          
        }
        elseif ( is_tax() || is_category() || is_tag() ) {

            $term = get_queried_object();

            get_template_part( 'templates/archives/content', $term->taxonomy );

        }
        elseif (is_search()) {

            get_template_part('templates/search/results');

        }
        elseif (is_date()) {

            get_template_part('templates/archives/date');

        }
        elseif (is_author()) {

            get_template_part('templates/archives/author');

        } else  {
     
            get_template_part('templates/page/404');

        } 

    } else {
      
        $holdingPage = get_field('holding_page','option'); 
        get_template_part('templates/page/content', $holdingPage->post_name);
    }       
          