<?php 


function plot_customizer_set_up_fonts() {

	$fontType = get_theme_mod('plotFontType');

	if($fontType == 'google') {
		plot_customizer_add_google_fonts();
	} else {
		plot_customizer_add_font_files();
	}

}

function plot_customizer_add_font_files() {

	echo '<style type="text/css">';

	$fontFiles = [
		'primaryFontRegular',
		'primaryFontBold',
		'primaryFontItalic',
		'headingFont'
	];

	foreach ($fontFiles as $fontFile) {

		$fontType = 'primary';

		if($fontFile == 'headingFont') {
			$fontType = 'headings';
		}

		$fontFileID = get_theme_mod($fontFile);

		$url = wp_get_attachment_url($fontFileID);

		if($url) {

			$css = '@font-face { font-family: \'' . $fontType . 'FontFamily\'; src:url(\'' . $url . '\') format(\'woff\');';

			if($fontFile == 'primaryFontBold' || $fontFile == 'primaryFontBoldItalic') {
				$css .= 'font-weight:bold;';
			}
			if($fontFile == 'primaryFontItalic' || $fontFile == 'primaryFontBoldItalic') {
				$css .= 'font-style:italic;';
			}
			$css .= '} ';

			echo $css;

		}
	}



	echo '--primaryFontFamily: \'primaryFontFamily\'; ';
	echo '--primaryFontRegular: \'regular\'; ';
	echo '--primaryFontRegularStyle \'normal\'; ';
	echo '--primaryFontItalic: \'600\'; ';
	echo '--primaryFontBold: \'700\'; ';
	echo '--headingsFontFamily: \'headingsFontFamily\'; ';
	echo '--headingsFontRegular: \'regular\'; ';
	echo '--headingsFontRegularStyle \'normal\'; ';
	echo '--headingsFontItalic: \'600\'; ';
	echo '--headingsFontBold: \'700\'; ';

	echo '</style>';
}

/**
 * Add relevant google fonts to the head of the front end
 *
 * @return void
 */
function plot_customizer_add_google_fonts() {

	$googleFont = get_theme_mod('plotFont');

	if($googleFont) :



		$fontFamilies = '';

		foreach($googleFont as $fontRule) :


			$fontInfo = $fontRule;
			$fontInfo = json_decode($fontInfo);
			$fontFamilies .= str_replace(' ', '+', $fontInfo->font) . ':' . str_replace('italic', '', $fontInfo->regularweight);
			if(isset($fontInfo->italicweight)) {
				$fontFamilies .= ',' . str_replace('italic', '', $fontInfo->italicweight);
			}

			if(isset($fontInfo->boldweight)) {
				$fontFamilies .= ',' . str_replace('italic', '', $fontInfo->boldweight);
			}


			$fontFamilies .= '|';

		endforeach;

		$fontFamilies = substr($fontFamilies, 0, -1);


		wp_enqueue_style( 'plot-customizer-google-fonts', 'https://fonts.googleapis.com/css?family=' . $fontFamilies, false );

		echo '<style type="text/css"> :root {';

		$types = ['primary','headings'];

		foreach($types as $type) :

			if($googleFont[$type]) :

				$fontInfo = $googleFont[$type];
				$fontInfo = json_decode($fontInfo);

				echo '--'. $type . 'FontFamily: \'' . $fontInfo->font . '\', ' . $fontInfo->category . '; ';

				if(isset($fontInfo->regularweight)) {

					echo '--'. $type . 'FontRegular: ' . str_replace('italic','',$fontInfo->regularweight) . '; ';

					if($fontInfo->regularweight != str_replace('italic', '', $fontInfo->regularweight)) {
						echo '--'. $type . 'FontRegularStyle: italic; ';
					} else {
						echo '--'. $type . 'FontRegularStyle: regular; '; 
					}

				}

				if($fontInfo->italicweight) {
					echo '--'. $type . 'FontItalic: '. str_replace('italic','',$fontInfo->italicweight) . '; ';
				}

				if($fontInfo->boldweight) {
					echo '--'. $type . 'FontBold: '. str_replace('italic','',$fontInfo->boldweight) . '; ';
				}

			endif;

		endforeach;

		echo '}</style>';

	endif;
	
}


function plotCustomizerDataAttributes() {

	if(get_theme_mod('plotAttribute')) :

		foreach(get_theme_mod('plotAttribute') as $attribute => $value) :

			if($value == 1)
				$value = 'true';

			echo 'data-plot-customizer-' . strtolower(preg_replace('/([a-zA-Z])(?=[A-Z])/', '$1-', $attribute)) . '="' . $value . '" ';

		endforeach;

	endif;

	$settings = get_theme_mod('plot');

	if(isset($settings['headerBackgroundOpacity'])) :

		if($settings['headerBackgroundOpacity'] == 100) :

			echo 'data-plot-solid-header="true"';

		endif;

	endif;

}

/**
 * Add relevant font variables to the front end
 *
 * @return void
 */
function plot_customizer_add_css_variables_for_fonts() {

	$fontFiles = get_theme_mod('plotFontFile');

	echo '<style type="text/css">';

	foreach($fontFiles as $setting => $fontRule) {
		echo '@font-face {
			    font-family: \'plotPrimary\';
			    src: url(' . wp_get_attachment_url($fontRule) . ') format(\'woff\');
			}';
	}

	echo '</style>';

	if(get_theme_mod('plotFont')) :

		echo '<style type="text/css">:root {';

			// foreach(get_theme_mod('plotFont') as $setting => $fontRule) :

			// 	if(isset($fontFiles[$setting])) {

			// 		echo '@font-face {
			// 			    font-family: \'primary\';
			// 			    src: url(http://plot.test/wp-content/uploads/2020/02/OpenSans-Regular.ttf) format(\'truetype\');
			// 			}';	

			// 	} else {

			// 		$fontInfo = $fontRule;
			// 		$fontInfo = json_decode($fontInfo);
			// 		if(isset($fontInfo->font)) :
			// 			echo '--' . $setting . 'FontFamily: ' . $fontInfo->font . ', ' . $fontInfo->category . ';';
			// 		endif;
			// 		if(isset($fontInfo->regularweight)) :
			// 			echo '--' . $setting . 'FontRegular: ' . str_replace('italic','',$fontInfo->regularweight) . ';';
			// 			if(strpos($fontInfo->regularweight,'italic') !== false)
			// 				echo '--' . $setting . 'FontRegularStyle: italic;';
			// 		endif;
			// 		if(isset($fontInfo->italicweight)) :
			// 			echo '--' . $setting . 'FontItalic: ' . str_replace('italic','',$fontInfo->italicweight) . ';';
			// 		endif;
			// 		if(isset($fontInfo->boldweight)) :
			// 			if(strpos($fontInfo->regularweight,'italic') !== false)
			// 				echo '--' . $setting . 'FontRegularStyle: italic;';
			// 		endif;

			// 	}

			// endforeach;

		echo '}</style>';
	

	endif;
	
}

function plot_customizer_add_css_variables() {

	$plotSettings = get_theme_mod('plot');

	if($plotSettings) :

		echo '<style type="text/css">:root {';

		foreach($plotSettings as $setting => $value) :

			echo '--' . $setting . ': ' . $value . ';';

		endforeach;

		$varvars = [
			'siteBorderColor' 						=> 'plotSiteBorderColor',
			'buttonBackgroundColor'					=> 'plotButtonBackgroundColor',
			'buttonBorderColor'						=> 'plotButtonBorderColor',
			'buttonTextColor'						=> 'plotButtonTextColor',
			'buttonAltBackgroundColor'				=> 'plotButtonAltBackgroundColor',
			'buttonAltBorderColor'					=> 'plotButtonAltBorderColor',
			'buttonAltTextColor'					=> 'plotButtonAltTextColor',
			'desktopTicketButtonBackgroundColor' 	=> 'plotDesktopTicketButtonBackgroundColor',
			'desktopTicketButtonBorderColor' 		=> 'plotDesktopTicketButtonBorderColor',
			'desktopTicketButtonTextColor'			=> 'plotDesktopTicketButtonTextColor',
			'mobileTicketButtonBackgroundColor' 	=> 'plotMobileTicketButtonBackgroundColor',
			'mobileTicketButtonBorderColor' 		=> 'plotMobileTicketButtonBorderColor',
			'mobileTicketButtonTextColor'			=> 'plotMobileTicketButtonTextColor',
			'headingsColor'							=> 'plotHeadingsColor',
			'altHeadingsColor'						=> 'plotAltHeadingsColor',
			'inputBackgroundColor'					=> 'plotInputBackgroundColor',
			'inputBorderColor'						=> 'plotInputBorderColor',
			'inputTextColor'						=> 'plotInputTextColor',
			'inputPlaceholderColor'					=> 'plotInputPlaceholderColor',
			'inputAltBackgroundColor'				=> 'plotInputAltBackgroundColor',
			'inputAltBorderColor'					=> 'plotInputAltBorderColor',
			'inputAltTextColor'						=> 'plotInputAltTextColor',
			'inputAltPlaceholderColor'				=> 'plotInputAltPlaceholderColor'


		];

		foreach($varvars as $var => $mod) :

			$m = get_theme_mod($mod);

			if($m)
				echo '--' . $var . ': var(--' . $m . '); ';

		endforeach;

		echo '}</style>';

	endif;



}

function plotSetElementColors($name) {
	$settings = get_theme_mod('plot');
	$backgroundColor = get_theme_mod('plot' . ucfirst($name) . 'BackgroundColor');

	if(!$backgroundColor == 'black' && !$backgroundColor != 'white') :

		$backgroundColor = $settings[$backgroundColor];

	endif;
	

	$textColor = get_theme_mod('plot' . ucfirst($name) . 'TextColor');

	$textHoverColor = get_theme_mod('plot' . ucfirst($name) . 'TextHoverColor');

	echo 'style="';

	echo '--elementBackgroundColor : var(--' . $backgroundColor . ');';
	echo '--elementTextColor : var(--' . $textColor . ');';
	echo '--elementTextHoverColor : var(--' . $textHoverColor . ');';

	echo '"';


}

add_action( 'wp_head' , 'plot_customizer_add_css_variables' );
add_action( 'wp_head' , 'plot_customizer_add_css_variables_for_fonts' );
