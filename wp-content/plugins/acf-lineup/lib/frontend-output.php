<?php


/**
 * Lineup output
 *
 * Takes a string containing "linedown" and an optional container class string and wraps the output
 * eg: echo lineup_output($lineup, "custom-container-class");
 * @param $str
 * @param $containerClass
 * @return string
 */
function lineup_output($str, $containerClass = "lineup__container"){

    // Remove excess whitespace
    $str = preg_replace(array('/\s{2,}/', '/[\t\n]/'), ' ', $str);

    // Create empty output string
    $output = "";

    // Set counter for tier iteration
    $i = 0;


    // Split tiers
    $tiers = explode("***", $str);

    // Split artists

    foreach ($tiers as $tier) {

        $i++;

        $output .= "<ul class='lineup__tier lineup__tier--{$i}'>";

        $acts = explode(">", $tier);

        foreach ($acts as $act) {

            $output .= "<li class='lineup__act lineup__act--tier-{$i}'>";

            // Wrap spans
            $act = str_replace("[", "<span class='lineup__strap lineup__strap--tier-{$i}'>", $act);
            $act = str_replace("]", "</span>", $act);

            // Linebreaks
            $act = str_replace("|mobile|", "<br class='mobile-only'>", $act);
            $act = str_replace("|desktop|", "<br class='desktop-only'>", $act);
            $act = str_replace("||", "<br>", $act);

            // Visible separators
            $act = str_replace("*mobile*", "<span class='separator mobile-only'></span>", $act);
            $act = str_replace("*desktop*", "<span class='separator desktop-only'></span>", $act);
            $act = str_replace("**", "<span class='lineup__separator lineup__separator-{$i}'></span>", $act);

            $output .= $act;

            $output .= '</li>';
        }

        $output .= '</ul>';

    }

    // Wrap the output using default "lineup__container" or custom container class
    $output = "<div class='{$containerClass}'>" . $output . "</div>";


    return $output;
}
