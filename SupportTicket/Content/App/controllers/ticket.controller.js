//TicketController
(function () {
    'use strict';

    angular
        .module('ticketApp')
        .controller('TicketController', TicketController);
    TicketController.$inject = ['$scope', 'configService', '$routeParams', '$SPService', 'spUtil', '$location'];

    function TicketController($scope, configService, $routeParams, $SPService, spUtil, $location) {
        var vm = this,
            $filter = ""; // requests filter

        vm.user = [],
        vm.tickets = [];

        // get user infromation from configService
        vm.user = configService.user;
        configService.registerObserverCallback(updateUser); // update if changed

        if ($routeParams.status) {
        		vm.title = $routeParams.status + " tickets";
            $filter = "&$filter=RequestStatus eq '" + $routeParams.status + "'";
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

        vm.filterTicket = function (filter) {
            switch (filter) {
                case 'all':
                    $filter = "";
                    break; 
                case 'open':
                    $filter = "RequestStatus eq 'open'";
                    break;
                case 'mine':
                    $filter = "AssignedTo/Id eq " + configService.user.id;
                    break;
                case 'unassigned':
                    $filter = "AssignedTo/Id eq null";
                    break;
                default:
                    $filter = "";
                    break;
            }
            $filter = "&$filter=" + $filter;
            console.log($filter)
            vm.loadRequests();
        }
        // load list
        vm.loadRequests = function () {
            $SPService.list
                .getItems("Request", "ID,Title,RequestType,RequestStatus,Body,AssignedTo/Title,AssignedTo/EMail,Created&$expand=AssignedTo&$orderby=Created desc"+$filter)
                .then(function (data) {
                    vm.tickets = data.data.d.results;
                    angular.forEach(vm.tickets,function(item, key) {
                        vm.tickets[key].AssignedTo.PictureUrl = spUtil.getUserPicture(vm.tickets[key].AssignedTo.EMail); // scriptbase + "userphoto.aspx?size=S&username=" + vm.tickets[key].AssignedTo.EMail;
                    })
                    $(".ms-ListItem").ListItem();
                })
        }

        function updateUser() {
            vm.user = configService.user;
        }
        

    }

})();

