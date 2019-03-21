# PS Bella

A super simple browserify-based, ajax-infused starter template for Wordpress

1. [Getting Started](#getting-started)
1. [Defaults](#defaults)
1. [Customising](#customising)
1. [Wordpress](#wordpress)
1. [Scripts](#scripts)


## Getting started

Bella is forked from Omid Kashan's Stem setup and is designed to be as painless as possible to get running.

### Setting up

The following should be installed globally:

|library|install
|---|---
|sass	|`gem install sass`
|browserify	| `npm i -g browserify`
|imagesloaded| `npm i -g imagesloaded`
|watchify|`npm i -g watchify`
|postcss|`npm i -g postcss`
|autoprefixer|`npm i -g postcss-cli autoprefixer`
|cssnano|`npm i -g cssnano`
|uglifyjs| `npm i -g uglify-js`
|jshint| `npm i -g jshint`
|parallelshell|`npm i -g parallelshell`

### Installing

From the theme root, install local dependencies:

    $ npm install

### Watching

With parallelshell installed, run from project root:

    $ npm run observe
    
This will set off watchers on the src folder, compiling the scss files from style.scss over to app/css/style.css and the javascript files from src/js over to app/js/main.js. This script will also set off livereload.

## PSAjax

Within our javascript sits a tool set up for super easy ajax loading with Wordpress. It's designed so that you can really easily turn your links into ajax links that'll either load a new page or any page fragment that you need to update. All you need to do is add on the class "psAjax" to an anchor, and the href will attempt to load asynchronously.

By default it will update ".siteWrap" with the content found within ".siteWrap" of the new page. This class is intended to be wrapped around the main content area of all your page. A standard set up for this will be:

    <header>
		<nav>
			<a href="home" class="ajaxLink">Home</a>
			<a href="about" class="ajaxLink">About</a>
			<a href="contact" class="ajaxLink">Contact</a>
		</nav>
	</header>
	<div class="siteWrap">
		<!-- Here's where you have your main content, and this area will update asynchronously when you click a link above. -->
	</div>
It's worth noting that we have added in a custom Wordpress nav walker PS_Walker() that adds in these ajaxLink classes for you.

### PS Ajax options

There are lots of options available to you so that you can use ajax links to bring back different content from different pages and load that content up into different elements on your page. Let's look at them!

#### Custom Targets    
    <a href="my-page" class="ajaxLink" data-target=".fragment">My link</a>
This link would look up the content from the page "my-page" found within the default selector ".siteWrap". It would then push that html into your chosen target ".fragment" rather than updating the entire page. You can use any css selector in this variable.

#### Custom Retrievers
    <a href="my-page" class="ajaxLink" data-retrieve=".showcases">My link</a>
This link allows the user to grab the html within a specific element on a page and return it to the view. Here it'll look for an element with the class "showcases" and take the content from there, and update your ".siteWrap" element.

#### Minimum durations
    <a href="my-page" class="ajaxLink" data-minDuration="1500">My link</a>
Sometimes your using page transition animations, and you need a minimum duration to allow for that animation to complete. This example will cause the page load to last a minimum of 1.5 seconds, even if the ajax loads quicker. Use this with moderation, of course, no-one likes a stupid animation getting in the way of their content.
#### Suppressing history
    <a href="my-page" class="ajaxLink" data-suppressHistory="true">My Link</a>
By default, links will update your url in your browser to the href in your link so that you can continue to use backwards and forwards on your browser. Sometimes, you don't want this to happen, so you can pass through a data-suppressHistory value and it will leave your urls alone.
#### Unique Identifiers
    <a href="my-page" class="ajaxLink" data-identifier="myID-123">My Link</a>
PS Ajax generates a lot of custom javascript events during your ajax call allowing you to add in event listeners as you see fit. We'll come to that later. But for now, know that by adding in a data-identifier this allows you to know which link has been clicked during the ajax process, easily allowing you to write custom callbacks and hooks.
#### Wordpress actions!
    <a href="my-page" class="ajaxLink" data-action="my_custom_wordpress_action">My Link</a>
Sometimes you want to trigger a custom function within Wordpress to return nice streamlined JSON rather than a stream of HTML. You can do this super easy! Add in a data-action variable with a unique name. Then in lib/ajax.php you can hook this up to a PHP function of your choice like so:
    $ajaxActions = [
    	'my_custom_wordpress_action' => 'my_function_name'
    ];
my_function_name here is the name you can give to a PHP function that generates the data you'd like to retrieve. You can add as many actions as you'd like within this array. You can then create your function below:
    function my_function_name() {
        $dataToReturnToJS = ['Some','Data','From','PHP'];
        echo jsonencode($dataToReturnToJS);
        exit;
    }
Remember to jsonencode the data you want to return to the page and then exit. An example PHP function sits within ajax.php ready for you to edit.

This custom data now returns back through ajax and can be accessed through a custom event listener ready for you to do with as you please. Let's look at that now!

## Custom events
PS Ajax fires a lot of custom events ready for you to do with as you please. Let's look over them:

### Custom Actions
    $('body').on("psAfterCustomAjaxAction", '.target',function(e){
		//after loading ajax with a custom action
		console.log('After loading custom ajax',e.detail.data);
	});
This fires after the successful retrieval of a json object through a link with data-action"my_action" on it. The data is accessible through e.detail.data. The event emits from the target of the ajax link, which in this example is ".target".

### After initial page load
    $(window).on("psPageLoaded",function(e){
		//doooo stuuuuffff
	});
This fires on the window after the page has initially completed loaded. Including after all images have loaded.

### After an image loads
    $(window).on("psImageLoaded", function(e){

		//an image has finished loading
		//e.detail.imagesLoaded is how many images have been loaded during this call
		//e.detail.totalImages is how many images there are to load in total
		//e.detail.image is the current image in question
		console.log('An image has loaded',e.detail);

	});
This fires when an image has completed loading, either through ajax or sync. It returns three variables allowing you to see which image has loaded, how many have loaded, and how many there are to load, so that you can easily plug this into a preloading percentage graphic, for example:
    $(window).on("psImageLoaded", function(e){

		var percentage = e.detail.imagesLoaded/e.detail.totalImages*100;
		$('.percentageBar').height(percentage + '%')

	});

### After ajax content has completed loading
    $('body').on("psAjaxLoadComplete", '.siteWrap', function(e){

		//ajax loading complete
		//e.detail.identifier is an optional unique identifier passed on the anchor
		console.log('Ajax has completed loading.', e.detail);

	});
This fires after the ajax has completed loading. You can pass through e.detail.identifier onto the data-identifier="whatever" here so that you can know easily which link has been clicked. This fires on the target of the ajax call.

### Trigger before an ajax call
    $('body').on("psBeforeAjax", '.siteWrap', function(){

		//ajax loading complete
		//e.detail.identifier is an optional unique identifier passed on the anchor
		console.log('Just before ajax loading');

		//In this example we set the percentage bar to be 0 ready to load images
		$('.percentageBar').height('0%');

	});
	
##Before a custom ajax action

	$('body').on("psBeforeCustomAjaxAction", '.siteWrap',function(e){

		//about to load ajax with a custom action
		console.log('About to load custom ajax');

	});


