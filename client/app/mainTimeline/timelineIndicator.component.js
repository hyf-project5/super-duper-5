(function() {
    'use strict';
    const days = 1000 * 60 * 60 * 24;
    const month_names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day_names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    console.log(this);
    class TimelineIndicatorController {

        static get $inject() {
            return ['backendService'];
        }
        constructor(backendService) {
            this.backendService = backendService;
            let ctrl = this;
            const current_date = new Date();
            backendService.getTimeline()
                .then(data => {
                    this.currentDate = day_names[current_date.getDay()] + ", " + current_date.getDate() + " " + month_names[current_date.getMonth()] + " " + current_date.getFullYear();
                    this.todayPosition = Math.round(this.computedMilliseconds(current_date) / days);
                    this.timeline = data;
                    this.classes = Object.keys(this.timeline).sort();
                    this.indicatorHeight = (this.classes.length * 60) + 20;
                    this.readmeHeaderTop = this.indicatorHeight + 55;
                    const zeroPoint = Math.round(this.computedMilliseconds(this.getClosestSundayAndRidOfTime(this.timeline[this.classes[0]][0].starting_date)) / days);
                    this.indicatorPosition = ((this.todayPosition - zeroPoint) * 15) + 150;
                    this.indicatorDatePosition = this.indicatorPosition + 5;
                    let scrollToLeft = this.indicatorPosition - 350;
                    this.scrollTimelineToToday(scrollToLeft);

                }).catch(err => console.log(err));
        }

        computedMilliseconds(date) {
            let getDate = new Date(date);
            let milliseconds = getDate.getTime();
            return milliseconds;
        }

        getClosestSundayAndRidOfTime(date) {
            let d = new Date(date);
            d.setHours(0, 0, 0, 0);
            let t = new Date(d);
            t.setDate(t.getDate() - t.getDay());
            return t;
        }

        scrollTimelineToToday(scrollToLeft) {
            setTimeout(
                function() {
                    document.getElementById("main-timeline").scrollLeft = scrollToLeft;
                }, 50);
        }

    }

    angular.module('hyferApp')
        .component('hyfTimelineIndicator', {
            templateUrl: './app/mainTimeline/timelineIndicator.component.html',
            controller: TimelineIndicatorController
        });
})();