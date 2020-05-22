<?php

acf_add_local_field_group([
	'key' 		=> 'ssl',
	'title' 	=> 'SSL Options',
	'fields' 	=> [
		[
			'key' 			=> 'ssl_ssl',
			'label' 		=> 'Turn on SSL for this website.',
			'name' 			=> 'ssl_ssl',
			'type' 			=> 'true_false',
			'instructions' 	=> 'Add SSL (security certificate) for this website. Highly recommended. 🔑'
		]
	],
	'location' 	=> [
		[
			[
				'param' 	=> 'options_page',
				'operator' 	=> '==',
				'value' 	=> 'ssl',
			],
		],
	]
]);
