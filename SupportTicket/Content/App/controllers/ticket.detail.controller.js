//TicketController
(function () {
    'use strict';

    angular
        .module('ticketApp')
        .controller('TicketDetailController', TicketDetailController);
    TicketDetailController.$inject = ['$scope','spUtil', 'configService', '$SPService', '$SPHttp', '$routeParams'];

    function TicketDetailController($scope, spUtil, configService, $SPService, $SPHttp, $routeParams) {
        var vm = this;
        vm.peoplePicker = [];
        vm.ticket = {
            key: ""
        };     // current request ticket

        vm.response = { Body: "" };   // current reply 
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
                responseData.AssignedToId = (vm.ticket.assignedTo > 0) ? vm.ticket.assignedTo : null;

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
                .getItems("Response", "ID,Title,RequestStatus,Body,Created,Request/Id,Author/Id,Author/Title,Author/Name,Author/EMail&$expand=Author,Request", "Request/Id eq " + $routeParams.id)
                .then(function (data) {
                    vm.responses = data.data.d.results || [];
                   
                    angular.forEach(vm.responses, function (res, key) {
                        vm.responses[key].Author.PictureUrl = scriptbase + "userphoto.aspx?size=S&username=" + vm.responses[key].Author.EMail;
                        /*spUtil.getPictureByUser(vm.responses[key].Author.Name, function (pic) {
                            vm.responses[key].Author.PictureUrl = pic;
                        });*/
                    })

                })
        }

        function addResponse() {
            
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
                .getItems("Request", "ID,Title,RequestType,RequestStatus,Body,Created,AssignedTo/Title,AssignedTo/Id,AssignedTo/Name,AssignedTo/EMail,AssignedTo/Name,Author/Id,Author/Title,Author/Name,Author/EMail&$expand=AssignedTo,Author", "Id eq " + $routeParams.id)
                .then(function (data) {
                    vm.ticket = data.data.d.results[0] || {};
                    vm.ticketStatus.ticketOwner = vm.ticket.Author.Name;

                    vm.ticket.Author.PictureUrl = spUtil.getUserPicture(vm.ticket.Author.EMail); // scriptbase + "userphoto.aspx?size=S&username=" + vm.ticket.Author.EMail;
                    vm.ticket.AssignedTo.PictureUrl = spUtil.getUserPicture(vm.ticket.AssignedTo.EMail); //scriptbase + "userphoto.aspx?size=S&username=" + vm.ticket.AssignedTo.EMail;
                    /*
                    spUtil.getPictureByUser(vm.ticket.Author.Name, function (pic) {
                    		vm.ticket.Author.PictureUrl = pic;
                    });
                    if (vm.ticket.AssignedTo.Name)
                        spUtil.getPictureByUser(vm.ticket.AssignedTo.Name, function (pic) {
                            vm.ticket.AssignedTo.PictureUrl = pic;
                        });
                        */
                    if (vm.ticket.ID)
                        vm.loadResponses(vm.ticket.ID);
                })
        }

        vm.ticketStatus.currentUser = (configService.user) ? configService.user.accoutName : null;
        configService.registerObserverCallback(function () {
            vm.ticketStatus.currentUser = configService.user.accoutName;
        }); // update if changed



        /** People picker */
        // watch key and save assignedTo
        var userIdCache = [];
        $scope.$watch('vm.ticket.key', function (newKey, oldKey) {
            // We need UserId to save Person/Group.
            // get UserId by accountName eks. i:0#.f|membership|user@xx.onmic..com

            if (!newKey) { // if user removed, reset assignedTo
                vm.ticket.assignedTo = 0;
                return false;
            }

            if (userIdCache[newKey]) {
                console.log("GOT IT FROM CACHE: " + userIdCache[newKey]);
                vm.ticket.assignedTo = userIdCache[newKey];
                return;
            }

            // if we don't have the ID, get it
            var accountName = vm.ticket.key;
            $SPHttp.get({
                url: apiBase + "web/siteusers(@v)?@v='" + encodeURIComponent(accountName) + "'",
            }).then(function (data) {
                vm.ticket.assignedTo = data.data.d.Id;
                userIdCache[newKey] = data.data.d.Id;       // update userIdCache
            }, function (error) {
                alert("Cannot complete this. Cannot AssignTo the selected user.");
                return false;
            });
        })
        vm.search = function () {
            $SPService.searchUser(vm.ticket.searchBox, function (result) {
                vm.peoplePicker = result;
            });
        }
    }
})();

