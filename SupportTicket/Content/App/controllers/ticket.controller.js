//TicketController
(function () {
    'use strict';

    angular
        .module('ticketApp')
        .controller('TicketController', TicketController);

    TicketController.$inject = ['configService'];
    function TicketController(configService) {
        var vm = this;

        vm.name = configService.userName;

        activate();

        ////////////////

        



        function activate() { }
    }
    console.log("TicketController loaded");
})();

