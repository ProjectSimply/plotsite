<?php

acf_add_local_field_group([
	'key' 		=> 'domains',
	'title' 	=> 'Domains',
	'fields' 	=> [
		[
			'key' 			=> 'domains_primary',
			'label' 		=> 'Primary Domain',
			'name' 			=> 'primary_domain',
			'type' 			=> 'text',
			'instructions' 	=> 'Please pick which domain you\'d like to use as your main, visible domain. All other domains you add here will redirect to this.',
			'default_value'	=> HOLDING_DOMAIN
		],
		[
			'key' 			=> 'domains_additional',
			'label' 		=> 'Additional domains',
			'name' 			=> 'additional_domains',
			'type' 			=> 'repeater',
			'instructions' 	=> 'Add up to 4 additional domains. These will redirect to your chosen domain name above. Add up to 4.',
			'min' 			=> 0,
			'max' 			=> 4,
			'layout' 		=> 'block',
			'button_label' 	=> 'Add Domain',
			'sub_fields' 	=> [
				[
					'key' => 'domains_additional_url',
					'label' => 'URL',
					'name' => 'text',
					'type' => 'text',
					'instructions' => 'Please type in the format mydomain.com, without the https or http bit.',
					'required' 	   => 1,
					
				]	
			]
		]
	],
	'location' 	=> [
		[
			[
				'param' 	=> 'options_page',
				'operator' 	=> '==',
				'value' 	=> 'domains',
			],
		],
	]
]);
