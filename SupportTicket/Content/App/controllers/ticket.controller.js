//TicketController
(function () {
    'use strict';

    angular
        .module('ticketApp')
        .controller('TicketController', TicketController);
    TicketController.$inject = ['$scope', 'configService', '$routeParams', '$SPService'];

    function TicketController($scope, configService, $routeParams, $SPService) {
        var vm = this,
            $filter = ""; // requests filter

        vm.user = [],
        vm.tickets = [];

        // get user infromation from configService
        vm.user = configService.user;
        configService.registerObserverCallback(updateUser); // update if changed

        if ($routeParams.status) {
            vm.title = $routeParams.status + " tickets";
            $filter = "status eq " + $routeParams.status;
        } else {
            vm.title = "Support Tickets";
        }

        // load list
        vm.loadRequests = function(){
            $SPService.list
                .getItems("Request", "ID,Title,RequestType,Body,AssignedTo/Title,Created&$expand=AssignedTo")
                .then(function (data) {
                    vm.tickets = data.data.d.results;
                    $(".ms-ListItem").ListItem();
                })
        }

        function updateUser() {
            vm.user = configService.user;
        }
        

    }
})();

