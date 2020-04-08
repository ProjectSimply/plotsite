<section class="plotLayout carousel">

	<div class="maxWidth">

		<div class="carousel__intro">

            <?php if(get_sub_field('heading')) : ?>

                <h2 class="carousel__heading"><?= get_sub_field('heading') ?></h2>

            <?php endif ?>

            <?= get_sub_field('introduction') ?>

        </div>

    </div>

    <div class="JS--carousel">

	    <?php while(has_sub_field('slide')) : ?>

	    	<div class="carousel__slide JS--carousel__slideWrap">

				<?php if(get_sub_field('link_type') == 'segment') : ?>

					<a href="<?= get_sub_field('link_url') ?>" <?= get_sub_field('open_in_new_tab') ? 'target="_blank"' : '' ?>>

				<?php endif; ?>

					<div class="carousel__backgroundWrap" style="opacity: <?= get_sub_field('brightness') / 100 ?>">

						<?php if(get_sub_field('slide_type') == 'image') : ?>

							<?php plotLazyload([
								'image' 				=> get_sub_field('background_image'), 
								'imageSize'				=> 'banner', 
								'smallScreenImage' 		=> get_sub_field('small_screen_background_image'), 
								'smallScreenImageSize'	=> 'banner--small-screen',
								'class'					=> 'JS--lazyLoad carousel__image',
								'forCarousel'			=> true
							]); ?>

						<?php else : ?>

							<?php plotLazyload([
								'video' 				=> get_sub_field('background_video'), 
								'smallScreenVideo' 		=> get_sub_field('small_screen_background_video'),
								'class'					=> 'JS--lazyLoad carousel__video',
								'forCarousel'			=> true
							]); ?>


						<?php endif; ?>

					</div>

					<div class="carousel__contentWrap">

						<div class="maxWidth"> 

							<?php if(get_sub_field('title')) : ?>

								<h2 class="carousel__title"><?= get_sub_field('title') ?></h2>

							<?php endif; ?>

							<?php if(get_sub_field('content')) : ?>

								<?= get_sub_field('content') ?>

							<?php endif; ?>

							<?php if(get_sub_field('link_type') == 'button') : ?>

								<a <?= get_sub_field('open_in_new_tab') ? 'target="_blank"' : '' ?> href="<?= get_sub_field('link_url') ?>" class="plotButton"><?= get_sub_field('button_text') ?></a>

							<?php endif; ?>

							<?php if(get_sub_field('add_button') && get_sub_field('link_type') == 'segment') : ?>

								<span class="plotButton"><?= get_sub_field('button_text') ?></span>

							<?php endif; ?>	

						</div>

					</div>


				<?php if(get_sub_field('link_type') == 'segment') : ?>

					</a>

				<?php endif; ?>

			</div>

		<?php endwhile; ?>

	</div>


</section>