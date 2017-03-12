(function() {
    'use strict';

    class hyfTimelineController {
        static get $inject() {
            return ['$sce', '$mdDialog', '$state', 'toastService', 'me', 'backendService'];
        }

        constructor($sce, $mdDialog, $state, toastService, me, backendService) {
            this.me = me;
            this.$mdDialog = $mdDialog;
            this.$state = $state;
            this.backendService = backendService;
            this.toastService = toastService;
        }

        $onInit() {
            this.classes = Object.keys(this.timeline)
        }

        addClassModal(ev) {
            this.$mdDialog.show({
                    controller: 'addModuleModalCtrl',
                    controllerAs: '$ctrl',
                    templateUrl: 'client/app/modals/classes/addClassModal.html',
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                .then(group => {
                    this.backendService.addGroup(group)
                        .then((res) => {
                            this.toastService.displayToast(true, res, group);
                            this.$state.reload();
                        })
                })
                .catch(() => this.toastService.displayToast(false));
        }

        isTeacher() {
            if (this.me.role === 'teacher') {
                return true;
            }
        }

    }

    angular
        .module('hyferApp')
        .component('hyfTimeline', {
            templateUrl: 'app/timeline/view.html',
            controller: hyfTimelineController,
            bindings: {
                timeline: '<'
            }
        });
})();