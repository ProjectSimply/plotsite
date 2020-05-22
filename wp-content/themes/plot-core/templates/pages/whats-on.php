<?php plotGetTemplatePart('parts/banner') ?>

<div data-plot-smooth-scroll-frame class="whatsOnMain plotPage">

	<div class="maxWidth">

		<div class="whatsOnList">

			<button class="plotButton artistFiltersButton">

				Filters

			</button>

			<div class="artistFilters">

				<?php if(get_field('allow_filters')) : ?>				

					<?php $artistTypes = plotGetArtistsMetaFromPerformances() ?>

					<?php if($artistTypes) : ?>

						<div class="artistTypes">

							<p>Filter by</p>

							<?php $filter = isset($_GET['artist-type']) ?  $_GET['artist-type'] : 'all'; ?>
							<?php $day = isset($_GET['artist-day']) ?  $_GET['artist-day'] : 'all'; ?>

							<div class="plotPossibleDropdown">

								<div class="plotPossibleDropdown__selector">Please pick...</div>

								<div class="plotPossibleDropdown__dropdown">

									<div class="plotPossibleDropdown__item JS--artistTypeButton <?= $filter == 'all' ? 'hidden' : '' ?>" data-artist-type-id="all"><?= get_field('all_categories_button_text') ?></div>

									<?php foreach($artistTypes['terms'] as $id => $name) : ?>

										<div class="plotPossibleDropdown__item JS--artistTypeButton <?= $filter == $id ? 'hidden' : '' ?>" data-artist-type-id="<?= $id ?>"><?= $name ?></div>

									<?php endforeach; ?>

								</div>

								<div class="plotPossibleDropdown--buttons">

									<button class="plotPossibleDropdownVisibleItems plotButton--alt plotButton artistTypes__type JS--artistTypeButton <?= $filter == 'all' ? 'selected' : '' ?>" data-artist-type-id="all"><?= get_field('all_categories_button_text') ?></button>
		
									<?php foreach($artistTypes['terms'] as $id => $name) : ?>

										<button class="plotPossibleDropdownVisibleItems plotButton--alt plotButton artistTypes__type JS--artistTypeButton <?= $filter == $id ? 'selected' : '' ?>" data-artist-type-id="<?= $id ?>"><?= $name ?></button>

									<?php endforeach; ?>

								</div>

							</div>

						</div>

					<?php endif; ?>

				<?php endif; ?>

				<?php if(get_field('allow_day_filters')) : ?>

					<?php $days = plotGetPerformanceDays();  ?>

					<?php if(sizeof($days) > 1) : ?>

						<div class="artistDays">

							<p>By day</p>

							<?php if(get_field('date_picker_type','option') == 'select') : ?>

								<div class="plotPossibleDropdown">

									<div class="plotPossibleDropdown__selector">Please pick...</div>

									<div class="plotPossibleDropdown__dropdown">

										<div class="plotPossibleDropdown__item JS--artistDayButton <?= $day == 'all' ? 'hidden' : '' ?>" data-artist-date="all">All Days</div>

										<?php foreach($days as $date => $day) : ?>

											<div class="plotPossibleDropdown__item JS--artistDayButton <?= $day == $date ? 'hidden' : '' ?>" data-artist-date="<?= $date ?>"><?= $day ?></div>

										<?php endforeach; ?>

									</div>
									<div class="plotPossibleDropdown--buttons">

										<button class="plotPossibleDropdownVisibleItems plotButton--alt plotButton artistTypes__type JS--artistDayButton" data-artist-date="all">All Days</button>

										<?php foreach($days as $date => $day) : ?>

											<button class="plotPossibleDropdownVisibleItems plotButton--alt plotButton artistTypes__type JS--artistDayButton" data-artist-date="<?= $date ?>"><?= $day ?></button>

										<?php endforeach; ?>

									</div>

								</div>

							<?php else : ?>

								<div class="calendarPickerWrap">

									<?php foreach($days as $date => $day) : ?>

										<div class="calendarPickerDate" data-date="<?= $date ?>"></div>

									<?php endforeach ?>

									<input value="Please pick..." data-date-format="<?= get_field('display_performance_dates','option') ?>" class="JS--artistCalendarPicker calendarPicker" />

								</div>


							<?php endif; ?>

						</div>

					<?php endif; ?>

				<?php endif; ?>

			</div>

			<?php 
				$excludePosts = []; 
				
				$featuredPerformanceCount = sizeof(get_field('featured_performances'));

			 	if(get_field('featured_performances')) : ?>

				<div class="whatsOn__featuredPerformances blockLinksGrid blockLinksGrid--<?= $featuredPerformanceCount ?>">

					<?php $featuredPosts = get_field('featured_performances');

					foreach($featuredPosts as $featuredPost) : 

						$post = $featuredPost['performance'];

						setup_postdata($post); 

						$excludePosts[] = get_the_ID();

						plotGetTemplatePart('parts/performance-listing-item',['fullWidth'=> $featuredPerformanceCount < 2]);

						wp_reset_query();

					endforeach; ?>

				</div>

			<?php endif; ?>

			<div class="JS--ajaxTargetArea whatsOnArea JS--whatsOnArea blockLinksGrid blockLinksGrid--<?= get_field('desktop_rows') ?>">

				<?= plotGetTemplatePart('parts/performance-listing',['exclude' => $excludePosts]) ?>

			</div>

			<div class="buttonWrap centered">

				<button class="plotButton plotPagination plotPagination--whatsOn plotPagination--whatsOnLoadMore JS--whatsOnLoadMore" data-next-page="2">Load More</button>

			</div>

		</div>

	</div>

</div>
