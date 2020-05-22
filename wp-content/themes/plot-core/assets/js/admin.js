(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYWRtaW4vanMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIoZnVuY3Rpb24oJCkge1xuXG4gICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcblxuICAgICAgICB2YXIgcGxvdEFkbWluTWFpbiA9IHtcblxuICAgICAgICAgICAgYmxvY2tMaW5rU2xpZGVycyA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbG90QmxvY2tMaW5rU2xpZGVyJyksXG4gICAgICAgICAgICBibG9ja0xpbmtJbWFnZVByZXZpZXdzIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsb3RCbG9ja0xpbmtQcmV2aWV3JyksXG5cbiAgICAgICAgICAgIGluaXQgOiAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBwbG90QWRtaW5NYWluLmNyZWF0ZUxpc3RlbmVycygpXG5cbiAgICAgICAgICAgICAgICBwbG90QWRtaW5NYWluLmVxdWFsaXplTGFiZWxzKClcblxuICAgICAgICAgICAgICAgICQoXCIubWV0YS1ib3gtc29ydGFibGVzXCIpLnNvcnRhYmxlKHtcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsOlwiLnBvc3Rib3hcIlxuICAgICAgICAgICAgICAgIH0pLnNvcnRhYmxlKCdyZWZyZXNoJyk7XG5cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgY3JlYXRlTGlzdGVuZXJzIDogKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgZm9yKHZhciBibG9ja0xpbmtTbGlkZXIgb2YgcGxvdEFkbWluTWFpbi5ibG9ja0xpbmtTbGlkZXJzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgYmxvY2tMaW5rU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBsb3RBZG1pbk1haW4uY2hhbmdlT3BhY2l0eU9mSW1hZ2UodGhpcylcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgIHBsb3RBZG1pbk1haW4uY2hhbmdlT3BhY2l0eU9mSW1hZ2UoYmxvY2tMaW5rU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykpXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3IodmFyIGlucHV0IG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9cmFkaW9dLCBpbnB1dFt0eXBlPWNoZWNrYm94XScpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcGxvdEFkbWluTWFpbi5hZGRDaGVja2VkQ2xhc3Nlc1doZW5DaGVja2VkKClcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICQoJ2JvZHknKS5vbignY2hhbmdlJywnaW5wdXRbdHlwZT1yYWRpb10sIGlucHV0W3R5cGU9Y2hlY2tib3hdJyxmdW5jdGlvbigpe1xuXG5cbiAgICAgICAgICAgICAgICAgICAgcGxvdEFkbWluTWFpbi5hZGRDaGVja2VkQ2xhc3Nlc1doZW5DaGVja2VkKClcblxuICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGVxdWFsaXplTGFiZWxzIDogKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgdmFyIG1heEhlaWdodCA9IDBcblxuICAgICAgICAgICAgICAgIGZvcih2YXIgYmxvY2tMaW5rSW1hZ2VQcmV2aWV3IG9mIHBsb3RBZG1pbk1haW4uYmxvY2tMaW5rSW1hZ2VQcmV2aWV3cykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IGJsb2NrTGlua0ltYWdlUHJldmlldy5xdWVyeVNlbGVjdG9yKCcuYWNmLWxhYmVsJylcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwuc3R5bGUubWluSGVpZ2h0ID0gJ25vbmUnXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3IodmFyIGJsb2NrTGlua0ltYWdlUHJldmlldyBvZiBwbG90QWRtaW5NYWluLmJsb2NrTGlua0ltYWdlUHJldmlld3MpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IGJsb2NrTGlua0ltYWdlUHJldmlldy5xdWVyeVNlbGVjdG9yKCcuYWNmLWxhYmVsJylcblxuICAgICAgICAgICAgICAgICAgICBpZihsYWJlbC5jbGllbnRIZWlnaHQgPiBtYXhIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heEhlaWdodCA9IGxhYmVsLmNsaWVudEhlaWdodFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9yKHZhciBibG9ja0xpbmtJbWFnZVByZXZpZXcgb2YgcGxvdEFkbWluTWFpbi5ibG9ja0xpbmtJbWFnZVByZXZpZXdzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBibG9ja0xpbmtJbWFnZVByZXZpZXcucXVlcnlTZWxlY3RvcignLmFjZi1sYWJlbCcpXG5cbiAgICAgICAgICAgICAgICAgICAgbGFiZWwuc3R5bGUubWluSGVpZ2h0ID0gYCR7bWF4SGVpZ2h0fXB4YFxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBjaGFuZ2VPcGFjaXR5T2ZJbWFnZSA6IGVsZW0gPT4ge1xuXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBlbGVtLmNsb3Nlc3QoJy5wbG90QmxvY2tMaW5rU2xpZGVyJylcblxuICAgICAgICAgICAgICAgIGlmKGVsZW0uY2xvc2VzdCgnLmFjZi1yZXBlYXRlci4tYmxvY2sgLmFjZi1maWVsZHMnKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50U2VsZWN0b3IgPSBlbGVtLmNsb3Nlc3QoJy5hY2YtcmVwZWF0ZXIuLWJsb2NrIC5hY2YtZmllbGRzJylcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnRTZWxlY3RvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3cGJvZHknKSAgIFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvcih2YXIgY2xhc3NOYW1lIG9mIGVsZW1lbnQuY2xhc3NMaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGNsYXNzTmFtZS5pbmRleE9mKCdwbG90QmxvY2tMaW5rU2xpZGVyLS0nKSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmFkaW5nRWxlbWVudElkID0gY2xhc3NOYW1lLnJlcGxhY2UoJ3Bsb3RCbG9ja0xpbmtTbGlkZXItLScsJycpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZhZGluZ0VsZW1lbnRzID0gcGFyZW50U2VsZWN0b3IucXVlcnlTZWxlY3RvckFsbCgnLnBsb3RCbG9ja0xpbmtQcmV2aWV3LS0nICsgZmFkaW5nRWxlbWVudElkKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IoZmFkaW5nRWxlbWVudCBvZiBmYWRpbmdFbGVtZW50cylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWRpbmdFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXBsb3QtYmxvY2tsaW5rLW9wYWNpdHknLGVsZW0udmFsdWUgLyAxMDApXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBhZGRDaGVja2VkQ2xhc3Nlc1doZW5DaGVja2VkIDogKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgdmFyIGFsbElucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9Y2hlY2tib3hdLCBpbnB1dFt0eXBlPXJhZGlvXScpXG5cbiAgICAgICAgICAgICAgICBmb3IodmFyIGlucHV0IG9mIGFsbElucHV0cykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKGlucHV0LmNsaWVudEhlaWdodCA9PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWVcblxuICAgICAgICAgICAgICAgICAgICBpZihpbnB1dC50eXBlID09ICdyYWRpbycpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudCA9IGlucHV0LmNsb3Nlc3QoJ2ZpZWxkc2V0JylcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXBhcmVudClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQgPSBpbnB1dC5jbG9zZXN0KCcuYWNmLWlucHV0JylcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocGFyZW50KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQucXVlcnlTZWxlY3RvckFsbCgnbGFiZWwnKS5mb3JFYWNoKGxhYmVsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobGFiZWwucXVlcnlTZWxlY3RvcignaW5wdXQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWxhYmVsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsLmNsYXNzTGlzdC5yZW1vdmUoJ3Bsb3RTZWxlY3RlZCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbC5jbGFzc0xpc3QucmVtb3ZlKCdwbG90U2VsZWN0ZWQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoaW5wdXQuY2hlY2tlZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ3Bsb3RTZWxlY3RlZCcpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgncGxvdFNlbGVjdGVkJylcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBwbG90QWRtaW5NYWluLmluaXQoKVxuXG4gICAgfSlcbn0pKGpRdWVyeSk7Il19
