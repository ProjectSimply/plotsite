<section class="plotLayout textLineup textLineup--<?= get_sub_field('plotcms_alignment') ?>">

	<div class="maxWidth">

		<div class="textLineup__intro">

            <?php if(get_sub_field('heading')) : ?>

                <h6 class="textLineup__heading miniHeading"><?= get_sub_field('heading') ?></h6>

            <?php endif ?>

        </div>

        <?php $tier = 1; ?>
        <?php $tiers = get_sub_field('tiers'); ?>
        <?php $endText = get_sub_field('end_text'); ?>

        <?php while(has_sub_field('tiers')) : ?>

            <?php $separator = get_sub_field('separator'); ?>

            <?php if($separator == "★") $ordSep = 'star'; ?>
            <?php if($separator == ",") $ordSep = 'comma'; ?>
            <?php if($separator == "•") $ordSep = 'bullet'; ?>
            <?php if($separator == "|") $ordSep = 'pipe'; ?>

            <?php $textColor = get_sub_field('plotcms_text_color') ? '--bodyColor: var(--' . get_sub_field('plotcms_text_color') . ');' : ''; ?>

            <?php $fontWeight = get_sub_field('plotcms_font_weight'); ?>
            <?php $font = get_sub_field('plotcms_font'); ?>
            <?php $fontStyle = get_sub_field('plotcms_font_style'); ?>

            <?php $separatorColor = get_sub_field('plotcms_separator_color') ? '--bodyColor: var(--' . get_sub_field('plotcms_separator_color') . ')' : ''; ?>

            <div class="textLineup__tier <?= get_sub_field('allow_artists_to_text_wrap') ? 'textLineup__tier--inline' : '' ?> textLineup__tier--<?= $tier ?>" style="<?= $font == 'heading' ? '--primaryFontFamily:var(--headingsFontFamily); ' : ''; ?>">

                <?php while(has_sub_field('artists')) : ?>

                    <span class="textLineup__artist" style="
                        <?= $fontWeight == 'bold' ? 'font-weight:bold; ' : ''; ?>
                        <?= $textColor ?>
                        <?= $fontStyle == 'uppercase' ? 'text-transform:uppercase; ' : ''; ?>
                        ">

                        <span class="textLineup__artistText"><?= get_sub_field('artist')->post_title ?></span>

                        <span class="textLineup__separator textLineup__separator--<?= $ordSep ?>" style="<?= $separatorColor ?>"><?= $separator ?></span>

                    </span>

                <?php endwhile; ?>



                <?php if($tier == sizeof($tiers) && $endText) : ?>

                    <div class="textLineup__endText"><?= $endText ?></div>                

                <?php endif; ?>

            </div>

            <?php $tier++; ?>
        
        <?php endwhile; ?>

        <?php if(get_sub_field('add_a_button')) : ?>

            <div class="buttonWrap centered">

              <a href="<?= get_sub_field('button_link') ?>" class="plotButton"><?= get_sub_field('button_text') ?></a>

            </div>

        <?php endif; ?>

    </div>

</section>