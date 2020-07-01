<footer class="footer" id="mainSiteFooter" data-plot-smooth-scroll-element>

	<div class="footer__cta">

		<div class="footer__demo growIn">

			<div class="emoji growIn">
				🪐
			</div>
			
			<div class="footer__textWrap growIn">

				<?= get_field('book_a_demo_text' ,'option') ?>

				<div class="growIn">
					<a class="button button--X" target="_blank" href="https://app.hubspot.com/meetings/michael1309">Book a Demo</a>
				</div>

			</div>

		</div>

		<div class="footer__email growIn">

			<div class="emoji growIn">
				📬
			</div>

			<div class="footer__textWrap growIn">

				<?= get_field('email_us' ,'option') ?>

				<div class="growIn">
				
					<a class="button button--X" href="/enquire">Submit Enquiry</a>

				</div>

			</div>

		</div>

	</div>

	<div class="footer__nav">

		<div class="maxWidth">

			<div class="footer__innerWrap">

				<div class="footer__item footer__item--1">

					<div class="projectSimplyCredits">
						
						<span class="projectSimplyCredits__text">Plot is made by</span>
						<a class="projectSimplyCredits__link" href="https://projectsimply.com">Project Simply</a>
					
					</div>

				</div>

				<div class="footer__menuWrap">

					<?php wp_nav_menu( array(  'menu' => 'Footer', 'menu_class' => 'footer__menu' ) ) ?>

				</div>

				<div class="footer__item footer__item--2">


				</div>

			</div>

		</div>

	</div>

</footer>
