<section class="faqs plotLayout sectionPadding">

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

            <?php $i = 0; while(has_sub_field('faqs_to_display')) : $i++ ?>

                <?php $faqID = get_sub_field('faq')->ID; ?>

                <div class="faq">

                    <input class="faq__checkbox" type="checkbox" id="faqs--<?= $i ?>">

                    <label for="faqs--<?= $i ?>">

                        <h3 class="faq__question"><?= get_the_title($faqID) ?></h3>

                        <div class="faq__answer">
                            <?= get_field('answer',$faqID) ?>
                        </div>
                        
                    </label>
                    

                    

                </div>

             <?php endwhile; ?>

        </div>

    </div>

</section>