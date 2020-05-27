(function () {

    var FAQs

    FAQs = {
        sections: document.querySelectorAll('.faqs'),

        init: () => {

            if(!FAQs.sections)
                return

            FAQs.sections.forEach(section => FAQs.initialiseListeners(section))

        },

        initialiseListeners: (section) => {
            
            let faqs = section.querySelectorAll('.faq')

            faqs.forEach(faq => {
                
                let question = faq.querySelector('.faq__question')
                let answer   = faq.querySelector('.faq__answer')

                question.addEventListener('click', () => {

                    faq.classList.toggle('faq--open')

                    if(faq.classList.contains('faq--open')) {
                        answer.style.maxHeight = answer.scrollHeight + 'px'
                    } else {
                        answer.style.maxHeight = 0
                    }
                        

                })

            })
        }


    }

    module.exports = FAQs

}())
