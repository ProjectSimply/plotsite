<!DOCTYPE html>
<html lang="en">
<head>

    <?php if(get_field('gtm_id','option')) : ?>

        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','<?= get_field('gtm_id','option'); ?>');</script>
        <!-- End Google Tag Manager -->

    <?php endif; ?>

	<meta charset="utf-8">
	<meta http-equiv="cache-control" content="no-cache">
	<meta name="viewport" content="width=device-width, initial-scale=1">

    <?php wp_head(); ?>

    <link rel="stylesheet" href="https://use.typekit.net/tms6vqx.css">

    <?php if(strpos($_SERVER['HTTP_HOST'],'test') !== false || strpos($_SERVER['HTTP_HOST'],'pleasecheck') !== false)  : ?>
        <link href="<?php echo get_stylesheet_directory_uri(); ?>/assets/css/style.css?v=<?= date('ymdhis') ?>" rel="stylesheet" media="all">
    <?php else : ?>
        <link href="<?php echo get_stylesheet_directory_uri(); ?>/assets/css/style.min.css?v=<?= SITE_VERSION ?>" rel="stylesheet" media="all">
    <?php endif; ?>


</head>