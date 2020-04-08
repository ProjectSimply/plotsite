<section id="burgerMenu" class="JS--burgerMenu" <?= plotSetElementColors('mobileMenu') ?>>

	<div class="JS--menuTrigger closeBurgerMenu">
		
		<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
			 viewBox="0 0 37 36" xml:space="preserve">

			<rect x="16.7" y="-5.5" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -7.1881 18.4038)" class="st0" width="3.7" height="46.8"/>
			<rect x="-4.8" y="16" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -7.1879 18.4038)" class="st0" width="46.8" height="3.7"/>
			
		</svg>


	</div>

	<?php wp_nav_menu( array(  'menu' => 'Main Menu', 'menu_class' => 'burgerMenu' ) ) ?>
	<?php wp_nav_menu( array(  'menu' => 'Secondary Navigation', 'menu_class' => 'secondaryNavigation' ) ) ?>

</section>