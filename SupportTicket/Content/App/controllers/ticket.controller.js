//TicketController
(function () {
    'use strict';

    angular
        .module('ticketApp')
        .controller('TicketController', TicketController);
    TicketController.$inject = ['$scope', 'configService', '$SPService'];

    function TicketController($scope, configService, $SPService) {
        var vm = this;

        vm.user = [],
        vm.tickets = [];


        // load list
        vm.loadRequests = function(){
            $SPService.list
                .getItems("Request", "ID,Title,RequestDescription,RequestType,Created")
                .then(function (data) {
                    vm.tickets = data.data.d.results;
                    $(".ms-ListItem").ListItem();
                })
        }
        

        // get user infromation from configService
        vm.user = configService.user;
        function updateUser() {
            vm.user = configService.user;
        }
        configService.registerObserverCallback(updateUser);
        

    }
    console.log("TicketController loaded");
})();

