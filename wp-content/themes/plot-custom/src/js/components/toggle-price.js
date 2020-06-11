(function () {

    var TogglePrice

    TogglePrice = {
        dom: {
            container: document.querySelector('.JS--TogglePrice'),
            annualButton: document.querySelector('.JS--planToggle--annual'),
            monthlyButton: document.querySelector('.JS--planToggle--monthly'),
        },

        init: () => {

            // Update data set with 
            TogglePrice.dom.annualButton.addEventListener('click', TogglePrice.showAnnual)
            console.log(TogglePrice.dom) 
            TogglePrice.dom.monthlyButton.addEventListener('click', TogglePrice.showMonthly)
            
        },

        showAnnual: () => {
            
            if(TogglePrice.dom.container.dataset.plan = "annual") 
                return;

            TogglePrice.dom.container.dataset.plan = "annaul"
        },

        showMonthly: () => {
            if(TogglePrice.dom.container.dataset.plan = "monthly") 
            return;

        TogglePrice.dom.container.dataset.plan = "monthly"
        }


    }

    module.exports = TogglePrice

}())
