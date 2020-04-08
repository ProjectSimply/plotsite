<?php if(get_field('instagram_link','option') || get_field('twitter_link','option') || get_field('facebook_link','option')) : ?>

	<div class="sitewideSocialLinks">

		<?php if(get_field('instagram_link','option')) : ?>

			<a target="_blank" href="<?= get_field('instagram_link','option') ?>">INSTAGRAM</a>

		<?php endif; ?>


		<?php if(get_field('twitter_link','option')) : ?>

			<a target="_blank" href="<?= get_field('twitter_link','option') ?>">TWITTER</a>

		<?php endif; ?>


		<?php if(get_field('facebook_link','option')) : ?>

			<a target="_blank" href="<?= get_field('facebook_link','option') ?>">FACEBOOK</a>

		<?php endif; ?>

	</div>

<?php endif; ?>
