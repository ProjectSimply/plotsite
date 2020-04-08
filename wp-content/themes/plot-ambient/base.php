<?php plotGetTemplatePart('parts/head'); ?>

<body <?php plotBodyClass() ?> <?= plotCustomizerDataAttributes() ?>>

    <?php if(get_field('gtm_id','option')) : ?>

        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=<?= get_field('gtm_id') ?>"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    
    <?php endif; ?>

    <?php plotGetNotifications() ?>  

    <div class="siteWrap">

            <?php include plotTemplatePath(); ?>

    </div>

    <?php if(plotShowMainTicketsButton()) : ?>

        <a href="<?= get_field('main_tickets_button_link','option') ?>" class="plotButton mainBuyTickets--footer mainBuyTickets"><?= get_field('main_tickets_button_text','option') ?></a>

    <?php endif; ?>

    <?php plotGetTemplatePart('parts/burger-menu') ?>

    <?php plotGetTemplatePart('parts/modal') ?>
    
    <?php plotGetTemplatePart('parts/site-status-note'); ?>  

    <?php plotGetTemplatePart('parts/custom-mouse') ?>

    <?php plotGetTemplatePart('parts/footer-javascript'); ?>

    <?php wp_footer(); ?>

    <?php plotGetTemplatePart('parts/live-reload'); ?>
    
</body>

</html>
