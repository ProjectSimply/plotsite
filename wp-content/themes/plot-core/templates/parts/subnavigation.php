<?php if(get_field('include_a_sub_menu')) : ?>

	<div class="plotSubnavigation" data-plot-smooth-scroll-frame>

		<div class="maxWidth">
			<?php $navMenuID = get_field('sub_menu'); ?>

			<?php $navItems = get_field('menu_items',$navMenuID); ?>

			<div class="plotPossibleDropdown">

				<div class="plotPossibleDropdown__selector">All</div>

				<div class="plotPossibleDropdown__dropdown">

					<div class="plotPossibleDropdown__item JS--artistTypeButton hidden">All</div>

					<?php while(has_sub_field('menu_items',$navMenuID)) : ?>

						<a class="<?= get_sub_field('menu_item')->ID == get_the_ID() ? 'currentSubmenuItem' : ''; ?> plotPossibleDropdown__item" href="<?= get_permalink(get_sub_field('menu_item')->ID) ?>"><?= get_sub_field('menu_item')->post_title ?></a>

					<?php endwhile; ?>

				</div>

				<div class="plotPossibleDropdown--buttons">

					<ul>

						<?php while(has_sub_field('menu_items',$navMenuID)) : ?>

							<li class="plotPossibleDropdownVisibleItems">

								<a class="<?= get_sub_field('menu_item')->ID == get_the_ID() ? 'currentSubmenuItem' : ''; ?>" href="<?= get_permalink(get_sub_field('menu_item')->ID) ?>"><?= get_sub_field('menu_item')->post_title ?></a>

							</li>

						<?php endwhile; ?>

					</ul>

				</div>

			</div>

		</div>
	</div>

<?php endif; ?>