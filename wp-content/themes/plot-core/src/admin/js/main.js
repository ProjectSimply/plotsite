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