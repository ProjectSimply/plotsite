<?php plotGetTemplatePart('parts/header') ?>

<?php plotGetTemplatePart('parts/banner') ?>

<div class="faqs">

	<div class="maxWidth">

		<div class="faqsMain">

			<?php $faqTypes = get_terms( [
			    'taxonomy' 		=> 'faq-type',
			    'hide_empty' 	=> true
			] ); ?>

			<?php if($faqTypes) : ?>

				<div class="faqTypes">

					<a class="faqTypes__type plotButton <?= !is_tax() ? 'selected' : '' ?>" href="<?= get_the_permalink() ?>">All</a>

					<?php foreach($faqTypes as $faqType) : ?>
						<a class="faqTypes__type plotButton <?= $faqType->slug == get_query_var('term') ? 'selected' : '' ?>" href="<?= get_term_link($faqType->term_id) ?>"><?= $faqType->name ?></a>

					<?php endforeach; ?>

				</div>

			<?php endif; ?>

			<div class="faqsContent">

				<?php $args = [
					'post_type' 		=> 'faq',
					'posts_per_page'	=> -1
				]; 

				//This page displays if we're a filtered list of taxonomy -> faq-type.
				if(is_tax()) 
					$args['tax_query'] = [
											[
									            'taxonomy' 	=> 'faq-type',
									            'field' 	=> 'slug',
									            'terms' 	=> get_query_var( 'term' )
				        					]
				        ];

				$faqQuery = new WP_Query($args);

				while($faqQuery->have_posts()) : $faqQuery->the_post(); ?>

					<div class="faq">

						<h3><?= get_the_title(); ?></h3>

						<div class="faq__answer"><?= get_field('answer') ?></div>

					</div>

				<?php endwhile; ?>

			</div>

		</div>

	</div>

</div>

<?php plotGetTemplatePart('parts/footer') ?>
