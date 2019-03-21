<?php

$date_now = date('Y-m-d H:i:s');

$args = [
	'posts_per_page' => 1,
	 'meta_query' => array(
		array(
	        'key'		=> 'date_from',
	        'compare'	=> '<=',
	        'value'		=> $date_now,
	    ),
	     array(
	        'key'		=> 'date_to',
	        'compare'	=> '>=',
	        'value'		=> $date_now,
	    ),
	     array(
	        'key'		=> 'disabled',
	        'compare'	=> '!=',
	        'value'		=> 1,
	    )
    ),
	 'post_type' => 'notification'
];
$notification_query = new WP_Query( $args );

// The Loop
if ( $notification_query->have_posts() ) : $notification_query->the_post(); ?>


	<?php if(get_field('notification_type') == 'Banner') : ?>

		<div class="bannerNotification">

			<?php the_field('message'); ?>

		</div>

	<?php endif; ?>

	<?php if(get_field('notification_type') == 'Pop Up') : ?>

		<div class="JS--magicModal JS--magicModalNotification magicModal hidden" data-time="<?= the_field('time_until_popup_shows') ?>">
	
			<div class="magicModalInner">

				<?php if(get_field('image')) : ?>
					<img src="<?= get_field('image')['sizes']['half'] ?>" />
				<?php endif; ?>

				<h3><?= the_title(); ?></h3>

				<?php the_field('message'); ?>

				<?php if(get_field('show_button')) : ?>                
                    <a class="plotBorderButton plotBorderButton--blue" href="<?php the_field('url') ?>"><?php the_field('button_text') ?></a>
                <?php endif; ?>  

			</div>

		</div>


	<?php endif; ?>

	
<?php endif; ?>