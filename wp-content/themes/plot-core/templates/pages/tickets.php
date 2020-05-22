<?php plotGetTemplatePart('parts/banner') ?>

<div data-plot-smooth-scroll-frame class="tickets plotPage">

	<div class="maxWidth">

		<?php if(get_field('tickets_announcement') && get_field('add_a_tickets_announcement')) : ?>

			<div class="ticketsAnnouncement">

				<?= get_field('tickets_announcement') ?>

			</div>

		<?php endif; ?>

		<?php if(!get_field('hide_ticket_buttons')) : ?>

			<?php while(has_sub_field('tickets')) : ?>

				<div class="ticketGroup">

					<h2><?= get_sub_field('group_name') ?></h2>

					<div class="ticketOptions ticketOptions--<?= get_field('display_options') ?>">

						<?php while(has_sub_field('ticket_options')) : ?>

							<div class="ticketOption <?= get_sub_field('sold_out') ? 'ticketOption--soldOut' : '' ?>">

								<div class="ticketOption__panel <?= get_sub_field('image') ? 'ticketOption__panel--withImage' : '' ?>">

									<?php if(get_field('display_options') == 'grid') : ?>

					                    <div class="blockLinkImageFrame">
  
					                            <?php plotLazyload([
					                                'image'                 => get_sub_field('image'), 
					                                'imageSize'             => 'blockLink',
					                                'class'                 => 'blockLink__image',
					                                'opacity'               => get_sub_field('brightness') / 100
					                            ]); ?>
					                    </div>

					                <?php endif; ?>

									<h3 class="ticketOption__title"><?= get_sub_field('title') ?></h3>

									<?php if(get_sub_field('subheading')) : ?>

										<div class="ticketOption__subheading"><?= get_sub_field('subheading') ?></div>

									<?php endif; ?>

									<div class="ticketOption__price"><?= get_sub_field('price') ?></div>

									<a class="ticketOption__button plotButton" href="<?= get_sub_field('url') ?>"><?= get_sub_field('sold_out') ? 'SOLD OUT' : get_sub_field('button_text') ?></a>

								</div>

							</div>

						<?php endwhile; ?>

					</div>

				</div>

			<?php endwhile; ?>

		<?php endif; ?>

	</div>

</div>

<?php plotGetTemplatePart('plot-layouts/main-loop'); ?> 