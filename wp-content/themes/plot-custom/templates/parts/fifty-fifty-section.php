<section class="fiftyFifty plotLayout" data-plot-smooth-scroll-element>

    <div class="maxWidth">
    
        <?php while ( has_sub_field('fifty_fifty_section')) : ?>

            <div class="fiftyFifty__row" data-plot-smooth-scroll-element>

                <div class="fiftyFifty__svgWrap">

                    <?= get_sub_field('fifty_fifty_svg'); ?>

                </div>

                <div class="fiftyFifty__textWrap growIn">

                    <?= get_sub_field('fifty_fifty_text'); ?>

                </div>

            </div>

        <?php endwhile; ?>

    </div>

</section>