(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function($) {

    var minuteMap = [
        0,5,10,15,20,25,30,35,40,45,50,55
    ]

   

  acf.add_filter('time_picker_args', function( args, field ){
    args.showSecond = false
    args.stepMinute = 5

    var startDateTextBox = $('[data-name="start_time"] input[type=hidden]')
    var endDateTextBox = $('[data-name="end_time"] input[type=hidden]')

    args.afterInject = function() {
        if(field.context.dataset.name == 'end_time') {

            var startTime = startDateTextBox.val().split(":")
            var startHour = parseInt(startTime[0])
            var startMin = parseInt(startTime[1])

            var endTime = endDateTextBox.val().split(":")
            var endHour = parseInt(endTime[0])
            var endMin = parseInt(endTime[1])
            var modifiedHour = 0
            var modifiedStartHour = 0;

            for(var i = 0; i< 24; i++) {

                if(i < 6 ) {
                    modifiedHour = i + 24
                } else {
                    modifiedHour = i
                }

                if(startHour < 6) {
                    modifiedStartHour = startHour + 24
                } else {
                    modifiedStartHour = startHour
                }


                if(modifiedHour < modifiedStartHour) { 
                    $('.acf-ui-datepicker .ui_tpicker_hour option').eq(i).attr('disabled',true)
                } else {
                    $('.acf-ui-datepicker .ui_tpicker_hour option').eq(i).attr('disabled',false)
                }
            }


            var i = 0

            for(var min of minuteMap) {

                if(min < startMin && endHour == startHour) {
                    $('.acf-ui-datepicker .ui_tpicker_minute option').eq(i).attr('disabled',true)
                } else {
                    $('.acf-ui-datepicker .ui_tpicker_minute option').eq(i).attr('disabled',false)
                }

                i++
            }

        }


        $('.acf-ui-datepicker .ui_tpicker_hour option').each(function(i){

            if(i < 6) {
                $(this).appendTo($('.acf-ui-datepicker .ui_tpicker_hour select'));
            }

        });


    }
    args.onSelect = function(f) {
        var startTime = startDateTextBox.val().split(":")
        var startHour = startTime[0]
        var startMin = parseInt(startTime[1])

        var endTime = endDateTextBox.val().split(":")
        var endHour = endTime[0]
        var endMin = parseInt(endTime[1])

        if((startHour == endHour && endMin < startMin) || startHour > endHour) {
            //This is erroneous. Prevent!
        }

    }
    return args;
  });
})(jQuery);
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYWRtaW4vanMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiKGZ1bmN0aW9uKCQpIHtcblxuICAgIHZhciBtaW51dGVNYXAgPSBbXG4gICAgICAgIDAsNSwxMCwxNSwyMCwyNSwzMCwzNSw0MCw0NSw1MCw1NVxuICAgIF1cblxuICAgXG5cbiAgYWNmLmFkZF9maWx0ZXIoJ3RpbWVfcGlja2VyX2FyZ3MnLCBmdW5jdGlvbiggYXJncywgZmllbGQgKXtcbiAgICBhcmdzLnNob3dTZWNvbmQgPSBmYWxzZVxuICAgIGFyZ3Muc3RlcE1pbnV0ZSA9IDVcblxuICAgIHZhciBzdGFydERhdGVUZXh0Qm94ID0gJCgnW2RhdGEtbmFtZT1cInN0YXJ0X3RpbWVcIl0gaW5wdXRbdHlwZT1oaWRkZW5dJylcbiAgICB2YXIgZW5kRGF0ZVRleHRCb3ggPSAkKCdbZGF0YS1uYW1lPVwiZW5kX3RpbWVcIl0gaW5wdXRbdHlwZT1oaWRkZW5dJylcblxuICAgIGFyZ3MuYWZ0ZXJJbmplY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoZmllbGQuY29udGV4dC5kYXRhc2V0Lm5hbWUgPT0gJ2VuZF90aW1lJykge1xuXG4gICAgICAgICAgICB2YXIgc3RhcnRUaW1lID0gc3RhcnREYXRlVGV4dEJveC52YWwoKS5zcGxpdChcIjpcIilcbiAgICAgICAgICAgIHZhciBzdGFydEhvdXIgPSBwYXJzZUludChzdGFydFRpbWVbMF0pXG4gICAgICAgICAgICB2YXIgc3RhcnRNaW4gPSBwYXJzZUludChzdGFydFRpbWVbMV0pXG5cbiAgICAgICAgICAgIHZhciBlbmRUaW1lID0gZW5kRGF0ZVRleHRCb3gudmFsKCkuc3BsaXQoXCI6XCIpXG4gICAgICAgICAgICB2YXIgZW5kSG91ciA9IHBhcnNlSW50KGVuZFRpbWVbMF0pXG4gICAgICAgICAgICB2YXIgZW5kTWluID0gcGFyc2VJbnQoZW5kVGltZVsxXSlcbiAgICAgICAgICAgIHZhciBtb2RpZmllZEhvdXIgPSAwXG4gICAgICAgICAgICB2YXIgbW9kaWZpZWRTdGFydEhvdXIgPSAwO1xuXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpPCAyNDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICBpZihpIDwgNiApIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZpZWRIb3VyID0gaSArIDI0XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZpZWRIb3VyID0gaVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKHN0YXJ0SG91ciA8IDYpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZpZWRTdGFydEhvdXIgPSBzdGFydEhvdXIgKyAyNFxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGlmaWVkU3RhcnRIb3VyID0gc3RhcnRIb3VyXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICBpZihtb2RpZmllZEhvdXIgPCBtb2RpZmllZFN0YXJ0SG91cikgeyBcbiAgICAgICAgICAgICAgICAgICAgJCgnLmFjZi11aS1kYXRlcGlja2VyIC51aV90cGlja2VyX2hvdXIgb3B0aW9uJykuZXEoaSkuYXR0cignZGlzYWJsZWQnLHRydWUpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmFjZi11aS1kYXRlcGlja2VyIC51aV90cGlja2VyX2hvdXIgb3B0aW9uJykuZXEoaSkuYXR0cignZGlzYWJsZWQnLGZhbHNlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB2YXIgaSA9IDBcblxuICAgICAgICAgICAgZm9yKHZhciBtaW4gb2YgbWludXRlTWFwKSB7XG5cbiAgICAgICAgICAgICAgICBpZihtaW4gPCBzdGFydE1pbiAmJiBlbmRIb3VyID09IHN0YXJ0SG91cikge1xuICAgICAgICAgICAgICAgICAgICAkKCcuYWNmLXVpLWRhdGVwaWNrZXIgLnVpX3RwaWNrZXJfbWludXRlIG9wdGlvbicpLmVxKGkpLmF0dHIoJ2Rpc2FibGVkJyx0cnVlKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5hY2YtdWktZGF0ZXBpY2tlciAudWlfdHBpY2tlcl9taW51dGUgb3B0aW9uJykuZXEoaSkuYXR0cignZGlzYWJsZWQnLGZhbHNlKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGkrK1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuXG4gICAgICAgICQoJy5hY2YtdWktZGF0ZXBpY2tlciAudWlfdHBpY2tlcl9ob3VyIG9wdGlvbicpLmVhY2goZnVuY3Rpb24oaSl7XG5cbiAgICAgICAgICAgIGlmKGkgPCA2KSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hcHBlbmRUbygkKCcuYWNmLXVpLWRhdGVwaWNrZXIgLnVpX3RwaWNrZXJfaG91ciBzZWxlY3QnKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cblxuICAgIH1cbiAgICBhcmdzLm9uU2VsZWN0ID0gZnVuY3Rpb24oZikge1xuICAgICAgICB2YXIgc3RhcnRUaW1lID0gc3RhcnREYXRlVGV4dEJveC52YWwoKS5zcGxpdChcIjpcIilcbiAgICAgICAgdmFyIHN0YXJ0SG91ciA9IHN0YXJ0VGltZVswXVxuICAgICAgICB2YXIgc3RhcnRNaW4gPSBwYXJzZUludChzdGFydFRpbWVbMV0pXG5cbiAgICAgICAgdmFyIGVuZFRpbWUgPSBlbmREYXRlVGV4dEJveC52YWwoKS5zcGxpdChcIjpcIilcbiAgICAgICAgdmFyIGVuZEhvdXIgPSBlbmRUaW1lWzBdXG4gICAgICAgIHZhciBlbmRNaW4gPSBwYXJzZUludChlbmRUaW1lWzFdKVxuXG4gICAgICAgIGlmKChzdGFydEhvdXIgPT0gZW5kSG91ciAmJiBlbmRNaW4gPCBzdGFydE1pbikgfHwgc3RhcnRIb3VyID4gZW5kSG91cikge1xuICAgICAgICAgICAgLy9UaGlzIGlzIGVycm9uZW91cy4gUHJldmVudCFcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHJldHVybiBhcmdzO1xuICB9KTtcbn0pKGpRdWVyeSk7Il19
