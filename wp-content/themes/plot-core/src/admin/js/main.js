(function($) {

    $(document).ready(function(){

        var plotAdminMain = {

            blockLinkSliders : document.querySelectorAll('.plotBlockLinkSlider'),
            blockLinkImagePreviews : document.querySelectorAll('.plotBlockLinkPreview'),

            init : () => {

                plotAdminMain.createListeners()

                plotAdminMain.equalizeLabels()

                $(".meta-box-sortables").sortable({
                    cancel:".postbox"
                }).sortable('refresh');


            },

            createListeners : () => {

                for(var blockLinkSlider of plotAdminMain.blockLinkSliders) {

                    blockLinkSlider.querySelector('input').addEventListener('input',function(){

                        plotAdminMain.changeOpacityOfImage(this)
                        
                    })

                    plotAdminMain.changeOpacityOfImage(blockLinkSlider.querySelector('input'))

                }

                for(var input of document.querySelectorAll('input[type=radio], input[type=checkbox]')) {

                    plotAdminMain.addCheckedClassesWhenChecked()

                }

                $('body').on('change','input[type=radio], input[type=checkbox]',function(){


                    plotAdminMain.addCheckedClassesWhenChecked()

                });


            },

            equalizeLabels : () => {

                var maxHeight = 0

                for(var blockLinkImagePreview of plotAdminMain.blockLinkImagePreviews) {
                    const label = blockLinkImagePreview.querySelector('.acf-label')
                    label.style.minHeight = 'none'

                }

                for(var blockLinkImagePreview of plotAdminMain.blockLinkImagePreviews) {

                    const label = blockLinkImagePreview.querySelector('.acf-label')

                    if(label.clientHeight > maxHeight) {
                        maxHeight = label.clientHeight
                    }
                }

                for(var blockLinkImagePreview of plotAdminMain.blockLinkImagePreviews) {

                    const label = blockLinkImagePreview.querySelector('.acf-label')

                    label.style.minHeight = `${maxHeight}px`

                }

            },

            changeOpacityOfImage : elem => {

                var element = elem.closest('.plotBlockLinkSlider')

                if(elem.closest('.acf-repeater.-block .acf-fields')) {
                    var parentSelector = elem.closest('.acf-repeater.-block .acf-fields')
                } else {
                    parentSelector = document.querySelector('#wpbody')   
                }

                for(var className of element.classList) {
                    if(className.indexOf('plotBlockLinkSlider--') == 0) {
                        var fadingElementId = className.replace('plotBlockLinkSlider--','')

                        const fadingElements = parentSelector.querySelectorAll('.plotBlockLinkPreview--' + fadingElementId)

                        for(fadingElement of fadingElements)
                            fadingElement.style.setProperty('--plot-blocklink-opacity',elem.value / 100)
                    }
                }
            },

            addCheckedClassesWhenChecked : () => {

                var allInputs = document.querySelectorAll('input[type=checkbox], input[type=radio]')

                for(var input of allInputs) {

                    if(input.clientHeight == 0)
                        continue

                    if(input.type == 'radio') {

                        var parent = input.closest('fieldset')

                        if(!parent)
                            parent = input.closest('.acf-input')

                        if(parent){
                            parent.querySelectorAll('label').forEach(label => {
                                if(label.querySelector('input')) {
                                    if(!label.querySelector('input').checked) {
                                        label.classList.remove('plotSelected')
                                    }
                                } else {
                                    label.classList.remove('plotSelected')
                                }
                            })
                        }

                    }

                    if(input.checked){
                        input.parentNode.classList.add('plotSelected')
                    }
                    else 
                        input.parentNode.classList.remove('plotSelected')

                }

            }

        }

        plotAdminMain.init()

    })
})(jQuery);