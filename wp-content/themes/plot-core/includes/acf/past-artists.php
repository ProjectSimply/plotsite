<?php

acf_add_local_field_group([
	'key' => 'past_artists',
	'title' => 'Past Artist Page Options',
	'fields' => [
		[
			'key' 			=> 'past_artists_type_filters',
			'label' 		=> 'Allow Artist Type Filters',
			'name' 			=> 'allow_artist_type_filters',
			'type' 			=> 'true_false',
			'instructions' 	=> 'If you\'d like to display a list of artist types that can filter your A-Z of artists, tick this chap. 🙏'
		],
		[
			'key' 			=> 'past_artists_year_filters',
			'label' 		=> 'Allow Year Filters',
			'name' 			=> 'allow_year_filters',
			'type' 			=> 'true_false',
			'instructions' 	=> 'Buttons that break down your artist list by the years they performed.',
			'default_value' => 1
		],
		[
			'key' 			=> 'past_artists_desktop_rows',
			'label' 		=> 'Desktop rows',
			'name' 			=> 'desktop_rows',
			'type' 			=> 'radio',
			'instructions' 	=> 'How many artists do you want to display per row on desktop? On phones we\'ll stack one by one anyway.',
			'required' 		=> 1,
			'choices' => [
				3 				=> 'Three per row',
				4 				=> 'Four per row'
			],
			'default_value' => 3,
			'layout' => 'vertical',
			'return_format' => 'value'
		],
		[
			'key' 			=> 'past_artists_category_all_text',
			'label' 		=> 'All Categories Button Text',
			'name' 			=> 'all_categories_button_text',
			'type' 			=> 'text',
			'instructions' 	=> 'Text to use on your button to display all categories of artists.',
			'required' 		=> 1,
			'default_value' => 'All',
			'maxlength' 	=> 10
		],
		[
			'key' 			=> 'past_artists_no_results_message',
			'label' 		=> 'No Results Message',
			'name' 			=> 'no_results_message',
			'type' 			=> 'text',
			'instructions' 	=> 'Message to show your visitors if they manage to hit a combination of filters resulting in no results. Not likely to happen- but could!',
			'default_value' => 'No artists found :( Please try a different search.'
		],
	],
	'location' => [
		[
			[
				'param' 	=> 'page',
				'operator' 	=> '==',
				'value' 	=> '3828'
			]
		]
	],
	'menu_order' 			=> 19,
	'position' 				=> 'normal',
	'style' 				=> 'default',
	'label_placement' 		=> 'top',
	'instruction_placement' => 'label',
	'active' 				=> true,
	'description' 			=> 'Specific options and fields for the past artist page'
]);