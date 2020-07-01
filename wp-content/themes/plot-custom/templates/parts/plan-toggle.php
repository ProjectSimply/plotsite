<div class="planToggle JS--TogglePrice" data-plan="annual">

    <div class="planToggle__innerWrap">

        <div class="planToggle__option planToggle__option--annual JS--planToggle--annual">

            <span class="planToggle__saving"><?= get_field('annual_plan_saving') ?></span>

            <h3 class="planToggle__title"><?= get_field('annual_plan_title'); ?></h3>

        </div>

        <div class="planToggle__option planToggle__option--monthly JS--planToggle--monthly">

            <h3 class="planToggle__title"><?= get_field('monthly_plan_title'); ?></h3>

        </div>

    </div>

    <div class="planToggle__priceWrap">

        <div class="planToggle__price planToggle__price--annual">

            <p>From <span class="planToggle__noWrap">£<span class="planToggle__num"><?= get_field('annual_plan_price'); ?></span> /yr</span></p>

            <span class="small">Billed annually</span>

        </div>

        <div class="planToggle__price planToggle__price--monthly">

            <p>From <span class="planToggle__noWrap">£<span class="planToggle__num"><?= get_field('monthly_plan_price'); ?></span> /mo</span></p>

            <span class="small">Billed monthly</span>

        </div>       

    </div>
    
    <div class="planToggle__cross--pink">

        <?php plotGetTemplatePart('parts/cross-asset') ?>
        <?php plotGetTemplatePart('parts/cross-asset') ?>
        <?php plotGetTemplatePart('parts/cross-asset') ?>

    </div>

</div>