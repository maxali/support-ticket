//TicketController
(function () {
    'use strict';

    angular
        .module('ticketApp')
        .controller('TicketController', TicketController);
    TicketController.$inject = ['$scope', 'configService', '$routeParams', '$SPService', 'spUtil', '$location', '$SPHttp'];

    function TicketController($scope, configService, $routeParams, $SPService, spUtil, $location, $SPHttp) {
        var vm = this,
            $filter = "&$filter=RequestStatus ne 'done'"; // requests filter

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
                    $filter = "RequestStatus ne 'done'";
                    break;
                case '':
                    $filter = "RequestStatus ne 'done'";
                    break;
                case 'open':
                    $filter = "RequestStatus eq 'open'";
                    break;
                case 'mine':
                    $filter = "AssignedTo/Id eq " + configService.user.id + " and RequestStatus ne 'done'";
                    break;
                case 'unassigned':
                    $filter = "AssignedTo/Id eq null and RequestStatus ne 'done'";
                    break;
                case 'closed':
                    $filter = "RequestStatus eq 'closed'";
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
        

        vm.searchDocs = function () {
            $SPHttp.get({
                url: "https://btotal-7215eed9112c70.sharepoint.com/sites/apps/SupportTicket/_api/search/query?querytext='" + vm.searchDocuments + "'&" + vm.searchrefiners
            }).then(function (data) {

                console.log(data.data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results);
            }, function (err) {
                console.error(err);
            })


        }

    }

})();

