<?php if(plotShowPartners()) : ?>

	<section data-plot-smooth-scroll-frame class="footer__partners plotLayout <?= get_field('plot_cms_partners_footer_color_scheme','option') == 'alternative' ? 'altColourScheme' : "" ?>">

		<div class="maxWidth">

			<?php if(get_field('partners_title','option')) : ?>

				<h3><?= get_field('partners_title','option') ?></h3>

			<?php endif; ?>

			<div class="partnersGrid">

				<?php $args = [
					'post_type' 		=> 'partner',
					'posts_per_page'	=> -1
				]; 

				$partnersQuery = new WP_Query($args);


				 while($partnersQuery->have_posts()) : $partnersQuery->the_post(); ?>

					<?php if(get_field('link')) : ?>
						<a class="plotHasHoverEffect partnersGrid__partner" href="<?= get_field('link') ?>" target="_blank">
					<?php else : ?>
						<div class="partnersGrid__partner">
					<?php endif; ?>


						<?php plotLazyload([
							'image' 				=> get_field('logo'), 
							'imageSize'				=> 'small',
							'class'					=> 'partnersGrid__partnerLogo',
							'alt'					=> get_the_title()
						]); ?>

					<?php if(get_field('link')) : ?>
						</a>
					<?php else : ?>
						</div>
					<?php endif; ?>

				<?php endwhile; ?>

			</div>

		</div>

	</section>

<?php endif; ?>