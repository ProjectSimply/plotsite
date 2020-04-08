//Created by Michael Watson, for Robert with love
//Do you want a custom mouse icon? I bet you do. Let's do it.

// When instatiating you run :
// CustomMouse.init({
//      'html selector' : 'classModifier'
// })


(function () {

    var CustomMouse,

    CustomMouse = {
        mouseCursor      : document.querySelector('.JS--plotCustomMouseCursor'),
        clientX          : -100,
        clientY          : -100,
        mouseClass       : '',

        init: listeners => {

            if(!listeners) {
                console.log('don\'t forget to set your parameters through as an object. Read custom-mouse.js if you don\'t know what you are doing.')
                return false
            }

            document.addEventListener("mousedown",e => {
                
                
            })

            document.addEventListener("mousemove", e => {
                CustomMouse.clientX = e.clientX
                CustomMouse.clientY = e.clientY

                if(!CustomMouse.mouseCursor.classList.contains('instantiated')) {

                    requestAnimationFrame(CustomMouse.renderMouseMoves)

                    setTimeout(function() {

                        CustomMouse.mouseCursor.classList.add('instantiated')

                    },200)
                    
                }

                let mouseChanged = false;

                for(const listener in listeners) {

                    const mouseClassChanger = e.target.closest(listener)

                    if(mouseClassChanger) 

                        if(mouseClassChanger.dataset.plotMouseClass != CustomMouse.mouseClass) {

                            CustomMouse.mouseCursor.classList.remove(listeners[listener])

                            CustomMouse.mouseClass = listeners[listener]

                            CustomMouse.mouseCursor.classList.add(listeners[listener])

                            mouseChanged = true

                        }
                    
                }

                if(mouseChanged == false)

                    if(CustomMouse.mouseClass) {

                        CustomMouse.mouseCursor.classList.remove(CustomMouse.mouseClass)

                        CustomMouse.mouseClass = ''

                    }

            });  

        },

        renderMouseMoves :  () => {
                
            CustomMouse.mouseCursor.style.transform = `translate3d(${CustomMouse.clientX}px, ${CustomMouse.clientY}px, 0)`

            requestAnimationFrame(CustomMouse.renderMouseMoves)
        }
    }

    module.exports = CustomMouse

}())
