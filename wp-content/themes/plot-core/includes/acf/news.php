<?php


acf_add_local_field_group([
	'key' => 'group_5d9f5accc0904',
	'title' => 'News Page',
	'fields' => [
		[
			'key' => 'field_5d9f5ad28634c',
			'label' => 'Articles per row',
			'name' => 'articles_per_row',
			'type' => 'range',
			'instructions' => 'How many articles do you want to display per row, on desktop? On mobile phones they will be one per row.',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => [
				'width' => '',
				'class' => '',
				'id' => '',
			],
			'default_value' => 2,
			'min' => 2,
			'max' => 4,
			'step' => '',
			'prepend' => '',
			'append' => '',
		],
		[
			'key' => 'field_5e1c92822dc1c',
			'label' => 'Allow Category Filters?',
			'name' => 'allow_category_filters',
			'type' => 'true_false',
			'instructions' => 'Would you like a filter of all article types for users to find categorised content?',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => [
				'width' => '',
				'class' => '',
				'id' => '',
			],
			'message' => '',
			'default_value' => 0,
			'ui' => 0,
			'ui_on_text' => '',
			'ui_off_text' => '',
		],
		[
			'key' => 'field_5e1cc48894c5b',
			'label' => 'Featured Articles',
			'name' => 'featured_articles',
			'type' => 'repeater',
			'instructions' => 'You can add in featured articles if you\'d like. These will show up at the top of the page- no matter what.',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => [
				'width' => '',
				'class' => '',
				'id' => '',
			],
			'collapsed' => '',
			'min' => 0,
			'max' => 3,
			'layout' => 'table',
			'button_label' => 'Add Article',
			'sub_fields' => [
				[
					'key' => 'field_5e1cc4ce94c5c',
					'label' => 'Article',
					'name' => 'article',
					'type' => 'post_object',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => [
						'width' => '',
						'class' => '',
						'id' => '',
					],
					'post_type' => [
						0 => 'post',
					],
					'taxonomy' => '',
					'allow_null' => 0,
					'multiple' => 0,
					'return_format' => 'id',
					'ui' => 1,
				],
			],
		],
	],
	'location' => [
		[
			[
				'param' => 'page',
				'operator' => '==',
				'value' => '393',
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
	'description' => 'Features for the main News listing page',
]);
