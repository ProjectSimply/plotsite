<header id="siteMainHeader">

	<div class="maxWidth">

		<div class="siteMainHeader__wrap">
		
			<a class="siteMainHeader__logo" href="/">
				LOGO
			</a>

			<div class="siteMainHeader__desktop-menu">
				
				<?php wp_nav_menu( array(  'menu' => 'Main Menu', 'menu_class' => 'mainMenu' ) ) ?>

				<?php if(plotShowMainTicketsButton()) : ?>

					<a href="<?= get_field('main_tickets_button_link','option') ?>" class="plotButton mainBuyTickets--desktop mainBuyTickets"><?= get_field('main_tickets_button_text','option') ?></a>

				<?php endif; ?>

			</div>

			<button class="JS--menuTrigger menuToggle__container">

				MENU

			</button>


	    	<?php plotGetTemplatePart('parts/burger-menu') ?>

	    </div>

	</div>

</header>