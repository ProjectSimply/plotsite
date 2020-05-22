<?php 

acf_add_local_field_group([
	'key' => 'group_5e1f649dd3064',
	'title' => 'Tracking Scripts',
	'fields' => [
		[
			'key' => 'field_5e1f64a24d9b6',
			'label' => 'Google Tag Manager ID',
			'name' => 'gtm_id',
			'type' => 'text',
			'instructions' => 'Paste in your Google Tag Manager Account ID here.

Log in to your Google Tag Manager account and open a container. In the top right corner (next to the Submit and Preview buttons] you’ll see some short text that starts with GTM- and then contains some letters/numbers. That’s your Google Tag Manager ID. Paste it in, for example "GTM-b24324"',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => [
				'width' => '',
				'class' => '',
				'id' => '',
			],
			'default_value' => '',
			'placeholder' => '',
			'prepend' => '',
			'append' => '',
			'maxlength' => '',
		],
		[
			'key' => 'field_5e1f65404d9b7',
			'label' => 'Other snippets',
			'name' => 'other_snippets',
			'type' => 'repeater',
			'instructions' => 'Sometimes you have other tracking codes you need to put in. These will all be added to the bottom of your site, just before the body tag. Be careful here friend. 🧑🏻‍✈️',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => [
				'width' => '',
				'class' => '',
				'id' => '',
			],
			'collapsed' => '',
			'min' => 1,
			'max' => 0,
			'layout' => 'table',
			'button_label' => '',
			'sub_fields' => [
				[
					'key' => 'field_5e1f65714d9b8',
					'label' => 'Code',
					'name' => 'code',
					'type' => 'textarea',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => [
						'width' => '',
						'class' => '',
						'id' => '',
					],
					'default_value' => '',
					'placeholder' => '',
					'maxlength' => '',
					'rows' => '',
					'new_lines' => '',
				],
			],
		],
	],
	'location' => [
		[
			[
				'param' => 'options_page',
				'operator' => '==',
				'value' => 'tracking-scripts',
			],
		],
	],
	'menu_order' => 6,
	'position' => 'normal',
	'style' => 'default',
	'label_placement' => 'top',
	'instruction_placement' => 'label',
	'hide_on_screen' => '',
	'active' => true,
	'description' => 'Tag Manager, and ability to put in custom JS in the footer',
]);