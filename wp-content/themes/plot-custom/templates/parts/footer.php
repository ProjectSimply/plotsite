<footer class="footer" id="mainSiteFooter">

	<div class="maxWidth">

		<div class="footer__innerWrap">

			<div class="footer__item footer__item--1">

				<div class="footer__x">
					<?php plotGetTemplatePart('parts/cross-asset') ?>
				</div>

			</div>

			<div class="footer__menuWrap">

				<?php wp_nav_menu( array(  'menu' => 'Footer', 'menu_class' => 'footer__menu' ) ) ?>

			</div>

			<?php if(is_front_page()) : ?>

				<div class="footer__item footer__item--2">

					<div class="projectSimplyCredits">
					
						<span class="projectSimplyCredits__text">Plot is made by</span>
						<a class="projectSimplyCredits__link" href="https://projectsimply.com">Project Simply</a>
					
					</div>

				</div>

			<?php endif; ?>

		</div>

	</div>

</footer>
