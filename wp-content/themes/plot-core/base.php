<?php plotGetTemplatePart('parts/head'); ?>

<body <?php plotBodyClass() ?>> 

    <?php if(get_field('gtm_id','option')) : ?>

        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=<?= get_field('gtm_id', 'option') ?>"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    
    <?php endif; ?>

    <?php plotGetNotifications() ?>  

    <div class="siteWrap">

        <?php include plotTemplatePath(); ?>

    </div>

    <?php plotGetTemplatePart('parts/edit-me-button'); ?> 

    <?php plotGetTemplatePart('parts/modal') ?>
    
    <?php plotGetTemplatePart('parts/site-status-note'); ?>  

    <?php plotGetTemplatePart('parts/custom-mouse') ?>

    <?php plotGetTemplatePart('parts/footer-javascript'); ?>

    <?php wp_footer(); ?>

    <?php plotGetTemplatePart('parts/live-reload'); ?>
    
</body>

</html>
