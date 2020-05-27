<section class="faqs plotLayout sectionPadding">

    <div class="maxWidth--sml">

        <div class="faqs__inner">

            <div class="faqs__intro">

                <?php if(get_sub_field('heading')) : ?>

                    <h2 class="faqs__heading"><?= get_sub_field('heading') ?></h2>

                <?php endif ?>

                <?php if(get_sub_field('introduction')) : ?>

                    <?= get_sub_field('introduction') ?>

                <?php endif; ?>

            </div>

            <?php $i = 0; while(has_sub_field('faqs_to_display')) : $i++ ?>

                <?php $faqID = get_sub_field('faq')->ID; ?>

                <div class="faq">

                    <h5 class="faq__question"><?= get_the_title($faqID) ?></h5>

                    <div class="faq__answer">
                        <?= get_field('answer',$faqID) ?>
                    </div>
                                                                
                </div>

             <?php endwhile; ?>

        </div>

    </div>

</section>