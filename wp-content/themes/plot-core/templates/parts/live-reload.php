<?php if(strpos($_SERVER['HTTP_HOST'],'test') !== false)  : ?>
    <?php //LIVERELOAD 
    $domain = ! empty($_SERVER['HTTP_HOST']) ? strtolower($_SERVER['HTTP_HOST']) : 'cli';
    if (strpos($domain, 'test') !== false || $domain == 'cli') : ?>
        <script>
        document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
        ':35729/livereload.js?snipver=1"></' + 'script>')
        </script>
    <?php endif ?>
<?php endif ?>