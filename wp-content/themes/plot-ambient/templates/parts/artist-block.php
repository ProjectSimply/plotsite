<div class="artistBlock blockLink">

	<a class="plotHasHoverEffect" href="<?= get_permalink() ?>"

		<?php if(get_field('artist_biog_modals',409) != 'off') : ?>
			data-plot-modal 
			data-plot-modal-type="ajax"
			data-plot-modal-template-part="parts/artist-biog"
			data-plot-modal-group="artistListings"
			data-plot-modal-class="plotModal--artist--<?= get_field('artist_biog_modals',409) ?>"
			data-plot-modal-data-artist-id="<?= get_the_ID() ?>"

		<?php endif; ?>

		>

		<div class="blockLinkImageFrame artistBlock__imageWrap">

			<?php plotLazyload([
						'image' 				=> get_field('featured_image'), 
						'imageSize'				=> 'blockLink', 
						'class'					=> 'artistBlock__image'
					]);  ?>

		</div>

		<h5 class="artistBlock__title"><?= get_the_title() ?></h5>
	</a>

	<?php if(get_field('allow_artist_type_filters',409)) : ?>

		<?php $artistTypes = get_the_terms(get_the_ID(),'artist-type'); ?>

		<?php if($artistTypes) : ?>

			<div class="artistTypesForArtist">

				<?php foreach($artistTypes as $artistType) :  ?>

					<a href="<?= get_permalink(409) ?>?artist-type=<?= $artistType->term_id ?>" class="plotButton artistBlock__type" data-artist-type-id="<?= $artistType->term_id ?>"><?= $artistType->name ?></a>

				<?php endforeach; ?>

			</div>

		<?php endif; ?>

	<?php endif; ?>

</div>