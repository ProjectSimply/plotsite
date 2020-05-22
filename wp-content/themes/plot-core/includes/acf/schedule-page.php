<?php 

acf_add_local_field_group([
	'key' => 'group_5e1f40cd4c20e',
	'title' => 'Schedule Page',
	'fields' => [
		[
			'key' => 'field_5e6623e20c8a5',
			'label' => 'Show Performance Images',
			'name' => 'show_performance_images',
			'type' => 'true_false',
			'instructions' => 'Show thumbnails of artists or performance imagery on the schedule calendar.',
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
			'key' => 'field_5e663587f6ab3',
			'label' => 'Show Performance Descriptions',
			'name' => 'show_performance_descriptions',
			'type' => 'true_false',
			'instructions' => 'Each performance has a custom description on it. You can show or hide all of them, all at once here, on the schedule calendar.',
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
			'key' => 'field_5e1f40d503f58',
			'label' => 'Schedule File',
			'name' => 'schedule_file',
			'type' => 'file',
			'instructions' => 'If you\'d like to include a downloadable version of the schedule, normally in a PDF file, you can attach it here. It\'ll appear fixed on the schedule page. 🤓',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => [
				'width' => '',
				'class' => '',
				'id' => '',
			],
			'return_format' => 'url',
			'library' => 'all',
			'min_size' => '',
			'max_size' => '',
			'mime_types' => 'pdf,jpg,jpeg,png',
		],
	],
	'location' => [
		[
			[
				'param' => 'page',
				'operator' => '==',
				'value' => '919',
			],
		],
	],
	'menu_order' => 10,
	'position' => 'normal',
	'style' => 'default',
	'label_placement' => 'top',
	'instruction_placement' => 'label',
	'hide_on_screen' => '',
	'active' => true,
	'description' => 'Options for the schedule page',
]);