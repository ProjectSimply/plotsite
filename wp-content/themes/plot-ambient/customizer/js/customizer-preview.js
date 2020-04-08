//Update our theme settings in real time
var variables = [
	'plot[backgroundColor]',
	'plot[altBackgroundColor]',
	'plot[bodyColor]',
	'plot[altBodyColor]',
	'plot[highlightColor]',
	'plot[altHighlightColor]',
	'plot[baseFontSize]',
	'plot[buttonBorderThickness]',
	'plot[buttonBoxShadow]',
	'plot[buttonRoundedEdges]',
	'plot[buttonHorizontalSpacing]',
	'plot[buttonVerticalSpacing]',
	'plot[buttonTextScale]',

	'plot[inputBorderThickness]',
	'plot[inputRoundedEdges]',

	'plot[desktopTicketButtonBorderThickness]',
	'plot[desktopTicketButtonBoxShadow]',
	'plot[desktopTicketButtonRoundedEdges]',
	'plot[desktopTicketButtonSpacing]',
	'plot[desktopTicketButtonTextScale]',
	'plot[mobileTicketButtonBorderThickness]',
	'plot[mobileTicketButtonBoxShadow]',
	'plot[mobileTicketButtonSpacing]',
	'plot[mobileTicketButtonTextScale]',

	'plot[siteMaxWidth]',
	'plot[roundedEdges]',
	'plot[boxShadow]',
	'plot[boxBorders]',
	'plot[blockLinkHeight]',
	'plot[wonk]',
	'plot[horizontalSpacing]',
	'plot[verticalSpacing]',
	'plot[siteBorder]',
	'plot[lineHeight]',
	'plot[headingsLineHeight]',
	'plot[headingsSpacing]',
	'plot[headerBackgroundOpacity]',
	'plot[headerHeight]',
	'plot[headerPosition]',
	'plot[headingsScale]',
	'plot[logoSize]'
]


var attributeVariables = [
	'plotAttribute[navigationType]',
	'plotAttribute[secondaryNavigation]',
	'plotAttribute[buttonType]',
	'plotAttribute[desktopTicketButtonType]',
	'plotAttribute[navigationAlignment]',
	'plotAttribute[inputType]'
]


var fontVariables = [
	'plotFont[primary]',
	'plotFont[headings]'
]


var elementColors = [
	{
		'elementBackgroundColor' : 'plotHeaderBackgroundColor',
		'elementTextColor' 		 : 'plotHeaderTextColor',
		'elementTextHoverColor'	 : 'plotHeaderTextHoverColor',
		'element'				 : '#siteMainHeader'
	},
	{
		'elementBackgroundColor' : 'plotMobileMenuBackgroundColor',
		'elementTextColor' 		 : 'plotMobileMenuTextColor',
		'elementTextHoverColor'	 : 'plotMobileMenuTextHoverColor',
		'element'				 : '#burgerMenu'
	},
	{
		'elementBackgroundColor' : 'plotFooterBackgroundColor',
		'elementTextColor' 		 : 'plotFooterTextColor',
		'elementTextHoverColor'	 : 'plotFooterTextHoverColor',
		'element'				 : '#mainSiteFooter'
	},
	{
		'elementBackgroundColor' : 'plotPostFooterBackgroundColor',
		'elementTextColor' 		 : 'plotPostFooterTextColor',
		'elementTextHoverColor'	 : 'plotPostFooterTextHoverColor',
		'element'				 : '.postFooter'
	}
]

for(var variable of variables) {

	(function() {

		const v = variable

		wp.customize( v, function( value ) {

			value.bind( function( newval ) {

				var matches = v.match(/\[(.*?)\]/) //Get the value inside square brackets

				if (matches) {
				    document.documentElement.style.setProperty('--'+matches[1],newval)
				}

				if(matches[1] == 'headerBackgroundOpacity')
					if(matches[1] && newval == 100) 
						document.body.dataset.plotSolidHeader = 'true'
					else
						document.body.dataset.plotSolidHeader = 'false'

				Main.seeIfBannerShouldBeShuntedDown()
				Main.detectIfMobileMenuNeeded()

			} )

		} )

	})()

}


//FONTS WITH FILES

const fontFiles = [
	'primaryFontRegular',
	'primaryFontBold',
	'primaryFontItalic',
	'headingFont'
]

for(var fontFile of fontFiles) {

	(function() {

		const f = fontFile

		wp.customize( f, function( value ) {

		    value.bind( function( newval ) {

		    	
		    	setCustomFontFileInfo(newval,f)


		    } );
		} )

	} )()

}

function setCustomFontFileInfo(newval,f) {
	fetch('/wp-json/wp/v2/media/' + newval, {

        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        credentials: 'same-origin'

    }).then(data => {

        return data.json()

    }).then(result => {

       	var fontPreview = document.querySelector('#fontPreview' + f)
       	var googleFontPreviews = document.querySelectorAll('.googleFontPreview')

		if(fontPreview) {
			fontPreview.remove()
		}

		for(googleFontPreview of googleFontPreviews) {
			googleFontPreview.remove()
		}

		var fontType = 'primary'

		if(f == 'headingFont') {
			fontType = 'headings'
		}
		if(result.source_url) {

			var css = `@font-face { font-family: \'${fontType}FontFamily\'; src: url('${result.source_url}') format(\'woff\');`

			if(f == 'primaryFontBold' || f == 'primaryFontBoldItalic') {
				css += 'font-weight:bold;';
			}
			if(f == 'primaryFontItalic' || f == 'primaryFontBoldItalic') {
				css += 'font-style:italic;';
			}
			css += `}';`

			document.documentElement.style.setProperty(`--${fontType}FontFamily`,`'${fontType}FontFamily`)
			document.documentElement.style.setProperty(`--${fontType}FontRegular`,`'regular`)
			document.documentElement.style.setProperty(`--${fontType}FontRegularStyle`,`'normal`)
			document.documentElement.style.setProperty(`--${fontType}FontItalic`,`600`)
			document.documentElement.style.setProperty(`--${fontType}FontBold`,`700`)

		    style = document.createElement('style')
			style.setAttribute('id','fontPreview' + f)
			style.classList.add('fontFilePreviews')
			document.head.appendChild(style)
			style.type = 'text/css'
			style.appendChild(document.createTextNode(css))

		}

    }).catch(error =>{
        console.log('error',error)

    })
}

wp.customize('plotFontType',function(value) {
	value.bind( function( newval ) {

		if(newval == 'custom') {

			for(var fontFile of fontFiles) {

				(function() {

					const f = fontFile

					if(wp.customize.value(f)()) {
						setCustomFontFileInfo(wp.customize.value(f)(),f)
					}

				})()

			}

		}

	})	
})


///COLOURS

wp.customize('plotSiteBorderColor',function(value) {
	value.bind( function( newval ) {

		document.documentElement.style.setProperty('--siteBorderColor','var(--' + newval + ')')

	})	
})

wp.customize('plotButtonBackgroundColor',function(value) {
	value.bind( function( newval ) {

		document.documentElement.style.setProperty('--buttonBackgroundColor','var(--' + newval + ')')

	})	
})

wp.customize('plotButtonBorderColor',function(value) {
	value.bind( function( newval ) {

		document.documentElement.style.setProperty('--buttonBorderColor','var(--' + newval + ')')

	})	
})

wp.customize('plotButtonTextColor',function(value) {
	value.bind( function( newval ) {

		document.documentElement.style.setProperty('--buttonTextColor','var(--' + newval + ')')

	})	
})

wp.customize('plotButtonAltBackgroundColor',function(value) {
	value.bind( function( newval ) {

		document.documentElement.style.setProperty('--buttonAltBackgroundColor','var(--' + newval + ')')

	})	
})

wp.customize('plotButtonAltBorderColor',function(value) {
	value.bind( function( newval ) {

		document.documentElement.style.setProperty('--buttonAltBorderColor','var(--' + newval + ')')

	})	
})

wp.customize('plotButtonAltTextColor',function(value) {
	value.bind( function( newval ) {

		document.documentElement.style.setProperty('--buttonAltTextColor','var(--' + newval + ')')

	})	
})

wp.customize('plotBoxBorderColor',function(value) {
	value.bind( function( newval ) {

		console.log('bf'); 

		document.documentElement.style.setProperty('--boxBorderColor','var(--' + newval + ')')

	})	
})

wp.customize('plotDesktopTicketButtonBackgroundColor',function(value) {
	value.bind( function( newval ) {

		document.documentElement.style.setProperty('--desktopTicketButtonBackgroundColor','var(--' + newval + ')')

	})	
})

wp.customize('plotDesktopTicketButtonBorderColor',function(value) {
	value.bind( function( newval ) {

		document.documentElement.style.setProperty('--desktopTicketButtonBorderColor','var(--' + newval + ')')

	})	
})

wp.customize('plotDesktopTicketButtonTextColor',function(value) {
	value.bind( function( newval ) {

		document.documentElement.style.setProperty('--desktopTicketButtonTextColor','var(--' + newval + ')')

	})	
})


wp.customize('plotMobileTicketButtonBackgroundColor',function(value) {
	value.bind( function( newval ) {

		document.documentElement.style.setProperty('--mobileTicketButtonBackgroundColor','var(--' + newval + ')')

	})	
})

wp.customize('plotMobileTicketButtonBorderColor',function(value) {
	value.bind( function( newval ) {

		document.documentElement.style.setProperty('--mobileTicketButtonBorderColor','var(--' + newval + ')')

	})	
})

wp.customize('plotMobileTicketButtonTextColor',function(value) {
	value.bind( function( newval ) {

		document.documentElement.style.setProperty('--mobileTicketButtonTextColor','var(--' + newval + ')')

	})	
})

wp.customize('plotHeadingsColor',function(value) {
	value.bind( function( newval ) {

		document.documentElement.style.setProperty('--headingsColor','var(--' + newval + ')')

	})	
})
wp.customize('plotAltHeadingsColor',function(value) {
	value.bind( function( newval ) {

		document.documentElement.style.setProperty('--altHeadingsColor','var(--' + newval + ')')

	})	
})


wp.customize('plotInputBackgroundColor',function(value) {
	value.bind( function( newval ) {

		document.documentElement.style.setProperty('--inputBackgroundColor','var(--' + newval + ')')

	})	
})

wp.customize('plotInputBorderColor',function(value) {
	value.bind( function( newval ) {

		document.documentElement.style.setProperty('--inputBorderColor','var(--' + newval + ')')

	})	
})

wp.customize('plotInputTextColor',function(value) {
	value.bind( function( newval ) {

		document.documentElement.style.setProperty('--inputTextColor','var(--' + newval + ')')

	})	
})
wp.customize('plotInputPlaceholderColor',function(value) {
	value.bind( function( newval ) {
		document.documentElement.style.setProperty('--inputPlaceholderColor','var(--' + newval + ')')

	})	
})


wp.customize('plotInputAltBackgroundColor',function(value) {
	value.bind( function( newval ) {

		document.documentElement.style.setProperty('--inputAltBackgroundColor','var(--' + newval + ')')

	})	
})

wp.customize('plotInputAltBorderColor',function(value) {
	value.bind( function( newval ) {

		document.documentElement.style.setProperty('--inputAltBorderColor','var(--' + newval + ')')

	})	
})

wp.customize('plotInputAltTextColor',function(value) {
	value.bind( function( newval ) {

		document.documentElement.style.setProperty('--inputAltTextColor','var(--' + newval + ')')

	})	
})
wp.customize('plotInputAltPlaceholderColor',function(value) {
	value.bind( function( newval ) {
		document.documentElement.style.setProperty('--inputAltPlaceholderColor','var(--' + newval + ')')

	})	
})


for(var variable of attributeVariables) {
	

	(function() {

		const v = variable

		wp.customize( v, function( value ) {

			value.bind( function( newval ) {

				var matches = v.match(/\[(.*?)\]/) //Get the value inside square brackets

				if (matches) {
				    document.body.dataset['plotCustomizer' + matches[1].charAt(0).toUpperCase() + matches[1].slice(1)] = newval
				}

				

			} )

			Main.seeIfBannerShouldBeShuntedDown()
			Main.detectIfMobileMenuNeeded()

		} )

	})()

}


for(var setting of elementColors) {
	

	(function() {

		const s = setting


		wp.customize( s.elementBackgroundColor, function( value ) {

			setElementColors(value,'elementBackgroundColor')

		} )

		wp.customize( s.elementTextColor, function( value ) {

			setElementColors(value,'elementTextColor')

		} )

		wp.customize( s.elementTextHoverColor, function( value ) {

			setElementColors(value,'elementTextHoverColor')

		} )

		function setElementColors( value,property ) {

			value.bind( function( newval ) {

				var elements = document.querySelectorAll(s.element)

				for(var element of elements)
					element.style.setProperty('--'+property,`var(--${newval})`)
				

			} )	

			Main.seeIfBannerShouldBeShuntedDown()
			Main.detectIfMobileMenuNeeded()

		}

	})()

}


for(var variable of fontVariables) {
	

	(function() {

		const v = variable

		wp.customize( v, function( value ) {

			value.bind( function( newval ) {

				var matches = v.match(/\[(.*?)\]/) //Get the value inside square brackets

				if (matches) {

				    var fontInfo = JSON.parse(newval)

				    console.log(fontInfo)

				    if(fontInfo.font) {

						var googleFontPreview = document.querySelector('#googleFontPreview' + matches[1])
						var fontFilePreviews = document.querySelectorAll('.fontFilePreviews')

						if(googleFontPreview) {
							googleFontPreview.remove()
						}

						for(var fontFilePreview of fontFilePreviews) {
							fontFilePreview.remove()
						}

						var weights = ':';

						if(fontInfo.regularweight) {
							weights += fontInfo.regularweight.replace('talic','');
						}
						if(fontInfo.italicweight) {
							weights += ',' + fontInfo.italicweight.replace('talic','');
						}
						if(fontInfo.boldweight) {
							weights += ',' + fontInfo.boldweight.replace('talic','');
						}

						var css = `@import url('https://fonts.googleapis.com/css?family=${fontInfo.font.replace(/\s/g, '+')}${weights}&display=swap');`
					    style = document.createElement('style')
						style.setAttribute('id','googleFontPreview' + matches[1])
						style.classList.add('googleFontPreview')
						document.head.appendChild(style)
						style.type = 'text/css'
						style.appendChild(document.createTextNode(css))

						document.documentElement.style.setProperty(`--${matches[1]}FontFamily`, `'${fontInfo.font}', ${fontInfo.category}`)

						if(fontInfo.regularweight) {

							document.documentElement.style.setProperty(`--${matches[1]}FontRegular`, fontInfo.regularweight.replace('italic',''),'')
							if(fontInfo.regularweight != fontInfo.regularweight.replace('italic','')) {
								document.documentElement.style.setProperty(`--${matches[1]}FontRegularStyle`,'italic')
							} else {
								document.documentElement.style.setProperty(`--${matches[1]}FontRegularStyle`,'regular')
							}
						}
						
						if(fontInfo.italicweight) {
							document.documentElement.style.setProperty(`--${matches[1]}FontItalic`, fontInfo.italicweight.replace('italic',''),'')
						}

						if(fontInfo.boldweight) {
							document.documentElement.style.setProperty(`--${matches[1]}FontBold`, fontInfo.boldweight.replace('italic',''),'')
						}

					}

				}

				Main.seeIfBannerShouldBeShuntedDown()
				Main.detectIfMobileMenuNeeded()

				

			} )

		} )

	})()

}


wp.customize( 'plot[headerLogo]', function( value ) {

	value.bind( function( newval ) {

		var logoElement = document.querySelector('.siteMainHeader__logo')

		img = new Image()

		img.onload = function(){
			logoElement.innerHTML = ''
			logoElement.appendChild(img)
		};

		img.src = newval
		

	} )

} )	

