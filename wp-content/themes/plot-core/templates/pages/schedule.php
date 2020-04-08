<?php plotGetTemplatePart('parts/header') ?>

<?php plotGetTemplatePart('parts/banner') ?>

<?php $currentId = get_the_ID(); ?>

<?php $schedule = plotGenerateSchedule();  ?>

<?php if(checkPostIsInMenu('Lineup Pages')) : ?>

	<?php plotGetTemplatePart('parts/lineup-submenu'); ?>

<?php endif; ?>

<div class="schedule">

	<div class="scheduleDayPicker">

		<?php $i = 0; ?>

		<?php foreach($schedule as $date => $stages) : ?>

			<?php $i++; ?>

			<button class="<?= $i == 1 ? 'selected' : '' ?> scheduleDayPicker__button plotButton JS--scheduleDayPickerButton" data-schedule-day="<?= $date ?>">
				
				<?= $stages['dateText'] ?>

			</button>

		<?php endforeach; ?>

	</div>

	<?php $i = 0; ?>

	<?php foreach($schedule as $date => $day) : ?>

		<?php $i++; ?>

		<div class="scheduleCalendarWrap <?= $i > 1 ? 'hidden' : '' ?>" data-schedule-day="<?= $date ?>">

		  	<div class="scheduleCalendar">

		      	<div class="scheduleCalendar__gridLines">

					<?php $time = 0; ?>

					<?php while($time < $day['dayLength']) : ?>

						<hr />

						<?php $time += 30; ?>

					<?php endwhile; ?>

				</div>

			    <div class="scheduleCalendar__headers">

			      	<div class="scheduleCalendar__headerButtons">

				        <button class="hidden scheduleCalendar__headerButton scheduleCalendar__headerButton--left JS--scheduleLeft">

				          	<svg id="icon-arrow" viewBox="0 0 96 96">
							
								<path d="M39.66,13.34A8,8,0,0,0,28.34,24.66L51.69,48,28.34,71.34A8,8,0,0,0,39.66,82.66l29-29a8,8,0,0,0,0-11.31Z"></path>

							</svg>

				        </button>

				        <button class="hidden scheduleCalendar__headerButton scheduleCalendar__headerButton--right JS--scheduleRight">

				          <svg><use xlink:href="#icon-arrow"></use></svg>

				        </button>

			      	</div>

				   	<div class="scheduleCalendarScroller syncscroll" name="calendarScrollers">

				      	<div class="scheduleCalendar__column scheduleCalendar__column--time">

				          <div class="scheduleCalendar__heading scheduleCalendar__heading--time">Time</div>

				        </div>

						<?php foreach($day['stages'] as $stage) : ?>

							<div class="scheduleCalendar__column">

					          <div class="scheduleCalendar__heading"><?= $stage['stageName'] ?></div>

					        </div>

						<?php endforeach; ?>

				     </div>

				</div>

				<div class="scheduleCalendarTracks syncscroll" name="calendarScrollers">
				      	
				    <div class="scheduleCalendar__column scheduleCalendar__column--time">

						<?php $time = 0; ?>

						<?php while($time < $day['dayLength']) : ?>

							<div class="scheduleCalendar__gridMarker">
								
								<?= $day['earliestTime']->format('H:i'); ?>

								<?php $day['earliestTime']->add(new DateInterval('PT30M')); ?>

							</div>

							<?php $time += 30; ?>

						<?php endwhile; ?>

				    </div>
				    
				    <?php foreach($day['stages'] as $stage) : ?>

				      	<div class="scheduleCalendar__column">
					    	
					    	<?php foreach($stage['performances'] as $performance) : ?>

								<div class="scheduleCalendar__performance"
									style="top: <?= $performance['startTimeOffsetPercentage']  ?>%; height: <?= $performance['percentageDuration']  ?>%; ">

									<div class="scheduleCalendar__performanceInner">

										<div class="scheduleCalendar__performanceTime">

											<?php $startDateTime = $performance['startDateTime'];  ?>

											<?= $startDateTime->format('H:i') ?> - 

											<?php 
												$startDateTime->add(new DateInterval('PT' . $performance['duration'] . 'M'));
											?>

											<?= $startDateTime->format('H:i') ?>

										</div>

										<div class="performance__titleWrap">

											<?php if(get_field('show_performance_images',$currentId) && get_field('image',$performance['id'])) : ?>

												<div class="performanceContent__imageWrap">

													<?php plotLazyload([
														'image' 				=> get_field('image',$performance['id']), 
														'imageSize'				=> 'imageGrid', 
														'class'					=> 'performanceContent__image'
													]); ?>

												</div>

											<?php endif; ?>
									
											<h4><?= plotMakePerformanceTitle($performance['id']); ?></h4>

										</div>

										<div class="performanceContent">


											<?php if(get_field('description',$performance['id']) && get_field('show_performance_descriptions',$currentId)) : ?>

												<?= get_field('description',$performance['id']); ?>

											<?php endif; ?>

										</div>

									</div>

								</div>


							<?php endforeach; ?>    
					    
					    </div>

				    <?php endforeach; ?>

				  
				</div>

			</div>

		</div>

	<?php endforeach; ?>

	<?php if(get_field('schedule_file',$currentId)) : ?>

		<a download href="<?= get_field('schedule_file') ?>" class="plotButton scheduleFileButton">Download schedule</a>

	<?php endif; ?>

</div>

<?php plotGetTemplatePart('parts/footer') ?>
