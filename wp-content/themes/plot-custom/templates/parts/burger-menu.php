<section id="burgerMenu" class="JS--burgerMenu">

	<div class="burgerMenu__innerWrap">

		<?php wp_nav_menu( array(  'menu' => 'Main Menu', 'menu_class' => 'burgerMenu__list' ) ) ?>

		<div class="burgerMenu__cta">
			<a class="button burgerMenu__ctaLink" href="<?= get_field('call_to_action_link', 'options') ?>">
					<?= get_field('call_to_action_text', 'options') ?>
			</a>
		</div>

	</div>

	<div class="burgerMenu__part burgerMenu__part--1">
		<span class="burgerMenu__asset burgerMenu__asset--p">
			<?php plotGetTemplatePart('parts/svg-asset--p') ?>
		</span>
	</div>
	<div class="burgerMenu__part burgerMenu__part--2">
		<span class="burgerMenu__asset burgerMenu__asset--j">
			<?php plotGetTemplatePart('parts/svg-asset--j') ?>
		</span>
	</div>
	<div class="burgerMenu__part burgerMenu__part--3">
		<span class="burgerMenu__asset burgerMenu__asset--o">
			<?php plotGetTemplatePart('parts/svg-asset--o') ?>
		</span>
	</div>
	<div class="burgerMenu__part burgerMenu__part--4">
		<span class="burgerMenu__asset burgerMenu__asset--t">
			<?php plotGetTemplatePart('parts/svg-asset--t') ?>
		</span>
	</div>


</section>