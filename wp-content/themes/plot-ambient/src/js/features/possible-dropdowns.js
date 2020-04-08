(function () {

    var PossibleDropdowns

    PossibleDropdowns = {

        init: () => {

            PossibleDropdowns.createListeners()

        },

        createListeners: () => {

        	const selectors = document.querySelectorAll('.plotPossibleDropdown__selector')

        	if(selectors.length > 0) 
				document.addEventListener('click', function(event){

					if(event.target.closest('.plotPossibleDropdown__selector')) {

						PossibleDropdowns.openOrClose(event.target)

		        	} else {
		        		
		        		PossibleDropdowns.closeAll()

		        	}

		        	if(event.target.closest('.plotPossibleDropdown__item')) {
		        		PossibleDropdowns.switchActiveLink(event.target)
		        	}


	        		
	    		})

			window.addEventListener('resize', PossibleDropdowns.detect, { passive: true })
			PossibleDropdowns.detect()
        },

        closeAll : () => {

    		const possibleDropdowns = document.querySelectorAll('.plotPossibleDropdown--open')

    		if(possibleDropdowns.length > 0) {
    			for(var possibleDropdown of possibleDropdowns) {
    				possibleDropdown.classList.remove('plotPossibleDropdown--open')
    			}
    		}

        },

        switchActiveLink : (target) => {

        	const content = target.closest('.plotPossibleDropdown__item').innerHTML
    		const nearestSelector = target.closest('.plotPossibleDropdown').querySelector('.plotPossibleDropdown__selector')

    		const nearestItems = target.closest('.plotPossibleDropdown').querySelectorAll('.plotPossibleDropdown__item')
    		nearestSelector.innerHTML = content

    		if(nearestItems.length > 0) {
    			for(var item of nearestItems) {
    				if(item == target) {
    					item.classList.add('hidden')
    				} else {
    					item.classList.remove('hidden')
    				}
    			}
    		}

        },

        openOrClose : (target) => {

        	const possibleDropdown = target.closest('.plotPossibleDropdown')

			if(possibleDropdown.classList.contains('plotPossibleDropdown--open'))
    			possibleDropdown.classList.remove('plotPossibleDropdown--open')
    		else {
    			const possibleDropdowns = document.querySelectorAll('.plotPossibleDropdown--open')
    			if(possibleDropdowns.length > 0) {
        			for(var pD of possibleDropdowns) {
        				pD.classList.remove('plotPossibleDropdown--open')
        			}
        		}

    			possibleDropdown.classList.add('plotPossibleDropdown--open')
    		}

        },

        detect : () => {

        	const possibleDropdowns = document.querySelectorAll('.plotPossibleDropdown')

        	for(var possibleDropdown of possibleDropdowns) {

        		const buttons = possibleDropdown.querySelectorAll('.plotPossibleDropdownVisibleItems')
        		const selector = possibleDropdown.querySelector('.plotPossibleDropdown__selector')

        		var buttonsWidth = 0

        		if(buttons.length > 0) {
        			for(var button of buttons) {
        				buttonsWidth += button.getBoundingClientRect().width + 4

                        var styles = window.getComputedStyle(button)
                        buttonsWidth += parseInt(styles.getPropertyValue('margin-right'))
        			}
        		}

        		if(buttonsWidth > possibleDropdown.clientWidth) {
    				possibleDropdown.classList.add('plotDropdownActive')
    			} else {
    				possibleDropdown.classList.remove('plotDropdownActive')
    			}

        	}

        }

    }

    module.exports = PossibleDropdowns

}())