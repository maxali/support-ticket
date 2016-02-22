//TicketController
(function () {
    'use strict';

    angular
        .module('ticketApp')
        .controller('TicketNewController', TicketNewController);
    TicketNewController.$inject = ['$scope', '$SPHttp', 'configService', '$SPService', '$routeParams'];

    function TicketNewController($scope, $SPHttp, configService, $SPService, $routeParams) {
        var vm = this;
        vm.peoplePicker = [];
        vm.ticket = {
            
        };
        vm.saveTicket = function () {
            console.log(vm.ticket);
        }
        
        
        vm.search = function () {
            $SPService.searchUser(vm.ticket.assignedTo, function (result) {
                vm.peoplePicker = result;
            });
        }
    }
})();

