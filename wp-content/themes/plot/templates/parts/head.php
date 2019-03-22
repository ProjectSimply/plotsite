<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="cache-control" content="no-cache">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<meta name="author" content="">
	<meta name="description" content="">

    <?php wp_head(); ?>

    <?php if(strpos($_SERVER[HTTP_HOST],'test') !== false) : ?>
        <link href="<?php echo get_template_directory_uri(); ?>/assets/css/style.css?v=1" rel="stylesheet" media="all">
    <?php else : ?>
        <link href="<?php echo get_template_directory_uri(); ?>/assets/css/style.css?v=1" rel="stylesheet" media="all">
    <?php endif; ?>

    <link rel="stylesheet" href="https://use.typekit.net/pnd5bdl.css">
        <script src="https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"></script>


</head>
