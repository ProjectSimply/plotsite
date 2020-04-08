<?php


//Add in your custom functions in here

//Here's an example Ajax function. They get mapped in your ajaxActions settings in setup.php.
//They must return a json encoded string.
 function exampleAjaxFunction() {

    echo json_encode('data to return to the view');
    exit;
}