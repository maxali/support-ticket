﻿//TicketController
(function () {
    'use strict';

    angular
        .module('ticketApp')
        .controller('TicketController', TicketController);
    TicketController.$inject = ['$scope', 'configService', '$routeParams', '$SPService', '$location'];

    function TicketController($scope, configService, $routeParams, $SPService, $location) {
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

        vm.checkedList = function () {
            return vm.tickets.filter(function (item) {
                if (item.checked) return true;
            }).length > 0;
        }
        vm.showTicket = function (reqId) {
            $location.path('/ticket/' + reqId);
            
        }

        // load list
        vm.loadRequests = function(){
            $SPService.list
                .getItems("Request", "ID,Title,RequestType,RequestStatus,Body,AssignedTo/Title,AssignedTo/EMail,Created&$expand=AssignedTo&$orderby=Created desc")
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

