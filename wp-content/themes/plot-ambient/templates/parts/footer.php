<?php if(plotShowPartners()) : 
	plotGetTemplatePart('parts/partners');
endif; ?>

<footer id="mainSiteFooter" class="smallerFont mainSiteFooter--<?= get_field('plotcms_footer_style','option') ?>" <?= plotSetElementColors('footer') ?>>

	<div class="maxWidth">

		<div class="footerGrid">

			<div class="footer__detailsWrap">

				<a class="footer__logo" href="/">

					<?php if(get_field('footer_logo','options')) : ?>

						<?php plotLazyload([
		                    'image'                 => get_field('footer_logo','options'), 
		                    'imageSize'             => 'medium'
		                ]); ?>

					<?php else : ?>

						<?php $mods = get_theme_mod('plot'); ?>

						<?php if($mods['headerLogo']) : ?>

							<img alt="<?= get_bloginfo('title') ?>" src="<?= $mods['headerLogo'] ?>" />

						<?php else : ?>

							<?= get_bloginfo('title') ?> 
							
						<?php endif; ?>

					<?php endif; ?>

				</a>

				<?php if(get_bloginfo( 'description' )) : ?>

					<div class="footer__description">
						<?= bloginfo( 'description' ) ?>
					</div>

				<?php endif; ?>

				<?php if(get_field('include_a_message_in_the_footer','option')) : ?>

					<div class="footer__message">
						<?= get_field('footer_message','option') ?>
					</div>

				<?php endif; ?>

			</div>

			<div class="footer__menuWrap">

				<?php if(get_field('include_footer_navigation','option')) : ?>

					<?php wp_nav_menu( array(  'menu' => 'Footer', 'menu_class' => 'footer__menu' ) ) ?>

				<?php endif; ?>

			</div>

			<div class="footer__contactWrap">

				<?php if(get_field('footer_include_newsletter_signup','option')) : ?>

			        <div class="footer__newsletterSignup <?= get_field('plotcms_footer_form_style','option') == 'alternative' ? 'altFormColourScheme' : ''; ?>">

			            <?php if(get_field('footer_newsletter_text','option')) : ?>

			                <p class="newsletterSignup__heading"><?= get_field('footer_newsletter_text','option') ?></p>

			            <?php endif ?>

			            <?= do_shortcode('[wpforms id=381]'); ?>

			        </div>

			    <?php endif; ?>

				<?= plotGetTemplatePart('parts/social-links') ?>

			</div>

		</div>

	</div>

</footer>

<div class="postFooter smallerFont" <?= plotSetElementColors('postFooter') ?>>

	<div class="maxWidth">

		<div class="postFooterGrid">

			<?php wp_nav_menu( array(  'menu' => 'Legals', 'menu_class' => 'footer__legalMenu' ) ) ?>

			<div class="plotCredits">

				Built with <a href="https://plotcms.com" alt="Plot CMS for music festivals">Plot for Festivals</a>

			</div>

		</div>

	</div>

</div>