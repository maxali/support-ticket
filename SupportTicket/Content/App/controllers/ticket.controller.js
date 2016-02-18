//TicketController
(function () {
    'use strict';

    angular
        .module('ticketApp')
        .controller('TicketController', TicketController);

    TicketController.$inject = ['configService'];
    function TicketController(configService) {
        var vm = this;

        vm.user = configService.user;
        function updateUser() {
            vm.user = configService.user;
        }

        configService.registerObserverCallback(updateUser);

        activate();

        ////////////////
        
        function activate() { }
    }
    console.log("TicketController loaded");
})();

