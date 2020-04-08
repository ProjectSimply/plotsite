<footer id="mainSiteFooter">

	<?php if(plotShowPartners()) : ?>

		<div class="footer__partners">

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

		</div>

	<?php endif; ?>

	<div class="maxWidth">

		<div class="footer__menuWrap">

			<?php wp_nav_menu( array(  'menu' => 'Footer', 'menu_class' => 'footer__menu' ) ) ?>

		</div>

		<?= plotGetTemplatePart('parts/social-links') ?>

		<div class="footer__text">

			<?php if(get_field('footer_text','option')) : ?>

				<?= get_field('footer_text','option') ?>

			<?php endif; ?>
			
		</div>

		<?php if(is_front_page()) : ?>

			<div class="projectSimplyCredits">

				Built with Plot and <3 by <a href="https://projectsimply.com">Project Simply</a>

			</div>

		<?php endif; ?>

	</div>

</footer>

<?php if(plotShowMainTicketsButton()) : ?>

	<a href="<?= get_field('main_tickets_button_link','option') ?>" class="plotButton mainBuyTickets--footer mainBuyTickets"><?= get_field('main_tickets_button_text','option') ?></a>

<?php endif; ?>