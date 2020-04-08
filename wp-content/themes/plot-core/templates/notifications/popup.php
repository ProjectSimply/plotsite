<div class="hidden JS--fakeButtonForModalNotifications JS--plotModalButton"
	data-plot-modal
	data-plot-modal-class="plotModalNotification"
	data-plot-modal-contents="plotModalNotification"
	data-plot-notification-wait="<?= get_field('time_until_popup_shows') ?>"
></div>

<div class="JS--plotModalContents plotModalContents" data-plot-modal-contents="plotModalNotification">
	<div class="plotModalNotification__imageWrap">
		<?php plotLazyload([
			'image' 				=> get_field('image'), 
			'imageSize'				=> 'banner', 
			'class'					=> 'plotModalNotification__image'
		]); ?>
	</div>
	<h2><?= the_title() ?></h2>

	<?= get_field('message'); ?>

	<?php if(get_field('show_button')) : ?>

		<a class="button plotModalNotification__button" href="<?= get_field('url') ?>"><?= get_field('button_text') ?></a>

	<?php endif; ?>
	
</div>