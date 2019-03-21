<?php get_template_part('templates/parts/header') ?>


<div class='fourOhFour scrollItem'>
	<div class='row'>
		<div class='columns small-12'>			
            <h3>Sorry, the page you are looking for does not exist. This could be because of: </h3>
            <ul>
                <li><?php _e('a mistyped address', 'roots'); ?></li>
                <li><?php _e('an out-of-date link', 'roots'); ?></li>
            </ul>
            <p>Please use the navigation at the top of the page to continue your journey. Alternatively, visit our <a href="<?php bloginfo('url')?>">home page</a>.</p>		
        </div>
	</div>
</div>


<?php get_template_part('templates/parts/newsletter-module') ?>
<?php get_template_part('templates/parts/footer') ?>