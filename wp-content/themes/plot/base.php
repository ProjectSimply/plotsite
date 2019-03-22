<?php get_template_part('templates/parts/head'); ?>


<body <?php psBodyClass() ?>>	

    <?php if(canShowSite()) : ?>

        <?php get_template_part('templates/parts/notifications'); ?> 	
	<?php endif; ?>

	<div class="siteWrap">
		<?php if(have_posts()) :
				while(have_posts()) : the_post();
					include ps_template_path();
                endwhile;
                wp_reset_query();
			else :
				include ps_template_path();
			endif; 
		?>
  	</div>


    <?php get_template_part('templates/parts/edit-me-button'); ?>

    <div class="JS--closeMagicModal siteOverlay"></div>


    <script>
        var temp_dir    = "<?php echo get_template_directory_uri(); ?>";
        var au          = "<?php echo admin_url( 'admin-ajax.php' ); ?>";
    </script> 


	<?php if(strpos($_SERVER[HTTP_HOST],'test') !== false)  : ?>
        <script src="<?php echo get_template_directory_uri(); ?>/assets/js/main.js?v=1"></script>
    <?php else : ?>
        <script src="<?php echo get_template_directory_uri(); ?>/assets/js/main.js?v=1"></script>
    <?php endif; ?>
 

    <script>Main.init();</script>


    <?php wp_footer(); ?>
    

    <?php if(strpos($_SERVER[HTTP_HOST],'test') !== false)  : ?>
        <?php //LIVERELOAD 
        $domain = ! empty($_SERVER['HTTP_HOST']) ? strtolower($_SERVER['HTTP_HOST']) : 'cli';
        if (strpos($domain, 'test') !== false || $domain == 'cli') : ?>
            <script>
            document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
            ':35729/livereload.js?snipver=1"></' + 'script>')
            </script>
        <?php endif ?>
    <?php endif ?>


	
</body>

</html>
