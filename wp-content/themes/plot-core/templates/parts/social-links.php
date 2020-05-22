<?php if(!empty($plotData['socialLinks'])) : ?>

	<div class="sitewideSocialLinks">

		<?php 

			$socials = [
				'twitter' 		=> 'TW',
				'facebook' 		=> 'FB',
				'soundcloud' 	=> 'SC',
				'spotify' 		=> 'SF',
				'youtube' 		=> 'YT',
				'bandcamp' 		=> 'BC',
				'instagram' 	=> 'IG'

			];

		?>

		<?php foreach($plotData['socialLinks'] as $socialLink) : ?>

			<?php if($socialLink['social_network']) : ?>

				<div class="socialLinkWrap">


					<a class="socialLink" target="_blank" href="<?= $socialLink['link'] ?>"><?php plotGetTemplatePart('parts/social-media/' . $socialLink['social_network']['value']) ?>
						<span class="socialLink__text"><?= $socials[$socialLink['social_network']['value']]; ?></span>
					</a>

					<span class="socialLink__sep">/ </span>

				</div>

			<?php endif; ?>

		<?php endforeach; ?>

	</div>

<?php endif; ?>