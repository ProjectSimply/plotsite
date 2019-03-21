<?php if(get_sub_field('faq')) : ?>

    <?php $faqs = get_sub_field('faq') ?>
    
    <section class="scrollItem faqs <?= get_sub_field('identifier') ? 'faq--' . get_sub_field('identifier') : '' ?> section<?= get_sub_field('colour_scheme') ?>">

        <?php if(get_sub_field('heading')) : ?>

            <div class="row">
                <div class="columns">
                    <h3 class="scrollItem plotSectionHeading textCenter"><?= the_sub_field('heading'); ?></h3>
                </div>
            </div>

        <?php endif; ?>

        <div class="row">

            <div class="columns medium-9 medium-centered large-8">

                <?php foreach($faqs as $faq) : ?>
                    
                    <div class="faq"> 
                        <h5 class="faq__question"><?= get_the_title($faq->ID) ?></h5>
                        <div class="faq__answer"><?= get_field('answer', $faq->ID) ?></div>
                    </div>

                <?php endforeach ?>

            </div>

        </div>

    </section>

<?php endif ?>
