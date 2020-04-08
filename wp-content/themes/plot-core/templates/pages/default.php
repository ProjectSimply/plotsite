<?php plotGetTemplatePart('parts/header') ?>

<?php plotGetTemplatePart('parts/banner') ?>

<?php if(checkPostIsInMenu('Lineup Pages')) : ?>

    <?php plotGetTemplatePart('parts/lineup-submenu'); ?>

<?php endif; ?>

<?php plotGetTemplatePart('plot-layouts/main-loop'); ?> 

<?php plotGetTemplatePart('parts/footer') ?>
