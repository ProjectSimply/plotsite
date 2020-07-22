<?php plotGetTemplatePart('parts/head'); ?>

<body <?php plotBodyClass() ?>> 

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-171294626-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-171294626-1');

      gtag('config', 'AW-619032347');
    </script>

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
