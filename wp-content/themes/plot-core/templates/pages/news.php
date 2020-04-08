<?php plotGetTemplatePart('parts/header') ?>

<?php plotGetTemplatePart('parts/banner') ?>

<div class="newsMain">

	<div class="maxWidth">

		<div class="newsList">

			<?php if(get_field('allow_category_filters')) : ?>

				<div class="newsCategories">

					<?php $categories = get_terms( [
					    'taxonomy' 		=> 'category',
					    'hide_empty' 	=> true
					] ); ?>

					<?php if($categories) : ?>

						<a class="newsCategories__cat plotButton <?= !is_tax() ? 'selected' : '' ?>" href="<?= get_the_permalink() ?>">All</a>

						<?php foreach($categories as $category) : ?>

							<a class="newsCategories__cat plotButton" href="<?= get_category_link($category->term_id) ?>"><?= $category->name ?></a>

						<?php endforeach; ?>

					<?php endif; ?>

				</div>

			<?php endif; ?>

			<?php if(get_field('featured_articles')) : ?>

				<div class="news__featuredArticles news__featuredArticles--<?= sizeof(get_field('featured_articles')) ?>items">

					<?php while(has_sub_field('featured_articles')) : ?>

						<?php plotGetTemplatePart('parts/news-block',['postId' => get_sub_field('article')]); ?>

					<?php endwhile; ?>

				</div>

			<?php endif; ?>

			<div class="JS--ajaxTargetArea news__grid JS--newsGrid news__grid--<?= get_field('articles_per_row',393) ?>perRow">

				<?= plotGetTemplatePart('parts/news-listing') ?>

			</div>

			<button class="plotPagination plotPagination--news plotPagination--newsLoadMore JS--newsLoadMore" data-next-page="2">Load More</button>

		</div>

	</div>

</div>

<?php plotGetTemplatePart('parts/footer') ?>
