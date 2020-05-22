<?php plotGetTemplatePart('parts/banner') ?>

<?php plotGetTemplatePart('parts/subnavigation'); ?>

<div data-plot-smooth-scroll-frame class="artistsMain plotPage">

	<div class="maxWidth">

		<div class="artistsList">

			<?php if(get_field('allow_artist_type_filters')) : ?>

				<div class="artistTypes">

					<p>Artist Filters</p>

					<?php $artistTypes = get_terms( [
					    'taxonomy' 		=> 'artist-type',
					    'hide_empty' 	=> true
					] ); ?>

					<?php if($artistTypes) : ?>

						<button class="plotButton artistTypes__type JS--artistTypeButton" data-artist-type-id="0">All</button>

						<?php foreach($artistTypes as $artistType) : ?>

							<button class="plotButton artistTypes__type JS--artistTypeButton" data-artist-type-id="<?= $artistType->term_id ?>"><?= $artistType->name ?></button>

						<?php endforeach; ?>

					<?php endif; ?>

				</div>

			<?php endif; ?>

			<div class="JS--ajaxTargetArea artists__grid JS--artistGrid">

				<?= plotGetTemplatePart('parts/artist-listing') ?>

			</div>

			<button class="plotPagination plotPagination--artists plotPagination--artistsLoadMore JS--artistsLoadMore" data-next-page="2">Load More</button>

		</div>

	</div>

</div>
