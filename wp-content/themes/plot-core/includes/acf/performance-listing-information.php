<?php


acf_add_local_field_group([
	'key' => 'group_5bc83c5d8e498',
	'title' => 'Listings Information',
	'fields' => [
		[
			'key' => 'field_5c87d2f546f3d',
			'label' => 'Featured Image',
			'name' => 'featured_image',
			'type' => 'image',
			'instructions' => 'This will be used on the news listing page, and any feature articles area.',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => [
				'width' => '',
				'class' => '',
				'id' => '',
			],
			'return_format' => 'array',
			'preview_size' => 'thumbnail',
			'library' => 'all',
			'min_width' => '',
			'min_height' => '',
			'min_size' => '',
			'max_width' => '',
			'max_height' => '',
			'max_size' => '',
			'mime_types' => '',
		],
	],
	'location' => [
		[
			[
				'param' => 'post_type',
				'operator' => '==',
				'value' => 'post',
			],
		],
	],
	'menu_order' => 16,
	'position' => 'normal',
	'style' => 'default',
	'label_placement' => 'top',
	'instruction_placement' => 'label',
	'hide_on_screen' => [
		0 => 'the_content',
		1 => 'excerpt',
		2 => 'discussion',
		3 => 'comments',
		4 => 'slug',
		5 => 'author',
		6 => 'format',
		7 => 'page_attributes',
		8 => 'featured_image',
		9 => 'tags',
		10 => 'send-trackbacks',
	],
	'active' => true,
	'description' => 'Specific features for article pages',
]);