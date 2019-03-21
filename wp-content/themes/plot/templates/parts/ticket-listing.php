<div class="ticketRow <?= get_sub_field('sold_out') || get_field('suspend_ticket_sales') ? 'ticketRow--soldOut' : '' ?>">

    <div class="row">
        <div class="columns medium-6">
            <?php if(get_sub_field('vip_ticket')) : ?> 
            <svg class="ticketRow__vipSvg" width="31" height="28" viewBox="0 0 31 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="ticketRow__vipSvgPath" d="M31 10.7748L20.1587 9.40217L15.5 0L10.8413 9.40217L0 10.7748L7.96857 17.7961L5.92023 28L15.5 22.9952L25.0923 28L23.0314 17.7961L31 10.7748Z" />
            </svg>
            <?php endif ?>
            <h5 class="ticketRow__heading"><?php the_sub_field('heading') ?></h5>
            <span class="ticketRow__price ticketRow__price--mobile"><span class="ticketRow__price--bold"><?php the_sub_field('price') ?></span>+bf</span>
            <p class="ticketRow__subheading"><?php the_sub_field('subheading') ?></p>
        </div>
        <div class="columns medium-6">  
            <?php if(get_sub_field('sold_out')) : ?> 
                <span class="ticketRow__button">Sold Out
                <svg class="strikeThroughDiagonal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200.71 200.71"  preserveAspectRatio="none">
                    <line x1="0" y1="0.35" x2="200.35" y2="200.35"/>
                    <line x1="0.35" y1="200.35" x2="200.35" y2="0.35"/>
                </svg>
                </span>         
            <?php else : ?>

                <?php if(!get_field('suspend_ticket_sales')) : ?>
                    <a class="ticketRow__button" href="<?php the_sub_field('button_link') ?>"><?php the_sub_field('button_text') ?></a>
                <?php else : ?>

                    <span class="ticketRow__button">Coming Soon</span>

                <?php endif; ?>
            <?php endif ?>            
            <span class="ticketRow__price ticketRow__price--desktop"><span class="ticketRow__price--bold"><?php the_sub_field('price') ?></span>+bf</span>
        </div>
    </div>

</div>