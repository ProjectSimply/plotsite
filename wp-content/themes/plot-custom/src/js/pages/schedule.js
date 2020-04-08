(function () {

    var Schedule

    Schedule = {
      dayButtons       : document.querySelectorAll('.JS--scheduleDayPickerButton'),
      calendars        : document.querySelectorAll('.scheduleCalendarWrap'),

        init: () => {

          Schedule.createListeners()
          Schedule.checkToSeeIfNavArrowsNeeded()

        },

        createListeners: () => {

          for(var dayButton of Schedule.dayButtons) {

            dayButton.addEventListener('click',function() {

              Schedule.loadNewDate(this) 
              
            })

          }

          window.addEventListener('resize',() => {

            Schedule.checkToSeeIfNavArrowsNeeded()

          })

          for(var calendar of Schedule.calendars) {

            const rightButton      = calendar.querySelector('.JS--scheduleRight'),
            leftButton             = calendar.querySelector('.JS--scheduleLeft'),
            tracks                 = calendar.querySelector('.scheduleCalendarTracks'),
            tracksW                = tracks.offsetWidth

            rightButton.addEventListener('click', () => {
              tracks.scrollBy({
                left: tracksW / 2,
                behavior: 'smooth'
              })
            })

            leftButton.addEventListener('click', () => {
              tracks.scrollBy({
                left: -tracksW / 2,
                behavior: 'smooth'
              });
            });

          }

        },

        loadNewDate : elem => {

          for(var dB of Schedule.dayButtons) {
            dB.classList.remove('selected')
          }

          elem.classList.add('selected')

          let day = elem.dataset.scheduleDay 

          for(var calendar of Schedule.calendars) {

            if(calendar.dataset.scheduleDay == day)
              calendar.classList.remove('hidden')
            else 
              calendar.classList.add('hidden')
          }

          Schedule.checkToSeeIfNavArrowsNeeded()

        },

        checkToSeeIfNavArrowsNeeded : () => { 

          for(var calendar of Schedule.calendars) {

            if(!calendar.classList.contains('hidden')) {

               const tracks = calendar.querySelector('.scheduleCalendarTracks')

               if(tracks.scrollWidth > calendar.scrollWidth) {
                  calendar.querySelector('.JS--scheduleLeft').classList.remove('hidden')
                  calendar.querySelector('.JS--scheduleRight').classList.remove('hidden')
               } else {
                  calendar.querySelector('.JS--scheduleLeft').classList.add('hidden')
                  calendar.querySelector('.JS--scheduleRight').classList.add('hidden')
               }

            }

          }

        }

    }

    module.exports = Schedule

}())

