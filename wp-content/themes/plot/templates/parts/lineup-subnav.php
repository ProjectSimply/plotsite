<ul class="lineupSubNav">

	<?php if(is_page('line-up')) : ?>
	    <li class="current">Artists</a></li>
	<?php else : ?>
		<li><a href="/line-up">Artists</a></li>
	<?php endif; ?>

	<?php if(is_page('stages')) : ?>
	    <li class="current">Stages</a></li>
	<?php else : ?>
		<li><a href="/line-up/stages">Stages</a></li>
	<?php endif; ?>

	<?php if(is_page('poster')) : ?>
	    <li class="current">Poster</a></li>
	<?php else : ?>
		<li><a href="/line-up/poster">Poster</a></li>
	<?php endif; ?>

</ul>