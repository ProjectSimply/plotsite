<?php plotGetTemplatePart('parts/partners'); ?>

<footer data-plot-smooth-scroll-frame id="mainSiteFooter">

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