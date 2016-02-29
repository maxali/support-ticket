//TicketController
(function () {
    'use strict';

    angular
        .module('ticketApp')
        .controller('TicketNewController', TicketNewController);
    TicketNewController.$inject = ['$scope', '$SPHttp', 'configService', '$SPService', '$routeParams', '$location'];
	
    function TicketNewController($scope, $SPHttp, configService, $SPService, $routeParams, $location) {
        var vm = this;
				// peoplPicker control list
        vm.peoplePicker = [];
        vm.ticket = {};
        initTicket();

        vm.resetForm = initTicket;

        vm.saveTicket = saveTicket; 
        
        function initTicket() {
            vm.ticket = {
                requestTitle: "",
                key: "",
                Body: "",
                requestType: "-",
                requestStatus: "New"
            };
        }

        function saveTicket() {
            if (!vm.ticket.requestTitle)
                return false;

            var requestData = {
                __metadata: { 'type': 'SP.Data.RequestListItem' },
                Title: vm.ticket.requestTitle,
                Body: vm.ticket.Body
            };

            requestData.RequestType = (vm.ticket.requestType !== "") ? vm.ticket.requestType : null;
            requestData.RequestStatus = (vm.ticket.requestStatus !== "") ? vm.ticket.requestStatus : null;
            requestData.AssignedToId = (vm.ticket.assignedTo > 0) ? vm.ticket.assignedTo : null;

            $SPHttp.post({
                url: apiBase + "web/lists/getByTitle('Request')/Items",
                data: requestData
            }).then(function (data) {
                if (data.statusText == "Created")
                    $.Notify({
                        caption: 'Successful',
                        content: 'Request added successfully.',
                        type: 'success'
                    });

                $location.path('/ticket/' + data.data.d.Id);

            }, function (error) {
                console.log(error);
            });
        }

        // watch key and save assignedTo
        var userIdCache = [];  
        $scope.$watch('vm.ticket.key', function (newKey, oldKey) {
            // We need UserId to save Person/Group.
            // get UserId by accountName eks. i:0#.f|membership|user@xx.onmic..com

            if (newKey == "") { // if user removed, reset assignedTo
                vm.ticket.assignedTo = 0;
                return;
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



