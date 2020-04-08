<?php if(plotIsSiteHidden() && is_user_logged_in()) : ?>

	<div class="plotSiteHiddenNote">

		<p>This site is currently hidden to public. <a href="/wp-admin/admin.php?page=site-status">Change Site Settings</a>.

	</div>

<?php endif; ?>

<?php if(plotIsSplashPageOn() && is_user_logged_in()) : ?>

	<div class="plotSiteHiddenNote">

		<p>This site currently sends visitors to a splash page. <a href="/wp-admin/admin.php?page=site-status">Change Site Settings</a>.

	</div>

<?php endif; ?>