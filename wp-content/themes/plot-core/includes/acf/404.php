<?php

acf_add_local_field_group([
	'key' 		=> 'group_5e9c569d99f6d',
	'title' 	=> '404 Page Options',
	'fields' => [
		[
			'key' => 'field_5e9c57143e79c',
			'label' => 'Title',
			'name' => '404_title',
			'type' => 'text',
			'instructions' => '',
			'required' => 1,
			'conditional_logic' => 0,
			'wrapper' => [
				'width' => '',
				'class' => '',
				'id' => '',
			],
			'hide_admin' => 0,
			'default_value' => '404 Page Not Found',
			'placeholder' => '',
			'prepend' => '',
			'append' => '',
			'maxlength' => '',
		],
		[
			'key' => 'field_5e9c57283e79d',
			'label' => 'Content',
			'name' => '404_content',
			'type' => 'wysiwyg',
			'instructions' => '',
			'required' => 1,
			'conditional_logic' => 0,
			'wrapper' => [
				'width' => '',
				'class' => '',
				'id' => '',
			],
			'hide_admin' => 0,
			'default_value' => '',
			'tabs' => 'all',
			'toolbar' => 'full',
			'media_upload' => 1,
			'delay' => 0,
		],
	],
	'location' => [
		[
			[
				'param' => 'options_page',
				'operator' => '==',
				'value' => '404-page',
			],
		],
	],
	'menu_order' => 2,
	'position' => 'normal',
	'style' => 'default',
	'label_placement' => 'top',
	'instruction_placement' => 'label',
	'hide_on_screen' => '',
	'active' => true,
	'description' => '',
]);