<header id="siteMainHeader">

	<div class="maxWidth">

		<div class="siteMainHeader__wrap">
		
			<a class="siteMainHeader__logo" href="<?= get_home_url() ?>">
				<img src="<?= IMAGES ?>/plot-for-wordpress.svg" alt="">
			</a>

			<div class="siteMainHeader__desktop-menu">
				
				<?php wp_nav_menu( array(  'menu' => 'Main Menu', 'menu_class' => 'mainMenu' ) ) ?>

				<?php if(plotShowMainTicketsButton()) : ?>

					<a href="<?= get_field('main_tickets_button_link','option') ?>" class="plotButton mainBuyTickets--desktop mainBuyTickets"><?= get_field('main_tickets_button_text','option') ?></a>

				<?php endif; ?>

			</div>

			<div class="siteMainHeader__cta">
				<a class="button siteMainHeader__ctaLink" href="<?= get_field('call_to_action_link', 'options') ?>">
					<?= get_field('call_to_action_text', 'options') ?>
				</a>
			</div>

			<button class="JS--menuTrigger menuToggle__container">

				<?php plotGetTemplatePart('parts/menu-toggle') ?>

			</button>


	    	<?php plotGetTemplatePart('parts/burger-menu') ?>

	    </div>

	</div>

</header>