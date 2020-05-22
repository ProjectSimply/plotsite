<?php if(get_field('schedule_file',get_the_ID())) : ?>

	<a download href="<?= get_field('schedule_file') ?>" class="scheduleFileButton">Download schedule</a>

<?php endif; ?>
