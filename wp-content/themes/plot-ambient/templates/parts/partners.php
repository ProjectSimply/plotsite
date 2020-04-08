<!-- <div class="footer__partners">

	<div class="maxWidth">

		<?php if(get_field('partners_title','option')) : ?>

			<h3><?= get_field('partners_title','option') ?></h3>

		<?php endif; ?>

		<div class="partnersGrid">

			<?php while(has_sub_field('partners','option')) : ?>

				<?php if(get_sub_field('link')) : ?>
					<a href="<?= get_sub_field('link') ?>" target="_blank">
				<?php else : ?>
					<div class="partnersGrid__partner">
				<?php endif; ?>


					<?php plotLazyload([
						'image' 				=> get_sub_field('logo'), 
						'imageSize'				=> 'small',
						'class'					=> 'partnersGrid__partnerLogo',
						'alt'					=> get_sub_field('title')
					]); ?>

				<?php if(get_sub_field('link')) : ?>
					</a>
				<?php else : ?>
					</div>
				<?php endif; ?>

			<?php endwhile; ?>

		</div>

	</div>

</div> -->