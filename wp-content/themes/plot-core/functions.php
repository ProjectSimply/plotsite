<?php

//Loading up our include files from includes
$psIncludes = array(
  'includes/cloudways.php',
  'includes/plot-site.php',
  'includes/admin.php',
  'includes/db-find-and-replace.php',
  'includes/helpers.php'
);

foreach ($psIncludes as $file) {
  if (!$filepath = locate_template($file)) {
    trigger_error(sprintf(__('Error locating %s for inclusion', 'ps'), $file), E_USER_ERROR);
  }

  require_once $filepath;
}
unset($file, $filepath);