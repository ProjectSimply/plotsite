<?php	

	//Set a false flag for whether or not we can find a page template
    $exists = false;
        
	//First up, if we're a normal single page, let's go!
	if( is_page() || is_single() || is_front_page() ) { 

        //Intercept if we're hiding the site and push through to the selected holding page. 
        if((plotIsSiteHidden() || (plotIsSplashPageOn()  && is_front_page() )) &&
        !is_user_logged_in()) {
            $post = get_field('holding_page','option');
            setup_postdata( $post );
        }
        
        $slug = plotGetSlug(false); 

        if($slug == 'locations' || $slug == 'stages') {
            $slug = 'stages-or-locations';
        }

        $postType = plotPluralise(get_post_type());


        if($postType == 'stages') {
            $postType = 'stages-or-locations';
        }
        
        if(locate_template('templates/' . $postType . '/' . $slug . '.php')) {
                get_template_part('templates/' . $postType . '/' . $slug);
        } else {
                echo get_template_part('templates/' . $postType . '/' . 'default');
        }
      
    }
    elseif ( is_tax() || is_category() || is_tag() ) {

        //pump our category page back to the news page. It can use the same layout.
        if(is_category()) {
            
            $post = get_post(393);
            setup_postdata($post);
            get_template_part( 'templates/pages/news' );
        }

        if(is_tax()) {
            $post = get_post(904);
            setup_postdata($post);
            get_template_part( 'templates/pages/faqs' );
        }

    } else  {
 
        get_template_part('templates/pages/404');

    } 
          