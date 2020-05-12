(function () {

    var TogglePrice

    TogglePrice = {
        container: document.querySelector('.JS--TogglePrice'),

        init: () => {

            TogglePrice.container.firstElementChild.addEventListener('click', TogglePrice.toggle)
            console.log(TogglePrice.container.firstElementChild)
        },

        toggle: () => {
            TogglePrice.container.classList.toggle('planToggle--showMonthlyPrice');
        }

    }

    module.exports = TogglePrice

}())
