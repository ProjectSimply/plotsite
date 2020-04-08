(function () {

    var TextLineup

    TextLineup = {

        init: () => {

            TextLineup.removeUnneccesarySeparators()
            window.addEventListener('resize', TextLineup.removeUnneccesarySeparators, { passive: true })

            
        },

        removeUnneccesarySeparators: () => {

            const textLineups = document.querySelectorAll('.textLineup__tier')

            const resetElements = document.querySelectorAll('.textLineup__separator, .textLineup__artist--hiddenSeparator')

            for(var resetElement of resetElements) {
                resetElement.classList.remove('hidden','textLineup__artist--hiddenSeparator')
            }

            for(var textLineup of textLineups) {

                const artists = document.querySelectorAll('.textLineup__artist')

                var lastArtist;

                for(var artist of artists) {

                    if(lastArtist) {  

                        const artistStyle = getComputedStyle(lastArtist)

                        const lineHeight = parseInt(artistStyle.getPropertyValue('line-height'))

                        var separator = artist.querySelector('.textLineup__separator')
                        var artistText = artist.querySelector('.textLineup__artistText')

                        if(artistText.getBoundingClientRect().bottom < separator.getBoundingClientRect().bottom) {
                            separator.classList.add('hidden')
                        }
                        
                        if(Math.abs(artist.getBoundingClientRect().top - lastArtist.getBoundingClientRect().bottom + lineHeight) > 2) {
                            lastArtist.classList.add('textLineup__artist--hiddenSeparator')
                        }
                    }

                    lastArtist = artist

                }

            }

        },

    }

    module.exports = TextLineup

}())