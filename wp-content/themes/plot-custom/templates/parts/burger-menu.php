<section id="burgerMenu" class="JS--burgerMenu">

	<div class="burgerMenu__innerWrap">

		<?php wp_nav_menu( array(  'menu' => 'Main Menu', 'menu_class' => 'burgerMenu__list' ) ) ?>

		<div class="burgerMenu__cta">
			<a class="button burgerMenu__ctaLink" href="<?= get_field('call_to_action_link', 'options') ?>">
					<?= get_field('call_to_action_text', 'options') ?>
			</a>
		</div>

	</div>

</section>