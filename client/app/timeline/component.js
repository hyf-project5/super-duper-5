(function() {
    'use strict';

    class hyfTimelineController {
        static get $inject() {
            return ['backendService', '$sce', '$mdDialog', 'toastService'];
        }

        constructor(backendService, $sce, $mdDialog, toastService) {

            this.$mdDialog = $mdDialog;
            this.backendService = backendService;
            this.toastService = toastService;
        }

        addClassModal(ev) {
            this.$mdDialog.show({
                    controller: 'dialogController',
                    controllerAs: '$ctrl',
                    templateUrl: 'client/app/timeline/addClassModal.html',
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                .then(group => {
                    this.backendService.addGroup(group)
                        .then((res) => {
                            this.toastService.displayToast(true, res, group);
                            location.reload();
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => this.toastService.displayToast(false));
        };


    }

    angular
        .module('hyferApp')
        .component('hyfTimeline', {
            templateUrl: 'app/timeline/view.html',
            controller: hyfTimelineController
        });
})();