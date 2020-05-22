<?php 

function plotLayoutFeaturedPerformances() {

	return [
		'key' 		=> 'featured_performances_layout',
		'name' 		=> 'featured-performances',
		'label' 	=> 'Featured Performances',
		'display' 	=> 'block',
		'sub_fields' => [
			[
				'key' 			=> 'featured_performances_color_scheme',
				'label' 		=> 'Colour Scheme',
				'name' 			=> 'plotcms_color_scheme',
				'type' 			=> 'radio',
				'instructions' 	=> 'Remember! Your colour palettes can be set in the site Customizer.',
				'choices' => [
					'standard' 		=> 'Site Background Colour',
					'alternative' 	=> 'Alternative Background Colour'
				],
				'default_value' => 'standard'
			],
			[
				'key' 			=> 'featured_performances_heading',
				'label' 		=> 'Heading',
				'name' 			=> 'heading',
				'type' 			=> 'text',
				'instructions' 	=> 'Give a heading to this section if you\'d like.'
			],
			[
				'key' 			=> 'featured_performances_include_introduction',
				'label' 		=> 'Include an introduction?',
				'name' 			=> 'include_an_introduction',
				'type' 			=> 'true_false',
				'instructions' 	=> 'If you\'d like a short bit of content before the performance blocks.'
			],
			[
				'key' 			=> 'featured_performances_introduction',
				'label' 		=> 'Introduction',
				'name' 			=> 'introduction',
				'type' 			=> 'wysiwyg',
				'conditional_logic' => [
					[
						[
							'field' 	=> 'featured_performances_include_introduction',
							'operator' 	=> '==',
							'value' 	=> '1',
						],
					],
				],
				'toolbar' => 'basic',
				'media_upload' => 0,
			],
			[
				'key' 			=> 'featured_performances_include_descriptions',
				'label' 		=> 'Include performance descriptions?',
				'name' 			=> 'include_descriptions',
				'type' 			=> 'true_false'
			],
			[
				'key' 			=> 'featured_performances_per_row',
				'label' 		=> 'Performances Per Row',
				'name' 			=> 'per_row',
				'type' 			=> 'range',
				'instructions' 	=> 'How many would you like to display per row on desktop screens?',
				'required' 		=> 1,
				'default_value' => 2,
				'min' 			=> 1,
				'max' 			=> 4
			],
			[
				'key' 			=> 'featured_performances_performances',
				'label' 		=> 'Performances',
				'name' 			=> 'performances',
				'type' 			=> 'repeater',
				'instructions' 	=> 'Please add in as many performances as you\'d like to feature',
				'required' 		=> 1,
				'min' 			=> 1,
				'max' 			=> 9,
				'button_label' 		=> 'Add Performance',
				'sub_fields' => [
					[
						'key' 		=> 'featured_performances_performance',
						'label' 	=> 'Performance',
						'name' 		=> 'performance',
						'type' 		=> 'post_object',
						'required' 	=> 1,
						'post_type' => [
							0 => 'performance',
						],
						'return_format' => 'object',
					],
				],
			],
			[
				'key' 			=> 'featured_performances_button',
				'label' 		=> 'Add a button?',
				'name' 			=> 'add_a_button',
				'type' 			=> 'true_false',
				'instructions' 	=> 'You can add a button at the bottom of this section. Typically a "view all performances" button. But can be anything you\'d like! 🎰',
			],
			[
				'key' 			=> 'featured_performances_button_link',
				'label' 		=> 'Button Link',
				'name' 			=> 'button_link',
				'type' 			=> 'text',
				'instructions' 	=> 'Paste in a link for you lovely button.',
				'required' 		=> 1,
				'conditional_logic' => [
					[
						[
							'field' 		=> 'featured_performances_button',
							'operator' 		=> '==',
							'value' 		=> '1',
						],
					],
				],
			],
			[
				'key' 			=> 'featured_performances_button_text',
				'label' 		=> 'Button Text',
				'name' 			=> 'button_text',
				'type' 			=> 'text',
				'instructions' 	=> 'What text do you want on the button?',
				'required' 		=> 1,
				'conditional_logic' => [
					[
						[
							'field' 		=> 'featured_performances_button',
							'operator' 		=> '==',
							'value' 		=> '1',
						],
					],
				],
			],
		],
		'min' => '',
		'max' => '',
	];
}