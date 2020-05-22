<?php

acf_add_local_field_group([
	'key' 		=> 'whats_on',
	'title' 	=> 'What\'s On Page',
	'fields' 	=> [
		[
			'key' 			=> 'whats_on_filters',
			'label' 		=> 'Allow Filters?',
			'name' 			=> 'allow_filters',
			'type' 			=> 'true_false',
			'instructions' 	=> 'Would you like to show a filter of all artist types?',
		],
		[
			'key' 			=> 'whats_on_allow_day_filters',
			'label' 		=> 'Allow Day Filters',
			'name' 			=> 'allow_day_filters',
			'type' 			=> 'true_false',
			'instructions' 	=> 'Buttons that break down your performances by day.',
			'required' 		=> 0,
			'default_value' => 1
		],
		[
			'key' 			=> 'whats_on_category_all_text',
			'label' 		=> 'All Categories Button Text',
			'name' 			=> 'all_categories_button_text',
			'type' 			=> 'text',
			'instructions' 	=> 'Text to use on your button to display all categories of artists.',
			'required' 		=> 1,
			'default_value' => 'All',
			'conditional_logic'	=> [
				[
					[
						'field' 	=> 'whats_on_filters',
						'value'		=> 1
					]
				]
			],
			'maxlength' 	=> 10
		],
		[
			'key' => 'whats_on_featured_performances',
			'label' => 'Featured Performances',
			'name' => 'featured_performances',
			'type' => 'repeater',
			'instructions' => 'You can add in featured performances if you\'d like. These will show up at the top of the page.',
			'min' => 0,
			'max' => 3,
			'layout' => 'table',
			'button_label' => 'Add Performance',
			'sub_fields' => [
				[
					'key' 			=> 'whats_on_featured_performances_performance',
					'label' 		=> 'Performance',
					'name' 			=> 'performance',
					'type' 			=> 'post_object',
					'instructions' 	=> '',
					'required' 		=> 1,
					'post_type' 	=> [
							0 => 'performance',
					],
					'return_format' => 'object'
				]
			]
		],
		[
			'key' 			=> 'whats_on_desktop_rows',
			'label' 		=> 'Desktop rows',
			'name' 			=> 'desktop_rows',
			'type' 			=> 'radio',
			'instructions' 	=> 'How many performances do you want to display per row on desktop? On phones we\'ll stack one by one anyway.',
			'required' 		=> 1,
			'choices' => [
				2 => 'Two per row',
				3 => 'Three per row',
				4 => 'Four per row',
			],
			'default_value' => 3
		]
	],
	'location' => [
		[
			[
				'param' 	=> 'page',
				'operator' 	=> '==',
				'value' 	=> '3834',
			],
		],
	],
	'menu_order' => 23,
	'position' => 'normal',
	'style' => 'default',
	'label_placement' => 'top',
	'instruction_placement' => 'label',
	'hide_on_screen' => '',
	'active' => true,
	'description' => 'Features for the Whats On page',
]);
