<?php

acf_add_local_field_group([
	'key' 		=> 'past_performances',
	'title' 	=> 'Past Performances Page',
	'fields' 	=> [
		[
			'key' 			=> 'past_performances_filters',
			'label' 		=> 'Allow Filters?',
			'name' 			=> 'allow_filters',
			'type' 			=> 'true_false',
			'instructions' 	=> 'Would you like to show a filter of all artist types?',
		],
		[
			'key' 			=> 'past_performances_category_all_text',
			'label' 		=> 'All Categories Button Text',
			'name' 			=> 'all_categories_button_text',
			'type' 			=> 'text',
			'instructions' 	=> 'Text to use on your button to display all categories of artists.',
			'required' 		=> 1,
			'default_value' => 'All',
			'conditional_logic'	=> [
				[
					[
						'field' => 'past_performances_filters',
						'value'	=> 1
					]
				]
			],
			'maxlength' 	=> 10
		],
		[
			'key' 			=> 'past_performances_desktop_rows',
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
				'value' 	=> '3878',
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
	'description' => 'Features for the Past Performances page',
]);
