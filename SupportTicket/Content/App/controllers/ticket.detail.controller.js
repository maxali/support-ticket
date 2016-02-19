//TicketController
(function () {
    'use strict';

    angular
        .module('ticketApp')
        .controller('TicketDetailController', TicketDetailController);
    TicketDetailController.$inject = ['$scope', 'configService', '$SPService', '$routeParams'];

    function TicketDetailController($scope, configService, $SPService, $routeParams) {
        var vm = this;

        vm.ticket = {};

        // load list
        vm.loadRequest = function(ticket){
            $SPService.list
                .getItems("Request","ID,Title,RequestDescription,RequestType,Created", "ID eq " +  $routeParams.id)
                .then(function (data) {
                    
                    vm.ticket = data.data.d.results[0] || {};
                })
        }
        vm.loadRequest();
        
    }
})();

