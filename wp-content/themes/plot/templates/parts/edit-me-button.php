<?php if(current_user_can('editor') || current_user_can('administrator')) : ?>

    <a class="button editMeButton" href="/wp-admin/post.php?post=<?= the_ID(); ?>&action=edit" target="_blank">EDIT ME 🙌</a>

<?php endif; ?>