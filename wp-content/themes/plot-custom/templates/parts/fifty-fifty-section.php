<section class="fiftyFifty plotLayout">

    <div class="maxWidth">
    
        <?php while ( has_sub_field('fifty_fifty_section')) : ?>

            <div class="fiftyFifty__row">

                <div class="fiftyFifty__svgWrap">

                    <?= get_sub_field('fifty_fifty_svg'); ?>

                </div>

                <div class="fiftyFifty__textWrap">

                    <?= get_sub_field('fifty_fifty_text'); ?>

                </div>

            </div>

        <?php endwhile; ?>

    </div>

</section>