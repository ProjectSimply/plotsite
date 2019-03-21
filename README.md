# PLOT
Repo for the Project Simply Plot CMS, based on Advanced Custom Field's (ACF) flexible content field.


## Getting started

### Host / Database

Setup a local database and import the plot.sql file from the repo's /sql directory

The database uses http://plot.test as its host name. To run under a different host, you'll need to do a find and replace on the db. We've included the tooling for that in the /replace\_remove\_for\_live directory. Navigate to http://{new\_host\_name}/replace\_remove\_for\_live to kick off the find and replace.


### NPM

From the theme root, install local dependencies:

    $ npm install

#### Watching

With dev dependicies installed, run from project root:

    $ npm run observe
    
This will set off watchers on the src folder, compiling the scss files from style.scss over to app/css/style.css and the javascript files from src/js over to app/js/main.js. This script will also set off livereload.

#### Compiiling

To compile minified css:

    $ npm run cssmake

To compile minified js:

    $ npm run jsmake


## Templating

The theme is based around modular sections using ACF's flexible content field, with the aim of giving the client as much flexibility as possible. We have included a sql file with these module examples set up on the home page. Modules included are:

    - Block Links (tiled image / box links)
    - Carousel (with option to have image or video)
    - FAQs (pulls through faq custom post type data)
    - Fluid Content (heading and a wysiwyg editor - perfect for inner page content sections)
    - Full Image or Video (full screen image or video with optional text overlay)
    - Image With Text (option to have image on left or right on larger screens)
    - Latest Articles (image, title, excerpt for latest blog posts)

### Flexible Content Templates

The files for these modules are located in Plot's templates/flexible-content-default directory. Feel free to edit these to suit your needs. If the module is used the same way accross the site, you can edit them here and forget about it.

#### Flexible Content Templates - Custom Identifiers 

In the ACF setup for these flexible content modules, we have an optional 'identifier' that gets added to the modules container as a class, should you need to apply different stylings / functionality to the module.

#### Flexible Content Templates - Overwriting

To overwrite the template for one of the flexible content modules, copy the required module from the templates/flexible-content-default directory and place it in the templates/flexible-content-custom directory. You will also need to use the 'identifer' from ACF, which needs to be added to the end of the modules filename in the following format '-{identifer}'.

So, if you wanted to overwrite the Block Links module using 'custom-example' as an identifer, you would include block-links-custom-example.php in the templates/flexible-content-custom directory. This example is included in the theme for reference.
