<<?= get_field('banner_link') ? 'a href="' . get_field('banner_link') . '"' : 'div' ?> data-message="<?= get_field('message_for_banner'); ?>" class="bannerNotification JS--bannerNotification" data-animation-type="<?= get_field('animation') ?>">


</<?= get_field('banner_link') ? 'a' : 'div' ?>>