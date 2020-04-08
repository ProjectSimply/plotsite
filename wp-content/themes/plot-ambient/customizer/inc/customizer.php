<?php
/**
 * Customizer Setup and Custom Controls
 *
 */

class plotCustomizer {

	// Get our default values
	private $defaults;

	public function __construct() {

		$this->defaults =  [
			'baseFontSize' 		 	 => '16',
			'backgroundColor'		 => '#ffffff',
			'altBackgroundColor'	 => '#cccccc',
			'bodyColor'				 => '#222222',
			'altBodyColor'			 => '#000000',
			'headerBackgroundColor'  => 'black',
			'headerTextColor'  		 => 'bodyColor',
			'headerTextHoverColor'   => 'highlightColor',
			'buyTicketsBackgroundColor' => 'black',
			'buyTicketsTextColor' 	 => 'white',
			'highlightColor'  	     => '#ff0000',
			'altHighlightColor'  	 => '#00ff00',
			'headerBackgroundOpacity'=> 0,
			'headerHeight'			 => 100,
			'roundedEdges'			 => 0,
			'navigationAlignment'	 => 'left',
			'navigationType'		 => 'mobileBurger',
			'headingsScale'			 => '1.5',
			'headerPosition'		 => 'absolute',
			'logoSize'				 => '100',
			'fontPrimary' => json_encode(
				[
					'font' 				=> 'IBM Plex Mono',
					'regularweight' 	=> 'regular',
					'italicweight' 		=> 'italic',
					'boldweight' 		=> '700',
					'category' 			=> 'sans-serif'
				]
			),
			'fontHeadings' => json_encode(
				[
					'font' 			=> 'IBM Plex Sans',
					'regularweight' => 'regular',
					'italicweight' 	=> 'italic',
					'boldweight' 	=> '700',
					'category' 		=> 'sans-serif'
				]
			),
		];

		add_action( 'customize_register', array( $this, 'removeUnnecessaryDefaults' ),50 );

		// Register our Sections
		add_action( 'customize_register', array( $this, 'addSections' ) );

		// Register our Controls
		add_action( 'customize_register', array( $this, 'registerColorControls' ) );
		add_action( 'customize_register', array( $this, 'registerMainControls' ) );
		add_action( 'customize_register', array( $this, 'registerButtonControls' ) );
		add_action( 'customize_register', array( $this, 'registerTicketButtonControls' ) );
		add_action( 'customize_register', array( $this, 'registerTypographyControls' ) );
		add_action( 'customize_register', array( $this, 'registerHeaderControls' ) );
		add_action( 'customize_register', array( $this, 'registerMobileMenuControls' ) );
		add_action( 'customize_register', array( $this, 'registerFormControls' ) );
		add_action( 'customize_register', array( $this, 'registerBlockLinkControls' ) );
		add_action( 'customize_register', array( $this, 'registerFooterControls' ) );

		add_action( 'customize_register', function( $wp_customize ) {
		        /** @var WP_Customize_Manager $wp_customize */
		        remove_action( 'customize_controls_enqueue_scripts', array( $wp_customize->nav_menus, 'enqueue_scripts' ) );
		        remove_action( 'customize_register', array( $wp_customize->nav_menus, 'customize_register' ), 11 );
		        remove_filter( 'customize_dynamic_setting_args', array( $wp_customize->nav_menus, 'filter_dynamic_setting_args' ) );
		        remove_filter( 'customize_dynamic_setting_class', array( $wp_customize->nav_menus, 'filter_dynamic_setting_class' ) );
		        remove_action( 'customize_controls_print_footer_scripts', array( $wp_customize->nav_menus, 'print_templates' ) );
		        remove_action( 'customize_controls_print_footer_scripts', array( $wp_customize->nav_menus, 'available_items_template' ) );
		        remove_action( 'customize_preview_init', array( $wp_customize->nav_menus, 'customize_preview_init' ) );
		}, 10 );

	}

	/**
	 * Register the Customizer panels
	 */
	public function removeUnnecessaryDefaults( $wp_customize ) {


		$wp_customize->remove_section( 'custom_css' );
   		$wp_customize->remove_section( 'static_front_page' );
   		$wp_customize->remove_panel( 'themes' );


	
	
	}

	/**
	 * Register the Customizer sections
	 */
	public function addSections( $wp_customize ) {
		
		$wp_customize->add_section( 'main_section',
			[
				'title' 		=> 'Main Options',
				'description' 	=> 'Main options for our theme design.'
			]
		);

		$wp_customize->add_section( 'color',
			[
				'title' 		=> 'Colours',
				'description' 	=> 'Create your colour palette. These can be used throughout your site, in the customizer and within your Plot Layouts.'
			]
		);

		$wp_customize->add_section( 'typography',
			[
				'title' 		=> 'Typography',
				'description' 	=> 'Sitewide font rules.'
			]
		);

		$wp_customize->add_section( 'buttons',
			[
				'title' 		=> 'Buttons',
				'description' 	=> 'Sitewide rules for the display and colours of buttons.'
			]
		);

		$wp_customize->add_section( 'ticket-button',
			[
				'title' 		=> 'Ticket Buttons',
				'description' 	=> 'Style rules for your desktop and mobile "buy tickets" buttons'
			]
		);

		$wp_customize->add_section( 'header_navigation_section',
			[
				'title' 		=> 'Header',
				'description' 	=> 'Options for your header.'
			]
		);

		$wp_customize->add_section( 'mobile_menu',
			[
				'title' 		=> 'Mobile Menu',
				'description' 	=> 'Settings for your mobile popup menu.'
			]
		);

		$wp_customize->add_section( 'forms',
			[
				'title' 		=> 'Forms',
				'description' 	=> 'Styling options for your onsite forms such as newsletter sign up, or contact forms.'
			]
		);

		$wp_customize->add_section( 'block_links',
			[
				'title' 		=> 'Block Links',
				'description' 	=> 'Rules that apply to any big image or video block links throughout the site. Used in latest articles, block links, artist listings and news articles.'
			]
		);

		$wp_customize->add_section( 'footer',
			[
				'title' 		=> 'Footer',
				'description' 	=> 'Sitewide footer settings.'
			]
		);

	}

	/**
	 * Register all our main controles
	*/

	public function registerMainControls( $wp_customize ) {

		$wp_customize->add_setting( 'plot[horizontalSpacing]',
			[
				'default' 		=> '100',
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[horizontalSpacing]',
			[
				'label' 		=> 'Horizontal Spacing',
				'section' 		=> 'main_section',
				'input_attrs' => [
					'min' 		=> 50,
					'max' 		=> 180,
					'step' 		=> 1,
				],
			]
		) );

		$wp_customize->add_setting( 'plot[verticalSpacing]',
			[
				'default' 		=> '100',
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[verticalSpacing]',
			[
				'label' 		=> 'Vertical Spacing',
				'section' 		=> 'main_section',
				'input_attrs' => [
					'min' 		=> 50,
					'max' 		=> 180,
					'step' 		=> 1,
				],
			]
		) );

		$wp_customize->add_setting( 'plot[siteBorder]',
			[
				'default' 		=> '0',
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[siteBorder]',
			[
				'label' 		=> 'Site Border Size',
				'section' 		=> 'main_section',
				'input_attrs' => [
					'min' 		=> 0,
					'max' 		=> 100,
					'step' 		=> 1,
				],
			]
		) );

		$this->makePlotColorPicker($wp_customize, 'plotSiteBorderColor','white','Site Border Colour','main_section');

		$wp_customize->add_setting( 'plot[siteMaxWidth]',
			[
				'default' 		=> '100',
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[siteMaxWidth]',
			[
				'label' 		=> 'Maximum width of the website',
				'section' 		=> 'main_section',
				'input_attrs' => [
					'min' 		=> 1200,
					'max' 		=> 1800,
					'step' 		=> 1,
				],
			]
		) );

	}

	public function registerFormControls( $wp_customize) {

		$wp_customize->add_setting( 'plotAttribute[inputType]',
			array(
				'default' => 'solid',
				'transport' => 'postMessage'
			)
		);
		$wp_customize->add_control( 'plotAttribute[inputType]',
			array(
				'type' => 'radio',
				'label' => 'Input style',
				'section' => 'forms',
				'choices' => array(
					'solid' 		=> 'Solid colour',
					'bordered' 		=> 'Border inputs'
				)
			
		) );

		$wp_customize->add_setting( 'plot[inputBorderThickness]',
			[
				'default' 		=> 0,
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[inputBorderThickness]',
			[
				'label' 		=> 'Border Thickness',
				'section' 		=> 'forms',
				'input_attrs' => [
					'min' 		=> 0,
					'max' 		=> 6,
					'step' 		=> 1,
				],
			]
		) );

		$this->makePlotColorPicker($wp_customize, 'plotInputBackgroundColor','altBackgroundColor','Background Colour','forms');

		$this->makePlotColorPicker($wp_customize, 'plotInputBorderColor','white','Border Colour','forms');

		$this->makePlotColorPicker($wp_customize, 'plotInputTextColor','altBodyColor','Text Colour','forms');

		$this->makePlotColorPicker($wp_customize, 'plotInputPlaceholderColor','darken','Placeholder Colour','forms');

		$wp_customize->add_setting( 'plot[notice]',
			[
				'default' 		=> 0,
				'transport' 	=> 'postMessage'
			]
		);

		$wp_customize->add_control( new PlotSimpleNoticeCustomControl( $wp_customize, 'plot[notice]',
			[
				'label' 		=> 'Please note, alternative colours are used for Plot Layouts with "alternative colour scheme" as your desired colour scheme.',
				'section' 		=> 'buttons'
			]
		) );

		$this->makePlotColorPicker($wp_customize, 'plotInputAltBackgroundColor','backgroundColor','Alternative Background Colour','forms');

		$this->makePlotColorPicker($wp_customize, 'plotInputAltBorderColor','white','Alternative Border Colour','forms');

		$this->makePlotColorPicker($wp_customize, 'plotInputAltTextColor','bodyColor','Alternative Text Colour','forms');

		$this->makePlotColorPicker($wp_customize, 'plotInputAltPlaceholderColor','darken','Alternative Placeholder Colour','forms');


		$wp_customize->add_setting( 'plot[inputRoundedEdges]',
			[
				'default' 		=> 0,
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[inputRoundedEdges]',
			[
				'label' 		=> 'Rounded Edges',
				'section' 		=> 'forms',
				'input_attrs' => [
					'min' 		=> 0,
					'max' 		=> 100,
					'step' 		=> 1,
				],
			]
		) );

		// $wp_customize->add_setting( 'plot[buttonHorizontalSpacing]',
		// 	[
		// 		'default' 		=> 100,
		// 		'transport' 	=> 'postMessage'
		// 	]
		// );
		
		// $wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[buttonHorizontalSpacing]',
		// 	[
		// 		'label' 		=> 'Horizontal Spacing',
		// 		'section' 		=> 'buttons',
		// 		'input_attrs' => [
		// 			'min' 		=> 50,
		// 			'max' 		=> 300,
		// 			'step' 		=> 1,
		// 		],
		// 	]
		// ) );

		// $wp_customize->add_setting( 'plot[buttonVerticalSpacing]',
		// 	[
		// 		'default' 		=> 100,
		// 		'transport' 	=> 'postMessage'
		// 	]
		// );
		
		// $wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[buttonVerticalSpacing]',
		// 	[
		// 		'label' 		=> 'Vertical Spacing',
		// 		'section' 		=> 'buttons',
		// 		'input_attrs' => [
		// 			'min' 		=> 50,
		// 			'max' 		=> 300,
		// 			'step' 		=> 1,
		// 		],
		// 	]
		// ) );

		// $wp_customize->add_setting( 'plot[buttonTextScale]',
		// 	[
		// 		'default' 		=> 100,
		// 		'transport' 	=> 'postMessage'
		// 	]
		// );
		
		// $wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[buttonTextScale]',
		// 	[
		// 		'label' 		=> 'Text Scale',
		// 		'section' 		=> 'buttons',
		// 		'input_attrs' => [
		// 			'min' 		=> 50,
		// 			'max' 		=> 150,
		// 			'step' 		=> 1,
		// 		],
		// 	]
		// ) );
	}

	public function registerBlockLinkControls( $wp_customize) {

		$wp_customize->add_setting( 'plot[blockLinkHeight]',
			[
				'default' 		=> 100,
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[blockLinkHeight]',
			[
				'label' 		=> 'Height',
				'section' 		=> 'block_links',
				'input_attrs' => [
					'min' 		=> 50,
					'max' 		=> 150,
					'step' 		=> 1,
				],
			]
		) );

		$wp_customize->add_setting( 'plot[roundedEdges]',
			[
				'default' 		=> $this->defaults['roundedEdges'],
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[roundedEdges]',
			[
				'label' 		=> 'Rounded Edges',
				'section' 		=> 'block_links',
				'input_attrs' => [
					'min' 		=> 0,
					'max' 		=> 100,
					'step' 		=> 1,
				],
			]
		) );

		$wp_customize->add_setting( 'plot[boxShadow]',
			[
				'default' 		=> 0,
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[boxShadow]',
			[
				'label' 		=> 'Box Shadow',
				'section' 		=> 'block_links',
				'input_attrs' => [
					'min' 		=> 0,
					'max' 		=> 100,
					'step' 		=> 1,
				],
			]
		) );

		$wp_customize->add_setting( 'plot[boxBorders]',
			[
				'default' 		=> 0,
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[boxBorders]',
			[
				'label' 		=> 'Box Borders',
				'section' 		=> 'block_links',
				'input_attrs' => [
					'min' 		=> 0,
					'max' 		=> 100,
					'step' 		=> 1,
				],
			]
		) );

		$this->makePlotColorPicker($wp_customize, 'plotBoxBorderColor','highlightColor','Box Border Colour','block_links');


		$wp_customize->add_setting( 'plot[wonk]',
			[
				'default' 		=> 0,
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[wonk]',
			[
				'label' 		=> 'Wonk',
				'section' 		=> 'block_links',
				'input_attrs' => [
					'min' 		=> 0,
					'max' 		=> 100,
					'step' 		=> 1,
				],
			]
		) );

	}

	public function registerTypographyControls( $wp_customize ) {

		$wp_customize->add_setting( 'plotFontType',
			array(
				'default' 	=> 'custom',
				'transport' => 'postMessage'
			)
		);

		$wp_customize->add_control( 'plotFontType',
			array(
				'type' 		=> 'radio',
				'label' 	=> 'My custom fonts',
				'section' 	=> 'typography',
				'choices' 	=> array(
					'custom' 		=> 'I have my own font files (.woff)',
					'google' 		=> 'I will use Google Fonts'
				)
			
		) );

		$wp_customize->add_setting('primaryFontRegular', array(
	        'transport'         => 'postMessage'
	    ));   

	    $wp_customize->add_control( new WP_Customize_Media_Control( $wp_customize, 'primaryFontRegular',
		   array(
		      'label' 		=> __( 'Upload your main font .woff file' ),
		      'description' => 'If you don\'t have your font as a woff file, you can create using <a href="https://transfonter.org/">an online convertor tool</a>.',
		      'section' 	=> 'typography'
		   )
		) );

		$wp_customize->add_setting('primaryFontBold', array(
	        'transport'         => 'postMessage'
	    ));   

	    $wp_customize->add_control( new WP_Customize_Media_Control( $wp_customize, 'primaryFontBold',
		   array(
		      'label' => __( 'Upload your main font\'s bold .woff file' ),
		      'section' => 'typography'
		   )
		) );

		$wp_customize->add_setting('primaryFontItalic', array(
	        'transport'         => 'postMessage'
	    ));   

	    $wp_customize->add_control( new WP_Customize_Media_Control( $wp_customize, 'primaryFontItalic',
		   array(
		      'label' => __( 'Upload your main font\'s italic .woff file' ),
		      'section' => 'typography'
		   )
		) );
	

		$wp_customize->add_setting( 'plotFont[primary]',
			[
				'default' => $this->defaults['fontPrimary'],
				'transport' => 'postMessage'
			]
		);
		$wp_customize->add_control( new PlotGoogleFontSelectCustomControl( $wp_customize, 'plotFont[primary]',
			[
				'label' => 'Primary Font',
				'description' => 'Your main font for the website.',
				'section' => 'typography',
				'input_attrs' => [
					'font_count' => 'all',
					'orderby' => 'alpha',
				],
			]
		) );

		$wp_customize->add_setting( 'plot[baseFontSize]',
			[
				'default' 		=> $this->defaults['baseFontSize'],
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[baseFontSize]',
			[
				'label' 		=> 'Base Font Size',
				'section' 		=> 'typography',
				'input_attrs' => [
					'min' 		=> 12,
					'max' 		=> 30,
					'step' 		=> 1,
				],
			]
		) );

		$wp_customize->add_setting( 'plot[lineHeight]',
			[
				'default' 		=> 100,
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[lineHeight]',
			[
				'label' 		=> 'Line Height',
				'section' 		=> 'typography',
				'input_attrs' => [
					'min' 		=> 50,
					'max' 		=> 150,
					'step' 		=> 1,
				],
			]
		) );

		$wp_customize->add_setting('headingFont', array(
	        'transport'         => 'postMessage'
	    ));   

	    $wp_customize->add_control( new WP_Customize_Media_Control( $wp_customize, 'headingFont',
		   array(
		      'label' => __( 'Upload your heading font\'s .woff file' ),
		      'section' => 'typography'
		   )
		) );

		$wp_customize->add_setting( 'plotFont[headings]',
			[
				'default' => $this->defaults['fontHeadings'],
				'transport' => 'postMessage'
			]
		);

		$wp_customize->add_control( new PlotGoogleFontSelectCustomControl( $wp_customize, 'plotFont[headings]',
			[
				'label' => 'Heading Font',
				'description' => 'Font to be used for headings across the site.',
				'section' => 'typography',
				'input_attrs' => [
					'font_count' => 'all',
					'orderby' => 'alpha',
				],
				'minimal' => true
			]
		) );


		$wp_customize->add_setting( 'plot[headingsLineHeight]',
			[
				'default' 		=> 100,
				'transport' 	=> 'postMessage'
			]
		);
		

		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[headingsLineHeight]',
			[
				'label' 		=> 'Headings Line Height',
				'section' 		=> 'typography',
				'input_attrs' => [
					'min' 		=> 80,
					'max' 		=> 120,
					'step' 		=> 1,
				],
			]
		) );

		$wp_customize->add_setting( 'plot[headingsScale]',
			[
				'default' 		=> $this->defaults['headingsScale'],
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[headingsScale]',
			[
				'label' 		=> 'Headings Scale',
				'section' 		=> 'typography',
				'input_attrs' => [
					'min' 		=> 1,
					'max' 		=> 2,
					'step' 		=> .1,
				],
			]
		) );

		$wp_customize->add_setting( 'plot[headingsSpacing]',
			[
				'default' 		=> 100,
				'transport' 	=> 'postMessage'
			]
		);
		

		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[headingsSpacing]',
			[
				'label' 		=> 'Spacing Below Headings',
				'section' 		=> 'typography',
				'input_attrs' => [
					'min' 		=> 50,
					'max' 		=> 250,
					'step' 		=> 1,
				],
			]
		) );

		$this->makePlotColorPicker($wp_customize, 'plotHeadingsColor','headingsColor','Heading Colour','typography');

		$this->makePlotColorPicker($wp_customize, 'plotAltHeadingsColor','altHeadingsColor','Alternative Heading Colour','typography');



	}

	public function registerButtonControls($wp_customize) {


		$wp_customize->add_setting( 'plotAttribute[buttonType]',
			array(
				'default' => 'solid',
				'transport' => 'postMessage'
			)
		);
		$wp_customize->add_control( 'plotAttribute[buttonType]',
			array(
				'type' => 'radio',
				'label' => 'Button type',
				'section' => 'buttons',
				'choices' => array(
					'solid' 		=> 'Solid colour',
					'bordered' 		=> 'Border buttons'
				)
			
		) );

		$wp_customize->add_setting( 'plot[buttonBorderThickness]',
			[
				'default' 		=> 0,
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[buttonBorderThickness]',
			[
				'label' 		=> 'Border Thickness',
				'section' 		=> 'buttons',
				'input_attrs' => [
					'min' 		=> 0,
					'max' 		=> 6,
					'step' 		=> 1,
				],
			]
		) );

		$this->makePlotColorPicker($wp_customize, 'plotButtonBackgroundColor','buttonBackgroundColor','Background Colour','buttons');

		$this->makePlotColorPicker($wp_customize, 'plotButtonBorderColor','buttonBorderColor','Border Colour','buttons');

		$this->makePlotColorPicker($wp_customize, 'plotButtonTextColor','buttonTextColor','Text Colour','buttons');

		$wp_customize->add_setting( 'plot[notice]',
			[
				'default' 		=> 0,
				'transport' 	=> 'postMessage'
			]
		);

		$wp_customize->add_control( new PlotSimpleNoticeCustomControl( $wp_customize, 'plot[notice]',
			[
				'label' 		=> 'Please note, alternative colours are used for Plot Layouts with "alternative colour scheme" as your desired colour scheme.',
				'section' 		=> 'buttons'
			]
		) );

		$this->makePlotColorPicker($wp_customize, 'plotButtonAltBackgroundColor','buttonAltBackgroundColor','Alternative Background Colour','buttons');

		$this->makePlotColorPicker($wp_customize, 'plotButtonAltBorderColor','buttonAltBorderColor','Alternative Border Colour','buttons');

		$this->makePlotColorPicker($wp_customize, 'plotButtonAltTextColor','buttonAltTextColor','Alternative Text Colour','buttons');



		$wp_customize->add_setting( 'plot[buttonBoxShadow]',
			[
				'default' 		=> 0,
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[buttonBoxShadow]',
			[
				'label' 		=> 'Shadows',
				'section' 		=> 'buttons',
				'input_attrs' => [
					'min' 		=> 0,
					'max' 		=> 100,
					'step' 		=> 1,
				],
			]
		) );

		$wp_customize->add_setting( 'plot[buttonRoundedEdges]',
			[
				'default' 		=> 0,
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[buttonRoundedEdges]',
			[
				'label' 		=> 'Rounded Edges',
				'section' 		=> 'buttons',
				'input_attrs' => [
					'min' 		=> 0,
					'max' 		=> 100,
					'step' 		=> 1,
				],
			]
		) );

		$wp_customize->add_setting( 'plot[buttonHorizontalSpacing]',
			[
				'default' 		=> 100,
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[buttonHorizontalSpacing]',
			[
				'label' 		=> 'Horizontal Spacing',
				'section' 		=> 'buttons',
				'input_attrs' => [
					'min' 		=> 50,
					'max' 		=> 300,
					'step' 		=> 1,
				],
			]
		) );

		$wp_customize->add_setting( 'plot[buttonVerticalSpacing]',
			[
				'default' 		=> 100,
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[buttonVerticalSpacing]',
			[
				'label' 		=> 'Vertical Spacing',
				'section' 		=> 'buttons',
				'input_attrs' => [
					'min' 		=> 50,
					'max' 		=> 300,
					'step' 		=> 1,
				],
			]
		) );

		$wp_customize->add_setting( 'plot[buttonTextScale]',
			[
				'default' 		=> 100,
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[buttonTextScale]',
			[
				'label' 		=> 'Text Scale',
				'section' 		=> 'buttons',
				'input_attrs' => [
					'min' 		=> 50,
					'max' 		=> 150,
					'step' 		=> 1,
				],
			]
		) );


	}

	public function registerTicketButtonControls($wp_customize) {


		$wp_customize->add_setting( 'plotAttribute[desktopTicketButtonType]',
			array(
				'default' => 'solid',
				'transport' => 'postMessage'
			)
		);
		$wp_customize->add_control( 'plotAttribute[desktopTicketButtonType]',
			array(
				'type' => 'radio',
				'label' => 'Desktop Button Type',
				'section' => 'ticket-button',
				'choices' => array(
					'solid' 		=> 'Solid colour',
					'bordered' 		=> 'Border button'
				)
			
		) );

		$wp_customize->add_setting( 'plot[desktopTicketButtonBorderThickness]',
			[
				'default' 		=> 0,
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[desktopTicketButtonBorderThickness]',
			[
				'label' 		=> 'Desktop Button Border Thickness',
				'section' 		=> 'ticket-button',
				'input_attrs' => [
					'min' 		=> 0,
					'max' 		=> 6,
					'step' 		=> 1,
				],
			]
		) );

		$this->makePlotColorPicker($wp_customize, 'plotDesktopTicketButtonBackgroundColor','desktopTicketButtonBackgroundColor','Desktop Button Background Colour','ticket-button');

		$this->makePlotColorPicker($wp_customize, 'plotDesktopTicketButtonBorderColor','desktopTicketButtonBorderColor','Desktop Button Border Colour','ticket-button');

		$this->makePlotColorPicker($wp_customize, 'plotDesktopTicketButtonTextColor','desktopTicketButtonTextColor','Desktop Button Text Colour','ticket-button');

		$wp_customize->add_setting( 'plot[desktopTicketButtonBoxShadow]',
			[
				'default' 		=> 0,
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[desktopTicketButtonBoxShadow]',
			[
				'label' 		=> 'Desktop Button Shadows',
				'section' 		=> 'ticket-button',
				'input_attrs' => [
					'min' 		=> 0,
					'max' 		=> 100,
					'step' 		=> 1,
				],
			]
		) );

		$wp_customize->add_setting( 'plot[desktopTicketButtonRoundedEdges]',
			[
				'default' 		=> 0,
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[desktopTicketButtonRoundedEdges]',
			[
				'label' 		=> 'Desktop Button Rounded Edges',
				'section' 		=> 'ticket-button',
				'input_attrs' => [
					'min' 		=> 0,
					'max' 		=> 100,
					'step' 		=> 1,
				],
			]
		) );

		$wp_customize->add_setting( 'plot[desktopTicketButtonSpacing]',
			[
				'default' 		=> 100,
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[desktopTicketButtonSpacing]',
			[
				'label' 		=> 'Desktop Button Spacing',
				'section' 		=> 'ticket-button',
				'input_attrs' => [
					'min' 		=> 50,
					'max' 		=> 150,
					'step' 		=> 1,
				],
			]
		) );

		$wp_customize->add_setting( 'plot[desktopTicketButtonTextScale]',
			[
				'default' 		=> 100,
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[desktopTicketButtonTextScale]',
			[
				'label' 		=> 'Desktop Button Text Scale',
				'section' 		=> 'ticket-button',
				'input_attrs' => [
					'min' 		=> 50,
					'max' 		=> 150,
					'step' 		=> 1,
				],
			]
		) );


		$wp_customize->add_setting( 'plot[mobileTicketButtonBorderThickness]',
			[
				'default' 		=> 0,
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[mobileTicketButtonBorderThickness]',
			[
				'label' 		=> 'Mobile Button Border Thickness',
				'section' 		=> 'ticket-button',
				'input_attrs' => [
					'min' 		=> 0,
					'max' 		=> 6,
					'step' 		=> 1,
				],
			]
		) );

		$this->makePlotColorPicker($wp_customize, 'plotMobileTicketButtonBackgroundColor','mobileTicketButtonBackgroundColor','Mobile Button Background Colour','ticket-button');

		$this->makePlotColorPicker($wp_customize, 'plotMobileTicketButtonBorderColor','mobileTicketButtonBorderColor','Mobile Button Border Colour','ticket-button');

		$this->makePlotColorPicker($wp_customize, 'plotMobileTicketButtonTextColor','mobileTicketButtonTextColor','Mobile Button Text Colour','ticket-button');

		$wp_customize->add_setting( 'plot[mobileTicketButtonBoxShadow]',
			[
				'default' 		=> 0,
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[mobileTicketButtonBoxShadow]',
			[
				'label' 		=> 'Mobile Button Shadows',
				'section' 		=> 'ticket-button',
				'input_attrs' => [
					'min' 		=> 0,
					'max' 		=> 100,
					'step' 		=> 1,
				],
			]
		) );

		$wp_customize->add_setting( 'plot[mobileTicketButtonRoundedEdges]',
			[
				'default' 		=> 0,
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[mobileTicketButtonRoundedEdges]',
			[
				'label' 		=> 'Mobile Button Rounded Edges',
				'section' 		=> 'ticket-button',
				'input_attrs' => [
					'min' 		=> 0,
					'max' 		=> 100,
					'step' 		=> 1,
				],
			]
		) );

		$wp_customize->add_setting( 'plot[mobileTicketButtonSpacing]',
			[
				'default' 		=> 100,
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[mobileTicketButtonSpacing]',
			[
				'label' 		=> 'Mobile Button Spacing',
				'section' 		=> 'ticket-button',
				'input_attrs' => [
					'min' 		=> 50,
					'max' 		=> 150,
					'step' 		=> 1,
				],
			]
		) );

		$wp_customize->add_setting( 'plot[mobileTicketButtonTextScale]',
			[
				'default' 		=> 100,
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[mobileTicketButtonTextScale]',
			[
				'label' 		=> 'Mobile Button Text Scale',
				'section' 		=> 'ticket-button',
				'input_attrs' => [
					'min' 		=> 50,
					'max' 		=> 150,
					'step' 		=> 1,
				],
			]
		) );


	}

	public function registerColorControls( $wp_customize ) {
	

		$wp_customize->add_setting( 'plot[backgroundColor]',
			[
				'default' 	=> $this->defaults['backgroundColor'],
				'transport' => 'postMessage'
			]
		);

		$wp_customize->add_control( 'plot[backgroundColor]',
			[
				'label' 	=> 'Main Background Colour',
				'section' 	=> 'color',
				'type' 		=> 'color'
			]
		);

		$wp_customize->add_setting( 'plot[altBackgroundColor]',
			[
				'default' => $this->defaults['altBackgroundColor'],
				'transport' => 'postMessage'
			]
		);

		$wp_customize->add_control( 'plot[altBackgroundColor]',
			[
				'label' 	=> 'Alternative Background Colour',
				'section' 	=> 'color',
				'type' 		=> 'color'
			]
		);

		$wp_customize->add_setting( 'plot[bodyColor]',
			[
				'default' => $this->defaults['bodyColor'],
				'transport' => 'postMessage'
			]
		);

		$wp_customize->add_control( 'plot[bodyColor]',
			[
				'label' 	=> 'Main Text Colour',
				'section' 	=> 'color',
				'type' 		=> 'color'
			]
		);

		$wp_customize->add_setting( 'plot[altBodyColor]',
			[
				'default' => $this->defaults['altBodyColor'],
				'transport' => 'postMessage'
			]
		);

		$wp_customize->add_control( 'plot[altBodyColor]',
			[
				'label' 	=> 'Alternative Text Colour',
				'section' 	=> 'color',
				'type' 		=> 'color'
			]
		);

		$wp_customize->add_setting( 'plot[highlightColor]',
			[
				'default' => $this->defaults['highlightColor'],
				'transport' => 'postMessage'
			]
		);

		$wp_customize->add_control( 'plot[highlightColor]',
			[
				'label' 	=> 'Highlight Colour',
				'section' 	=> 'color',
				'type' 		=> 'color'
			]
		);

		$wp_customize->add_setting( 'plot[altHighlightColor]',
			[
				'default' => $this->defaults['altHighlightColor'],
				'transport' => 'postMessage'
			]
		);

		$wp_customize->add_control( 'plot[altHighlightColor]',
			[
				'label' 	=> 'Alternative Highlight Colour',
				'section' 	=> 'color',
				'type' 		=> 'color'
			]
		);


	}


	/**
	 * Register all our header controls
	*/

	public function registerHeaderControls( $wp_customize ) {


		$wp_customize->add_setting('plot[headerLogo]', array(
	        'transport'         => 'postMessage'
	    ));   

	    $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'plot[headerLogo]', [
	        'label'             => 'Header Logo',
	        'section'           => 'header_navigation_section'   
	    ]));

	    $wp_customize->add_setting( 'plot[logoSize]',
			[
				'default' 		=> $this->defaults['logoSize'],
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[logoSize]',
			[
				'label' 		=> 'Logo size',
				'section' 		=> 'header_navigation_section',
				'input_attrs' => [
					'min' 		=> 50,
					'max' 		=> 150,
					'step' 		=> 1,
				],
			]
		) );

		$wp_customize->add_setting( 'plotAttribute[navigationAlignment]',
			array(
				'default' => $this->defaults['navigationAlignment'],
				'transport' => 'postMessage'
			)
		);
		$wp_customize->add_control( 'plotAttribute[navigationAlignment]',
			array(
				'type' => 'radio',
				'label' => 'Navigation type',
				'section' => 'header_navigation_section',
				'choices' => array(
					'left' 			=> 'Logo to the left',
					'center' 		=> 'Logo centered'
				)
			
		) );

		$wp_customize->add_setting( 'plotAttribute[navigationType]',
			array(
				'default' => $this->defaults['navigationType'],
				'transport' => 'postMessage'
			)
		);
		$wp_customize->add_control( 'plotAttribute[navigationType]',
			array(
				'type' => 'radio',
				'label' => 'Navigation type',
				'description' => 'Pick how you want your main navigation links to display. Please note, if your menu items don\'t fit on the screen, we\'ll automatically put them in a mobile menu for you.',
				'section' => 'header_navigation_section',
				'choices' => array(
					'mobileBurger' 			=> 'In a fullscreen popup menu on small screens, but visible on desktop',
					'everythingInBurger' 	=> 'Always within a fullscreen popup menu'
				)
			
		) );

		$this->makePlotColorPicker($wp_customize, 'plotHeaderBackgroundColor',$this->defaults['headerBackgroundColor'],'Header Background Colour','header_navigation_section');

		$this->makePlotColorPicker($wp_customize, 'plotHeaderTextColor',$this->defaults['headerTextColor'],'Header Text Colour','header_navigation_section');

		$this->makePlotColorPicker($wp_customize, 'plotHeaderTextHoverColor',$this->defaults['headerTextHoverColor'],'Header Text Hover Colour','header_navigation_section');


		$wp_customize->add_setting( 'plot[headerBackgroundOpacity]',
			[
				'default' 		=> $this->defaults['headerBackgroundOpacity'],
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[headerBackgroundOpacity]',
			[
				'label' 		=> 'Background Opacity',
				'section' 		=> 'header_navigation_section',
				'input_attrs' => [
					'min' 		=> 0,
					'max' 		=> 100,
					'step' 		=> 1,
				],
			]
		) );

		$wp_customize->add_setting( 'plot[headerHeight]',
			[
				'default' 		=> $this->defaults['headerHeight'],
				'transport' 	=> 'postMessage'
			]
		);
		
		$wp_customize->add_control( new PlotSliderControl( $wp_customize, 'plot[headerHeight]',
			[
				'label' 		=> 'Header height',
				'section' 		=> 'header_navigation_section',
				'input_attrs' => [
					'min' 		=> 50,
					'max' 		=> 150,
					'step' 		=> 1,
				],
			]
		) );

		$wp_customize->add_setting( 'plot[headerPosition]',
			array(
				'default' => $this->defaults['headerPosition'],
				'transport' => 'postMessage'
			)
		);
		$wp_customize->add_control( 'plot[headerPosition]',
			array(
				'type' => 'radio',
				'label' => 'Do you want a sticky header?',
				'description' => '',
				'section' => 'header_navigation_section',
				'choices' => array(
					'absolute' 	=> 'No thanks',
					'fixed' 	=> 'Always sticks to the top of the screen'
				)
			
		) );

	}

	public function registerFooterControls($wp_customize) {

		$this->makePlotColorPicker($wp_customize, 'plotFooterBackgroundColor','altBackgroundColor','Footer Background Colour','footer');

		$this->makePlotColorPicker($wp_customize, 'plotFooterTextColor','bodyColor','Footer Text Colour','footer');
		
		$this->makePlotColorPicker($wp_customize, 'plotFooterTextHoverColor','highlightColor','Footer Text Hover Colour','footer');

		$this->makePlotColorPicker($wp_customize, 'plotPostFooterBackgroundColor','altBackgroundColor','Post Footer Background Colour','footer');

		$this->makePlotColorPicker($wp_customize, 'plotPostFooterTextColor','bodyColor','Post Footer Text Colour','footer');
		
		$this->makePlotColorPicker($wp_customize, 'plotPostFooterTextHoverColor','highlightColor','Post Footer Text Hover Colour','footer');


	}

	public function registerMobileMenuControls( $wp_customize ) {

		$this->makePlotColorPicker($wp_customize, 'plotMobileMenuBackgroundColor','highlightColor','Mobile Menu Background Colour','mobile_menu');

		$this->makePlotColorPicker($wp_customize, 'plotMobileMenuTextColor','white','Mobile Menu Text Colour','mobile_menu');

		$this->makePlotColorPicker($wp_customize, 'plotMobileMenuTextHoverColor','altHighlightColor','Mobile Menu Text Hover Colour','mobile_menu');

	}


	public function makePlotColorPicker($wp_customize,$settingName,$default,$label,$section) {

		$wp_customize->add_setting( $settingName,
		array(
			'default' => $default,
			'transport' => 'postMessage'
		)
		);
		$wp_customize->add_control( $settingName,
			array(
				'type' => 'select',
				'label' => $label,
				// 'description' => 'Remember you can change your palette under "Colours"',
				'section' => $section,
				'choices' => array(
					'black' 				=> 'Black',
					'white' 				=> 'White',
					'lighten' 				=> 'Lighten',
					'darken' 				=> 'Darken',
					'bodyColor' 			=> 'Main Text Colour',
					'backgroundColor'		=> 'Main Background Colour',
					'altBodyColor' 			=> 'Alternative Text Colour',
					'altBackgroundColor' 	=> 'Alternative Background Colour',
					'highlightColor'		=> 'Highlight Colour',
					'altHighlightColor'		=> 'Alternative Highlight Colour'
				)
			
		) );


	}
}

/**
 * Load all our Customizer Custom Controls
 */
require_once trailingslashit( dirname(__FILE__) ) . 'custom-controls.php';

/**
 * Initialise our Customizer settings
 */
$plot_settings = new plotCustomizer();
