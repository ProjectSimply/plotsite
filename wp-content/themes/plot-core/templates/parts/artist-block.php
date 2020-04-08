<div class="artistBlock">

	<div 
		data-plot-modal 
		data-plot-modal-class="artistModal"
		data-plot-modal-type="ajax"
		data-plot-modal-template-part="parts/artist-biog"
		data-plot-modal-group="artistListings"
		data-plot-modal-data-artist-id="<?= get_the_ID() ?>">

		<?php plotLazyload([
					'image' 				=> get_field('featured_image'), 
					'imageSize'				=> 'blockLink', 
					'class'					=> 'artistBlock__image'
				]);  ?>

		<h3 class="artistBlock__title"><?= get_the_title() ?></h3>
	</div>

	<?php if(get_field('allow_artist_type_filters',409)) : ?>

		<?php $artistTypes = get_the_terms(get_the_ID(),'artist-type'); ?>

		<?php if($artistTypes) : ?>

			<div class="artistTypesForArtist">

				<?php foreach($artistTypes as $artistType) :  ?>

					<button class="plotButton artistBlock__type JS--artistTypeButton" data-artist-type-id="<?= $artistType->term_id ?>"><?= $artistType->name ?></button>

				<?php endforeach; ?>

			</div>

		<?php endif; ?>

	<?php endif; ?>

</div>