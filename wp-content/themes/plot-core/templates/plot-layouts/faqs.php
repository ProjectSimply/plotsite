<section class="faqs plotLayout">

    <div class="maxWidth">

        <div class="faqs__inner">

            <div class="faqs__intro">

                <?php if(get_sub_field('heading')) : ?>

                    <h2 class="faqs__heading"><?= get_sub_field('heading') ?></h2>

                <?php endif ?>

                <?php if(get_sub_field('introduction')) : ?>

                    <?= get_sub_field('introduction') ?>

                <?php endif; ?>

            </div>

            <?php while(has_sub_field('faqs_to_display')) : ?>

                <?php $faqID = get_sub_field('faq')->ID; ?>

                <div class="faq">

                    <h3 class="faq__question"><?= get_the_title($faqID) ?></h3>

                    <?= get_field('answer',$faqID) ?>

                </div>

             <?php endwhile; ?>

        </div>

    </div>

</section>