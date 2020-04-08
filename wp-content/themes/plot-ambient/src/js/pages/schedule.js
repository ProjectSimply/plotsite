(function () {

    var Schedule

    Schedule = {
      dayButtons       : document.querySelectorAll('.JS--scheduleDayPickerButton'),
      calendars        : document.querySelectorAll('.scheduleCalendarWrap'),
      schedule         : document.querySelector('.schedule'),
      currentCalendar  : document.querySelector('.scheduleCalendarWrap:not(.hidden)'),
      scheduleHeight   : 20,

        init: () => {

          Schedule.createListeners()
          Schedule.checkToSeeIfNavArrowsNeeded()
          Schedule.checkIfWeNeedATallerSchedule()

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


        checkIfWeNeedATallerSchedule : () => {

          Schedule.schedule.classList.add('loaded')
          var calendarHeight = Schedule.currentCalendar.getBoundingClientRect().height

          const performances = Schedule.currentCalendar.querySelectorAll('.scheduleCalendar__performanceInner')
          var hasFinished = false

          for(var performance of performances) {

            if(parseInt(performance.getBoundingClientRect().height) + 1 < parseInt(performance.scrollHeight)) {

              Schedule.scheduleHeight++

              Schedule.schedule.style.setProperty('--scheduleHeight', Schedule.scheduleHeight + "rem")
              Schedule.checkIfWeNeedATallerSchedule()
              break

            } else {
              hasFinished = true
            }

          }

          if(hasFinished) {
            Schedule.schedule.classList.add('loaded')
          }


        },

        loadNewDate : elem => {

          Schedule.schedule.classList.remove('loaded')

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

          Schedule.currentCalendar = document.querySelector('.scheduleCalendarWrap:not(.hidden)')
          Schedule.checkToSeeIfNavArrowsNeeded()
          Schedule.checkIfWeNeedATallerSchedule()



        },

        checkToSeeIfNavArrowsNeeded : () => { 

           const tracks = Schedule.currentCalendar.querySelector('.scheduleCalendarTracks')

           if(tracks.scrollWidth > Schedule.currentCalendar.scrollWidth) {
              Schedule.currentCalendar.querySelector('.JS--scheduleLeft').classList.remove('hidden')
              Schedule.currentCalendar.querySelector('.JS--scheduleRight').classList.remove('hidden')
           } else {
              Schedule.currentCalendar.querySelector('.JS--scheduleLeft').classList.add('hidden')
              Schedule.currentCalendar.querySelector('.JS--scheduleRight').classList.add('hidden')
           }


        }

    }

    module.exports = Schedule

}())

