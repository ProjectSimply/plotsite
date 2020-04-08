<?php if( have_rows('plot_layouts') ) : ?>
	     	
    <?php while ( have_rows('plot_layouts') ) : the_row(); ?>
                
        	<?php 
                    
        		include(locate_template('templates/plot-layouts/' . get_row_layout() . '.php'));

        	 ?>

    <?php endwhile; ?>

<?php endif; ?> 