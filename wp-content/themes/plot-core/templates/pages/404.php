<div data-plot-smooth-scroll-frame class="fourOhFourPage maxWidth--narrow plotPage">

	<div class="fourOhFourPage__contentWrap">

		<div class="fourOhFourPage__contentBox">

			<?php if(get_field('404_title','option')) : ?>

				<h1 class="fourOhFourPage__title"><?= get_field('404_title','option') ?></h1>

			<?php endif; ?>

			<?php if(get_field('404_content','option')) : ?>

				<div class="fourOhFourPage__statement"><?= get_field('404_content','option') ?></div>

			<?php endif; ?>

		</div>

	</div>

</div>