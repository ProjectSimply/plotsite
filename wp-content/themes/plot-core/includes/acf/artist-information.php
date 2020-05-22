<?php


acf_add_local_field_group([
	'key' 		=> 'group_5bbcc61966859',
	'title' 	=> 'Artist Information',
	'fields' 	=> [
		[
			'key' 			=> 'artist_info_archive',
			'label' 		=> 'Archive this artist',
			'name' 			=> 'archive',
			'type' 			=> 'true_false',
			'instructions' 	=> 'This will move the artist over to the "past artists" area and hide them from your artist listings.'
		],
		[
			'key' 			=> 'artist_info_archive_category',
			'label' 		=> 'Year of artist',
			'name' 			=> 'archive_year',
			'type' 			=> 'text',
			'instructions' 	=> 'What year did this artist perform? This will be filterable on the "past artist" page.',
			'required' => 1,
			'conditional_logic' => [
				[
					[
						'field' => 'artist_info_archive',
						'operator' => '==',
						'value' => '1',
					],
				],
			],
			'wrapper' => [
				'width' => '',
				'class' => 'plotAcfHalf',
				'id' => '',
			],
			'placeholder' => 'eg. 2019'
		],
		[
			'key' 			=> 'field_5e1c489d8ec56',
			'label' 		=> 'Banner Image',
			'name' 			=> 'banner_image',
			'type' 			=> 'image',
			'instructions' 	=> 'Pick a banner image to display at the top of the biog. This image should be around 2500 pixels wide to make sure it looks great on big desktop screens. It will automatically compress and resize to be perfect for web.',
			'return_format' => 'array',
			'preview_size' 	=> 'thumbnail',
			'wrapper' => [
				'class' 		=> 'plotAcfHalf plotBlockLinkPreview--artistImage plotAcfHalf--withClear'
			],
		],
		[
			'key' 			=> 'field_5e1c48ca8ec57',
			'label' 		=> 'Small Screen Banner Image',
			'name' 			=> 'small_screen_banner_image',
			'type' 			=> 'image',
			'instructions' 	=> 'An optional image for smaller screens like phones. Good if you want an alternate crop on smaller screens. Can be 1200px wide. If left blank we\'ll just deliver the larger image, scaled down in size.',
			'return_format' => 'array',
			'preview_size' 	=> 'thumbnail',
			'wrapper' 		=> [
				'class'			=> 'plotAcfHalf plotBlockLinkPreview plotBlockLinkPreview--artistImage plotBlockLinkPreview--artistImage--smallScreen'
			]
		],
		[
			'key' => 'field_5bbcd3d672cd4',
			'label' => 'Featured Image',
			'name' => 'featured_image',
			'type' => 'image',
			'instructions' => 'For use in artist listing pages on the website.',
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
		[
			'key' => 'field_5bbcc622f7d11',
			'label' => 'Biog',
			'name' => 'biog',
			'type' => 'wysiwyg',
			'instructions' => 'Information about this artist that will display on their artist page.',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => [
				'width' => '',
				'class' => '',
				'id' => '',
			],
			'default_value' => '',
			'tabs' => 'all',
			'toolbar' => 'full',
			'media_upload' => 1,
			'delay' => 0,
		],
		[
			'key' => 'artist_info_embed',
			'label' => 'Embed',
			'name' => 'embed',
			'type' => 'oembed',
			'instructions' => 'Paste a URL of an embed you\'d like to include, for example from Youtube, Soundcloud, Bandcamp or Spotify.'
		]
	],
	'location' => [
		[
			[
				'param' => 'post_type',
				'operator' => '==',
				'value' => 'artist',
			],
		],
	],
	'menu_order' => 11,
	'position' => 'normal',
	'style' => 'default',
	'label_placement' => 'top',
	'instruction_placement' => 'label',
	'hide_on_screen' => [
		0 => 'permalink',
		1 => 'the_content',
		2 => 'excerpt',
		3 => 'discussion',
		4 => 'comments',
		5 => 'revisions',
		6 => 'slug',
		7 => 'author',
		8 => 'format',
		9 => 'page_attributes',
		10 => 'featured_image',
		11 => 'categories',
		12 => 'tags',
		13 => 'send-trackbacks',
	],
	'active' => true,
	'description' => 'Basic artist features',
]);