<div class="lineupPagesSubmenu plotSubnavigation">

	<div class="maxWidth">
		<?php $navItems = wp_get_nav_menu_items('Lineup Pages'); ?>

		<div class="plotPossibleDropdown">

			<div class="plotPossibleDropdown__selector">All</div>

			<div class="plotPossibleDropdown__dropdown">

				<div class="plotPossibleDropdown__item JS--artistTypeButton hidden">All</div>

				<?php foreach($navItems as $navItem) : ?>

					<a class="plotPossibleDropdown__item" href="<?= $navItem->url ?>"><?= $navItem->title ?></a>

				<?php endforeach; ?>

			</div>

			<div class="plotPossibleDropdown--buttons">

				<ul>

					<?php foreach($navItems as $navItem) : ?>

						<li class="plotPossibleDropdownVisibleItems">

							<a href="<?= $navItem->url ?>"><?= $navItem->title ?></a>

						</li>

					<?php endforeach; ?>

				</ul>

			</div>

		</div>

	</div>
</div>
