<?php 

acf_add_local_field_group([
	'key' => 'group_5ea2db640a218',
	'title' => 'Partner Options',
	'fields' => [
		[
			'key' => 'field_5ea2dc9846c99',
			'label' => 'Colour Scheme',
			'name' => 'plot_cms_partners_footer_color_scheme',
			'type' => 'select',
			'instructions' => 'This is the colour scheme for use on your partners section above the footer, if included. Remember! Your colour palettes can be set in the site Customizer. 🐕',
			'choices' => [
				'standard' => 'Site Background Colour',
				'alternative' => 'Alternative Background Colour',
			],
			'default_value' => [
			],
			'return_format' => 'value',
		],
		[
			'key' => 'field_5ea2db6846c96',
			'label' => 'Display Options',
			'name' => 'display_partners_options',
			'type' => 'radio',
			'instructions' => '',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => [
				'width' => '',
				'class' => '',
				'id' => '',
			],
			'hide_admin' => 0,
			'choices' => [
				'exclude' => 'Add partner logos to every page, apart from pages I pick here',
				'include' => 'Let me pick which pages partner logos appear on myself',
			],
			'allow_null' => 0,
			'other_choice' => 0,
			'default_value' => 'include',
			'layout' => 'vertical',
			'return_format' => 'value',
			'save_other_choice' => 0,
		],
		[
			'key' => 'field_5ea2dc0e46c97',
			'label' => 'Pages to hide partners on',
			'name' => 'pages_to_hide_partners',
			'type' => 'post_object',
			'instructions' => 'Pick which pages you\'d like to hide the partners section on',
			'required' => 0,
			'conditional_logic' => [
				[
					[
						'field' => 'field_5ea2db6846c96',
						'operator' => '==',
						'value' => 'exclude',
					],
				],
			],
			'wrapper' => [
				'width' => '',
				'class' => '',
				'id' => '',
			],
			'hide_admin' => 0,
			'post_type' => [
				0 => 'post',
				1 => 'page',
				2 => 'performance',
				3 => 'stage',
				4 => 'artist',
			],
			'taxonomy' => '',
			'allow_null' => 0,
			'multiple' => 1,
			'return_format' => 'id',
			'ui' => 1,
		],
		[
			'key' => 'field_5ea2dc5746c98',
			'label' => 'Pages to show partners on',
			'name' => 'pages_to_show_partners',
			'type' => 'post_object',
			'instructions' => 'Pick which pages you\'d like to hide the partners section on',
			'required' => 0,
			'conditional_logic' => [
				[
					[
						'field' => 'field_5ea2db6846c96',
						'operator' => '==',
						'value' => 'include',
					],
				],
			],
			'wrapper' => [
				'width' => '',
				'class' => '',
				'id' => '',
			],
			'hide_admin' => 0,
			'post_type' => [
				0 => 'post',
				1 => 'page',
				2 => 'performance',
				3 => 'stage',
				4 => 'artist',
			],
			'taxonomy' => '',
			'allow_null' => 0,
			'multiple' => 1,
			'return_format' => 'id',
			'ui' => 1,
		],
	],
	'location' => [
		[
			[
				'param' => 'options_page',
				'operator' => '==',
				'value' => 'partner-options',
			],
		],
	],
	'menu_order' => 1,
	'position' => 'normal',
	'style' => 'default',
	'label_placement' => 'top',
	'instruction_placement' => 'label',
	'hide_on_screen' => '',
	'active' => true,
	'description' => '',
]);