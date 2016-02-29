//TicketController
(function () {
    'use strict';

    angular
        .module('ticketApp')
        .controller('TicketDetailController', TicketDetailController);
    TicketDetailController.$inject = ['$scope','spUtil', 'configService', '$SPService', '$SPHttp', '$routeParams'];

    function TicketDetailController($scope, spUtil, configService, $SPService, $SPHttp, $routeParams) {
        var vm = this;

        vm.ticket = {};     // current request ticket
        vm.response = {};   // current reply 
        vm.responses = [];  // list of responses
				
        vm.ticketStatus = { // if currentUser is the owner
            currentUser: "// from configService",
            ticketOwner: "// from vm.ticket.Author.Name ",
            isEditable: function () {
                return this.currentUser === this.ticketOwner 
            },
            isEditing: false
        }

        vm.saveOrEdit = function () {
            if (vm.ticketStatus.isEditing) {
                vm.ticketStatus.isEditing = false;

                var responseData = {
                    __metadata: { 'type': 'SP.Data.RequestListItem' },
                    Body: $('#ticket-body').html(),
                }
									
                $SPHttp.update({
                    url: apiBase + "web/lists/getByTitle('Request')/Items(" + vm.ticket.Id+")",
                    data: responseData
                }).then(function (data) {
                    if (data.statusText == "Created") {
                        //vm.responses.push()
                        console.log(data)
                      
                    }
                }, function (error) {
                    console.error(error);
                });
            } else {
                vm.ticketStatus.isEditing = true;
            }

        }


        vm.loadRequest = loadRequest; 
        vm.loadRequest();
        vm.loadResponses = loadResponses; 
        vm.addResponse = addResponse;


        function loadResponses(reqId) {
            $SPService.list
                .getItems("Response", "ID,Title,RequestStatus,Body,Created,Request/Id,Author/Id,Author/Title,Author/Name&$expand=Author,Request", "Request/Id eq " + $routeParams.id)
                .then(function (data) {
                    vm.responses = data.data.d.results || [];
                })
        }

        function addResponse() {
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

        function loadRequest(ticket) {
            $SPService.list
                .getItems("Request", "ID,Title,RequestType,RequestStatus,Body,Created,AssignedTo/Title,Author/Id,Author/Title,Author/Name,Author/EMail&$expand=AssignedTo,Author", "Id eq " + $routeParams.id)
                .then(function (data) {
                    vm.ticket = data.data.d.results[0] || {};
                    vm.ticketStatus.ticketOwner = vm.ticket.Author.Name;

                    spUtil.getPictureByUser(vm.ticket.Author.Name, function (pic) {
                    		vm.ticket.pictureUrl = pic;
                    });

                    if (vm.ticket.ID)
                        vm.loadResponses(vm.ticket.ID);
                })
        }

        vm.ticketStatus.currentUser = (configService.user) ? configService.user.loginName : null;
        configService.registerObserverCallback(function () {
            vm.ticketStatus.currentUser = configService.user.loginName;
        }); // update if changed

    }
})();

