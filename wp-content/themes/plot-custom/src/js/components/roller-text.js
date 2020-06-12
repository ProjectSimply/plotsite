(function () {

    var RollerText

    RollerText = {
        phrases: [
            'multi-day',
            'rock',
            'summer',
            'classical',
            'winter'
        ],
        dom: {
            textWrap: document.querySelector('.rollerText'),
            current: document.querySelector('[data-text-current]'),
            next: document.querySelector('[data-text-next]'),
        },
        intervalLength          : 1500,
        nextPhrase          : 'winter',
        counter                 : null,
        ticker                  : false,

        init: () => {
            
             
            if(RollerText.dom.textWrap)
                RollerText.startcounter()
            
        },

        startcounter: () => {
            
            RollerText.setWidth(RollerText.dom.current)

            let i = 1
            RollerText.counter = setInterval(() => {       

                const currentPhrase = RollerText.phrases[i]
                const nextPhrase = RollerText.phrases[i + 1] ? RollerText.phrases[i + 1] : RollerText.phrases[0]

                RollerText.dom.textWrap.classList.add('turn')

                RollerText.setWidth(RollerText.dom.next)

                setTimeout(() => {

                    RollerText.dom.textWrap.classList.remove('turn')

                    // Update mobile screen image
                    RollerText.dom.current.textContent = currentPhrase
                    RollerText.dom.next.textContent = nextPhrase

                }, 700)


                // If we reach the end of the themes, reset to first theme
                i >= RollerText.phrases.length - 1 ? i = 0 : i++

            }, RollerText.intervalLength);
        },

        setWidth: (element) => {
            let textWidth = element.getBoundingClientRect().width
            
            RollerText.dom.textWrap.style.width = `${textWidth}px`
        }

    }

    module.exports = RollerText

}())
