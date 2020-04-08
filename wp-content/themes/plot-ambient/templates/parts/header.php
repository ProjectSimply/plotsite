<header id="siteMainHeader" <?= plotSetElementColors('header') ?>> 

	<div class="maxWidth">

		<div class="siteMainHeader__wrap">
		
			<a class="siteMainHeader__logo" href="/">

				<?php $mods = get_theme_mod('plot'); ?>

				<?php if($mods['headerLogo']) : ?>

					<img alt="<?= get_bloginfo('title') ?>" src="<?= $mods['headerLogo'] ?>" />

				<?php else : ?>

					<?= get_bloginfo('title') ?> 
					
				<?php endif; ?>
			</a>

			<?php if(get_bloginfo( 'description' )) : ?>

				<div class="siteMainHeader__description smallerFont">
					<?= bloginfo( 'description' ) ?>
				</div>

			<?php endif; ?>

			<div class="siteMainHeader__desktop-menu">
				
				<?php wp_nav_menu( array(  'menu' => 'Main Menu', 'menu_class' => 'mainMenu' ) ) ?>

			</div>

			<?php if(plotShowMainTicketsButton()) : ?>

				<div class="mainBuyTicketsWrap">
					<a <?= plotSetElementColors('buyTickets') ?>
					href="<?= get_field('main_tickets_button_link','option') ?>" class="plotButton mainBuyTickets--desktop mainBuyTickets"><?= get_field('main_tickets_button_text','option') ?></a>
				</div>
			<?php endif; ?>

			<div class="menuToggle__containerWrap">

				<div class="JS--menuTrigger menuToggle__container">

					<span></span>
					<span></span>
					<span></span>

				</div>

			</div>

	    </div>

	</div>

</header>