//TicketController
(function () {
    'use strict';

    angular
        .module('ticketApp')
        .controller('TicketDetailController', TicketDetailController);
    TicketDetailController.$inject = ['$scope', 'configService', '$SPService', '$SPHttp', '$routeParams'];

    function TicketDetailController($scope, configService, $SPService, $SPHttp, $routeParams) {
        var vm = this;

        vm.ticket = {};     // current request ticket
        vm.response = {};   // reply 
        vm.responses = [];  // list of responses


        // load list
        vm.loadRequest = function(ticket){
            $SPService.list
                .getItems("Request", "ID,Title,RequestType,RequestStatus,Body,Created,AssignedTo/Title,Author/Id,Author/Title&$expand=AssignedTo,Author", "Id eq " + $routeParams.id)
                .then(function (data) {
                    vm.ticket = data.data.d.results[0] || {};

                    if (vm.ticket.ID)
                        vm.loadResponses(vm.ticket.ID);
                })
        }
        vm.loadRequest();
        
        // load responses
        vm.loadResponses = function (reqId) {
            $SPService.list
                .getItems("Response", "ID,Title,RequestStatus,Body,Created,Request/Id,Author/Id,Author/Title&$expand=Author,Request", "Request/Id eq " + $routeParams.id)
                .then(function (data) {
                    vm.responses = data.data.d.results || [];
                })
        }

        vm.addResponse = function () {
            if (vm.response.Body.length < 10) return;

            var responseData = {
                __metadata: { 'type': 'SP.Data.ResponseListItem' },
                Title: 'RE: ' + vm.ticket.Title,
                Body: vm.response.Body,
                RequestId: vm.ticket.Id
            }
            $SPHttp.post({
                url: apiBase + "web/lists/getByTitle('Response')/Items",
                data: responseData
            }).then(function (data) {
                if (data.statusText == "Created") {
                    //vm.responses.push()
                    console.log(data)
                    var newResponse = {
                        Body: data.data.d.Body,
                        Created: data.data.d.Created,
                        Title: data.data.d.Title
                    };
                    vm.responses.push(newResponse);
                    vm.response = {};
                }
            }, function (error) {
                console.error(error);
            })
        }



    }
})();

