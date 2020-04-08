<?php plotGetTemplatePart('parts/header') ?>

<?php plotGetTemplatePart('parts/banner') ?>

<div class="artistsMain">

	<?php if(checkPostIsInMenu('Lineup Pages')) : ?>

		<?php plotGetTemplatePart('parts/lineup-submenu'); ?>

	<?php endif; ?>

	<div class="maxWidth">

		<div class="artistsList">

			<button class="plotButton artistFiltersButton">

				Filters

			</button>

			<div class="artistFilters">

				<?php if(get_field('allow_artist_type_filters')) : ?>				

					<?php $artistTypes = get_terms( [
					    'taxonomy' 		=> 'artist-type',
					    'hide_empty' 	=> true
					] ); ?>

					<?php if($artistTypes) : ?>

						<div class="artistTypes">

							<p>Filter by</p>

							<?php $filter = isset($_GET['artist-type']) ?  $_GET['artist-type'] : 'all'; ?>
							<?php $day = isset($_GET['artist-day']) ?  $_GET['artist-day'] : 'all'; ?>

							<div class="plotPossibleDropdown">

								<div class="plotPossibleDropdown__selector"></div>

								<div class="plotPossibleDropdown__dropdown">

									<div class="plotPossibleDropdown__item JS--artistTypeButton <?= $filter == 'all' ? 'hidden' : '' ?>" data-artist-type-id="all">All</div>

									<?php foreach($artistTypes as $artistType) : ?>

										<div class="plotPossibleDropdown__item JS--artistTypeButton <?= $filter == $artistType->term_id ? 'hidden' : '' ?>" data-artist-type-id="<?= $artistType->term_id ?>"><?= $artistType->name ?></div>

									<?php endforeach; ?>

								</div>

								<div class="plotPossibleDropdown--buttons">

									<button class="plotPossibleDropdownVisibleItems plotButton--alt plotButton artistTypes__type JS--artistTypeButton" data-artist-type-id="all">All</button>

									<?php foreach($artistTypes as $artistType) : ?>

										<button class=" plotPossibleDropdownVisibleItems plotButton--alt plotButton artistTypes__type JS--artistTypeButton" data-artist-type-id="<?= $artistType->term_id ?>"><?= $artistType->name ?></button>

									<?php endforeach; ?>

								</div>

							</div>

						</div>

					<?php endif; ?>

				<?php endif; ?>

				<?php if(get_field('allow_day_filters')) : ?>

					<?php $schedule = plotGenerateSchedule(); ?>

					<?php if(sizeof($schedule) > 1) : ?>

						<div class="artistDays">

							<p>By day</p>

							<div class="plotPossibleDropdown">

								<div class="plotPossibleDropdown__selector"></div>

								<div class="plotPossibleDropdown__dropdown">

									<div class="plotPossibleDropdown__item JS--artistDayButton <?= $day == 'all' ? 'hidden' : '' ?>" data-artist-date="all">All Days</div>

									<?php foreach($schedule as $date => $stages) : ?>

										<div class="plotPossibleDropdown__item JS--artistDayButton <?= $filter == $date ? 'hidden' : '' ?>" data-artist-date="<?= $date ?>"><?= $stages['dateText'] ?></div>

									<?php endforeach; ?>

								</div>
								<div class="plotPossibleDropdown--buttons">

									<button class="plotPossibleDropdownVisibleItems plotButton--alt plotButton artistTypes__type JS--artistDayButton" data-artist-date="all">All Days</button>

									<?php foreach($schedule as $date => $stages) : ?>


										<button class="plotPossibleDropdownVisibleItems plotButton--alt plotButton artistTypes__type JS--artistDayButton" data-artist-date="<?= $date ?>"><?= $stages['dateText'] ?></button>

									<?php endforeach; ?>

								</div>

							</div>

						</div>

					<?php endif; ?>

				<?php endif; ?>

			</div>

			<div class="JS--ajaxTargetArea artists__grid JS--artistGrid col-<?= get_field('desktop_rows') ?>">

				<?= plotGetTemplatePart('parts/artist-listing') ?>

			</div>

			<div class="buttonWrap centered">

	    	  <button class="plotButton plotPagination plotPagination--artists plotPagination--artistsLoadMore JS--artistsLoadMore" data-next-page="<?= isset($_GET['pge']) ? (int)$_GET['pge'] + 1 : 2 ?>">Load More</button>

            </div>


		</div>

	</div>

</div>

<?php plotGetTemplatePart('parts/footer') ?>
