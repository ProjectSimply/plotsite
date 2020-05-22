<?php plotGetTemplatePart('parts/head'); ?>

<body <?php plotBodyClass() ?>> 

    <?php if(get_field('gtm_id','option')) : ?>

        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=<?= get_field('gtm_id', 'option') ?>"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    
    <?php endif; ?>

    <?php plotGetNotifications() ?>  

    <div data-plot-smooth-scroll>

        <div class="siteWrap">

                <?php include plotTemplatePath(); ?>

        </div>

    </div>

    <?php plotGetTemplatePart('parts/schedule-download'); ?>

    <?php plotGetTemplatePart('parts/burger-menu') ?>

    <div class="siteOverlay"></div>

    <?php plotGetTemplatePart('parts/modal') ?>
    
    <?php plotGetTemplatePart('parts/site-status-note'); ?>  

    <?php plotGetTemplatePart('parts/custom-mouse') ?>

    <?php plotGetTemplatePart('parts/footer-javascript'); ?>

    <?php wp_footer(); ?>

    <?php plotGetTemplatePart('parts/live-reload'); ?>
    
</body>

</html>
