<section class="plotLayout textLineup">

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

            <div class="textLineup__tier textLineup__tier--<?= $tier ?>">

                <?php while(has_sub_field('artists')) : ?>

                    <span class="textLineup__artist">

                        <span class="textLineup__artistText">
                            <?= get_sub_field('artist')->post_title ?>
                        </span>


                        <span class="textLineup__separator textLineup__separator--<?= ord($separator) ?>"><?= $separator ?></span>

                    </span>

                <?php endwhile; ?>



                <?php if($tier == sizeof($tiers) && $endText) : ?>

                    <div class="textLineup__endText"><?= $endText ?></div>                

                <?php endif; ?>

            </div>

            <?php $tier++; ?>
        
        <?php endwhile; ?>

    </div>

</section>