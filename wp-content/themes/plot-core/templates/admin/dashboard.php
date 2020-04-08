<?php 
$dashboardLinks = [
	[	'uri' 		=> 'post.php?post=2&action=edit',
		'tag' 		=> 'home',
		'title' 	=> 'Home',
		'color'		=> 'plotRed'
	],
	[	'uri' 		=> 'edit.php?post_type=page',
		'tag' 		=> 'pages',
		'title' 	=> 'Pages',
		'color'		=> 'plotPurple'
	],
	[	'uri' 		=> 'edit.php?post_type=artist',
		'tag' 		=> 'artists',
		'title' 	=> 'Artists',
		'color'		=> 'plotPink'
	],
	[	'uri' 		=> 'post.php?post=1116&action=edit',
		'tag' 		=> 'faqs',
		'title' 	=> 'FAQs',
		'color'		=> 'plotSky'
	],
	[	'uri' 		=> 'wp-admin/edit.php',
		'tag' 		=> 'articles',
		'title' 	=> 'Articles',
		'color'		=> 'plotGreen'
	],
	[	'uri' 		=> 'admin.php?page=site-status',
		'tag' 		=> 'site-status',
		'title' 	=> 'Site Status',
		'color'		=> 'plotYellow'
	],
	[	'uri' 		=> 'edit.php?post_type=holding-page',
		'tag' 		=> 'partners',
		'title' 	=> 'Holding Pages',
		'color'		=> 'plotBlue'
	],
	[	'uri' 		=> 'post.php?post=398&action=edit',
		'tag' 		=> 'tickets',
		'title' 	=> 'Tickets',
		'color'		=> 'plotFuchsia'
	],
	[	'uri' 		=> 'admin.php?page=social-media',
		'tag' 		=> 'social',
		'title' 	=> 'Social Media',
		'color'		=> 'plotOrange'
	],
	[	'uri' 		=> 'post.php?post=1133&action=edit',
		'tag' 		=> 'gallery',
		'title' 	=> 'Gallery',
		'color'		=> 'plotPeach'
	],

	[	'uri' 		=> 'admin.php?page=wpforms-overview',
		'tag' 		=> 'forms',
		'title' 	=> 'Forms',
		'color'		=> 'plotMint'
	]

];

if(SITEBUILDER) {
	$dashboardLinks[] = 

	[	'uri' 		=> 'customize.php',
		'tag' 		=> 'customizer',
		'title' 	=> 'Customizer',
		'color'		=> 'plotPurple'
	];
}


?>

<h1 class="plotWelcome">
<?php $user = wp_get_current_user(); ?>

    Hello<?= $user->user_firstname ? ' ' . $user->user_firstname : ''; ?>! What would you like to do today?

</h1>

<?php foreach($dashboardLinks as $dashboardLink) : ?>

	<a href="<?= $dashboardLink['uri'] ?>" class="dashboardLink dashboardLink--home <?= $dashboardLink['color'] ?>">

		<div class="dashboardLink__contentWrap">

			<img class="dashboardLink__icon" src="<?= get_template_directory_uri() . '/assets/admin/icons/' . $dashboardLink['tag'] . '.svg' ?>">

			<p class="dashboardLink__title"><?= $dashboardLink['title'] ?></p>

		</div>

	</a>

<?php endforeach; ?>