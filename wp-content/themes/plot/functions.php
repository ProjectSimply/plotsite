<?php

//Loading up our include files from lib
$psIncludes = array(
  'lib/setup.php',
  'lib/helpers.php',
  'lib/taxonomies.php',
  'lib/post-types.php',
  'lib/ajax.php',
  'lib/custom.php',
  'lib/admin.php'
);

// Markdown Support
include 'lib/Parsedown.php';

foreach ($psIncludes as $file) {
  if (!$filepath = locate_template($file)) {
    trigger_error(sprintf(__('Error locating %s for inclusion', 'ps'), $file), E_USER_ERROR);
  }

  require_once $filepath;
}
unset($file, $filepath);