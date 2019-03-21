<article class="article scrollItem">

    <svg class="article__svg article__svg--1" viewBox="0 0 74 74" fill="none">
        <path class="article__svgPath" d="M74 17.1775L56.8225 0L37 19.8225L17.1775 0L0 17.1775L19.8225 37L0 56.8225L17.1775 74L37 54.1775L56.8225 74L74 56.8225L54.1775 37L74 17.1775Z" />
    </svg>

    <svg class="article__svg article__svg--2" viewBox="0 0 74 74" fill="none">
        <path class="article__svgPath" d="M74 17.1775L56.8225 0L37 19.8225L17.1775 0L0 17.1775L19.8225 37L0 56.8225L17.1775 74L37 54.1775L56.8225 74L74 56.8225L54.1775 37L74 17.1775Z" />
    </svg>

    <a class="article__link" href="<?php the_permalink() ?>">

        <?php $image = get_field('banner_image') ? get_field('banner_image') ['sizes']['half'] : IMAGES . '/fallbacks/banner.jpg' ?>
        
        <img class="article__image" src="<?= $image ?>" alt="<?php the_title() ?>">    

        <div class="article__date"><?= get_the_date('d-m-Y') ?></div>
        <h4 class="article__heading"><?php the_title() ?></h4>
        <div class="article__excerpt"><?php the_excerpt() ?></div>

    </a>

</article>
