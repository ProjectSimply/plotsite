<?php plotGetTemplatePart('parts/header') ?>

<?php $trackingCode = empty($_GET['code']) ? '' : $_GET['code']; ?>

<section class="banner thankYouBanner sectionWithVerticalSpacing" data-thank-you="<?= $trackingCode ?>">

        <div class="banner__contentWrap">

            <div class="maxWidth">

                <div class="textOnlyBanner__asset textOnlyBanner__asset--1">

                    <svg viewBox="0 0 310 313" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.1" d="M310 74.4196L237.958 0L155 85.3637L72.0423 0L0 72.2308L82.9578 157.594L0 240.769L72.0423 313L155 229.825L237.958 313L310 240.769L227.042 157.594L310 74.4196Z"></path>
                    </svg>


                </div>

                <div class="textOnlyBanner__asset textOnlyBanner__asset--2">

                    <svg viewBox="0 0 310 313" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.1" d="M310 74.4196L237.958 0L155 85.3637L72.0423 0L0 72.2308L82.9578 157.594L0 240.769L72.0423 313L155 229.825L237.958 313L310 240.769L227.042 157.594L310 74.4196Z"></path>
                    </svg>

                </div>

                <div class="thanksPage">

                <h1 class="textOnlyBanner__title">Thanks so much!</h1>

                    <?php if($trackingCode == 'f') : ?>
                        <p>A copy of the Festival Insights is on its way to your email. We've also set up a Facebook group exclusively for festival teams to discuss marketing and the digital festival experience</p>
                    <?php endif; ?>

                    <?php if($trackingCode == 'vN6DCP6bytkBEJvelqcC') : ?>
                        <p>Thanks so much for booking a demo with us! We're sure you'll love what you see. In the meantime, why not join our Facebook group exclusively for festival teams to discuss marketing and the digital festival experience.</p>
                    <?php endif; ?>

                    <?php if($trackingCode == 'NtglCPiD2NkBEJvelqcC') : ?>
                        <p>Thanks so much for getting in touch. One of our festival experts will be in contact as soon as possible. In the meantime, why not join our Facebook group exclusively for festival teams to discuss marketing and the digital festival experience.</p>
                    <?php endif; ?>

                    <p><a class="button" href="https://www.facebook.com/groups/2085964488369733?__hstc=19795239.92265a0403bbdb087fe8b7d26217eaa7.1596204547466.1596204547466.1596204547466.1&__hssc=19795239.1.1596204547466&__hsfp=4224063544">Join Festival Insights Facebook Group</a></p>


                </div>

            </div>

        </div>

</section>

<?php plotGetTemplatePart('parts/footer') ?>

